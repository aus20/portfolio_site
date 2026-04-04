import { site } from "@/content/profile";
import { buildCareerSystemMessage } from "@/lib/careerContext";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "qwen/qwen3.6-plus:free";
const MAX_MESSAGES = 20;
const MAX_USER_CONTENT = 2000;

type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role: string;
  content: string;
};

function jsonError(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey?.trim()) {
    return jsonError(
      503,
      "Chat is not configured (missing OPENROUTER_API_KEY on the server).",
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid JSON body.");
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("messages" in body) ||
    !Array.isArray((body as { messages: unknown }).messages)
  ) {
    return jsonError(400, "Expected { messages: Array<{role, content}> }.");
  }

  const raw = (body as { messages: IncomingMessage[] }).messages;

  if (raw.length > MAX_MESSAGES) {
    return jsonError(
      400,
      `At most ${MAX_MESSAGES} messages are allowed per request.`,
    );
  }

  const sanitized: { role: ChatRole; content: string }[] = [];

  for (const m of raw) {
    if (!m || typeof m !== "object") {
      return jsonError(400, "Invalid message object.");
    }
    const role = m.role;
    const content = m.content;
    if (role !== "user" && role !== "assistant") {
      return jsonError(
        400,
        'Each message role must be "user" or "assistant".',
      );
    }
    if (typeof content !== "string") {
      return jsonError(400, "Each message content must be a string.");
    }
    if (role === "user" && content.length > MAX_USER_CONTENT) {
      return jsonError(
        400,
        `User messages may be at most ${MAX_USER_CONTENT} characters.`,
      );
    }
    if (role === "user" && content.trim().length === 0) {
      return jsonError(400, "Empty user messages are not allowed.");
    }
    sanitized.push({ role, content });
  }

  const systemMessage = buildCareerSystemMessage();

  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": site.domain,
      "X-Title": `${site.name} portfolio`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      messages: [
        { role: "system", content: systemMessage },
        ...sanitized.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    let message = text || "OpenRouter request failed.";
    try {
      const j = JSON.parse(text) as { error?: { message?: string } };
      if (j.error?.message) message = j.error.message;
    } catch {
      /* use raw or default */
    }
    if (message.length > 500) message = `${message.slice(0, 500)}…`;
    return jsonError(
      upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502,
      message,
    );
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
