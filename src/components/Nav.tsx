"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#career", label: "Career" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-border-subtle bg-bg-deep/80 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-text-primary hover:text-accent"
        >
          AU<span className="text-accent">.</span>
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="rounded px-2 py-1 text-sm text-text-muted transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/cv"
              className="ml-1 rounded-md border border-border-subtle bg-bg-card px-3 py-1.5 text-sm text-text-primary transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              CV
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
