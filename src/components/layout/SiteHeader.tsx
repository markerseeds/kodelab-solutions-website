"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How We Work" },
  { href: "#packages", label: "Packages" },
  { href: "#work", label: "Our Work" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuBtnRef.current?.focus();
    };
    // A tap anywhere else (the floating CTA, the logo, the page) closes the menu too, so it never
    // stays open over the section the visitor just jumped to.
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (navRef.current?.contains(target) || menuBtnRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={clsx("wrap", styles.nav)}>
        <Logo />
        <button
          ref={menuBtnRef}
          type="button"
          className={styles.menuBtn}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <nav ref={navRef} id="site-nav" aria-label="Main" className={clsx(styles.navLinks, open && styles.open)}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a href="#quote" className="btn btn-primary" onClick={close}>
            Get a Free Quote
          </a>
        </nav>
      </div>
    </header>
  );
}
