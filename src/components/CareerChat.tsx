"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

function parseSseDataLines(chunk: string, onDelta: (text: string) => void) {
  const lines = chunk.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (payload === "[DONE]") return true;
    try {
      const json = JSON.parse(payload) as {
        choices?: { delta?: { content?: string } }[];
      };
      const piece = json.choices?.[0]?.delta?.content;
      if (piece) onDelta(piece);
    } catch {
      /* ignore non-JSON lines */
    }
  }
  return false;
}

async function streamCompletion(
  messages: Msg[],
  onDelta: (text: string) => void,
): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const j = (await res.json()) as { error?: string };
      if (j.error) msg = j.error;
    } catch {
      /* keep default */
    }
    throw new Error(msg);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body.");

  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone;
    buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done });

    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const finished = parseSseDataLines(`${part}\n`, onDelta);
      if (finished) {
        done = true;
        break;
      }
    }
  }

  if (buffer.trim()) {
    parseSseDataLines(buffer, onDelta);
  }
}

export function CareerChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, scrollToBottom]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);

    let acc = "";
    try {
      await streamCompletion(next, (delta) => {
        acc += delta;
        setMessages([...next, { role: "assistant", content: acc }]);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {open ? (
        <div
          id="career-chat-panel"
          className="flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-card/95 shadow-2xl shadow-black/50 backdrop-blur-md sm:w-[min(100vw-3rem,26rem)]"
          role="dialog"
          aria-label="Career chat"
        >
          <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Ask
              </p>
              <p className="text-sm font-medium text-text-primary">
                Career Q&amp;A
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1.5 text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Close chat"
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>

          <div
            ref={listRef}
            className="max-h-[min(50vh,320px)] space-y-3 overflow-y-auto px-4 py-3"
          >
            {messages.length === 0 ? (
              <p className="text-sm leading-relaxed text-text-muted">
                Ask about experience, stack, education, or projects—in Turkish
                or English.
              </p>
            ) : null}
            {messages.map((m, i) => (
              <div
                key={`msg-${i}`}
                className={`rounded-md px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-6 border border-border-subtle bg-bg-elevated text-text-primary"
                    : "mr-6 bg-accent/10 text-text-primary"
                }`}
              >
                {m.content || (m.role === "assistant" && loading ? "…" : "")}
              </div>
            ))}
          </div>

          {error ? (
            <p className="border-t border-border-subtle px-4 py-2 text-xs text-red-400">
              {error}
            </p>
          ) : null}

          <div className="border-t border-border-subtle p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Message…"
              rows={2}
              disabled={loading}
              className="w-full resize-none rounded-md border border-border-subtle bg-bg-deep px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-50"
              aria-label="Chat message"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={loading || !input.trim()}
              className="mt-2 w-full rounded-md bg-accent py-2 text-sm font-medium text-bg-deep transition-colors hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {loading ? "Thinking…" : "Send"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="relative group">
        {!open && (
          <div className="absolute -inset-1 animate-ping rounded-full bg-accent/30 opacity-75 duration-[2000ms]"></div>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`relative flex items-center justify-center gap-2 rounded-full border border-border-subtle bg-bg-card/95 text-accent shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent/60 hover:bg-bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
            open ? "h-14 w-14" : "h-14 px-6"
          }`}
          aria-expanded={open}
          aria-controls="career-chat-panel"
          aria-label={open ? "Close career chat" : "Open career chat"}
        >
          {open ? (
            <span className="font-mono text-xl font-medium tracking-tight">
              ×
            </span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              <span className="font-mono text-[15px] font-semibold tracking-tight">
                Ask AI
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
