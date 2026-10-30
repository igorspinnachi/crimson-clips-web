"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["Home", "#home"],
  ["How it works", "#how-it-works"],
  ["Clips", "#clips"],
  ["About", "#about"],
  ["Submit clip", "#submit"],
];
export function Wordmark() {
  return (
    <span className="wordmark">
      crimson<span>clips</span>
    </span>
  );
}
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="nav-wrap">
        <a
          href="#home"
          aria-label="Crimson Clips home"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button small nav-cta" href="#submit">
          Submit a clip <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={18} />
          </a>
        ))}
      </nav>
    </header>
  );
}
