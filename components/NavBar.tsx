"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle, ChevronDown, ArrowUpRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Interior Design", href: "/interior-design" },
  { label: "Construction", href: "/construction" },
  { label: "Announcements", href: "/news" },
  { label: "About Us", href: "/about" },
];

function isActive(
  href: string,
  pathname: string,
  children?: NavLink["children"],
) {
  if (href === "/") return pathname === "/";
  if (pathname.startsWith(href)) return true;
  if (children?.some((c) => pathname.startsWith(c.href))) return true;
  return false;
}

function DropdownMenu({
  items,
  visible,
}: {
  items: { label: string; href: string }[];
  visible: boolean;
}) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 transition-all duration-200 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="relative bg-[#111]/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden min-w-56 rounded-xl">
        {/* Top gold accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
        <div className="py-2.5 px-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150 tracking-wide"
            >
              <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopNavItem({
  link,
  pathname,
  scrolled,
}: {
  link: NavLink;
  pathname: string;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const active = isActive(link.href, pathname, link.children);

  const baseText = scrolled
    ? "text-gray-500 hover:text-gray-900"
    : "text-white/65 hover:text-white";

  const activeText = scrolled ? "text-gray-900" : "text-white";

  if (link.children) {
    return (
      <li
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className={`flex items-center gap-1.5 text-[13.5px] font-medium tracking-wide transition-all duration-200 ${
            active ? activeText : baseText
          }`}
        >
          {active && (
            <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
          )}
          {link.label}
          <ChevronDown
            size={11}
            className={`opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {active && (
          <span className="absolute -bottom-4.75 left-0 right-0 h-[2px] bg-primary rounded-full" />
        )}
        <DropdownMenu items={link.children} visible={open} />
      </li>
    );
  }

  return (
    <li className="relative group/nav">
      <Link
        href={link.href}
        className={`inline-flex items-center gap-1.5 text-[13.5px] font-medium tracking-wide transition-all duration-200 ${
          active ? `${activeText} font-semibold` : baseText
        }`}
      >
        {active && (
          <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
        )}
        {link.label}
      </Link>
      {/* Active: gold underline */}
      {active ? (
        <span className="absolute -bottom-4.75 left-0 right-0 h-0.5 bg-primary rounded-full" />
      ) : (
        /* Hover: white ghost underline grows from center */
        <span className="absolute -bottom-4.75 left-1/2 -translate-x-1/2 h-[1.5px] w-0 group-hover/nav:w-full bg-white/25 rounded-full transition-all duration-300" />
      )}
    </li>
  );
}

function MobileNavItem({
  link,
  pathname,
  onClose,
}: {
  link: NavLink;
  pathname: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const active = isActive(link.href, pathname, link.children);

  if (link.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`w-full flex items-center justify-between py-3.5 text-[14px] font-medium border-b border-white/6 transition-colors ${
            active ? "text-primary" : "text-white/55 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2.5">
            {active && (
              <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
            )}
            {link.label}
          </span>
          <ChevronDown
            size={13}
            className={`opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="pl-4 mt-1 mb-2 space-y-0 border-l-2 border-primary/20 ml-1">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 py-2 text-[13px] transition-colors ${
                  pathname.startsWith(child.href)
                    ? "text-primary font-semibold"
                    : "text-white/45 hover:text-white"
                }`}
              >
                <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onClose}
      className={`flex items-center justify-between py-3.5 text-[14px] font-medium border-b border-white/6 transition-colors ${
        active ? "text-primary" : "text-white/55 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-2.5">
        {active && (
          <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
        )}
        {link.label}
      </span>
      {active && (
        <span className="text-[10px] text-primary/60 font-medium tracking-widest uppercase">
          Current
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Maintenance banner */}
      <div className="bg-orange-500 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
        Website Under Maintenance — Services Remain Available
      </div>

      {/* Main navbar */}
      <div
        className={`transition-all duration-100 ease-in-out py-1 mt-2 ${
          scrolled
            ? "max-w-7xl w-full mx-auto rounded-4xl bg-white/95 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.07),0_4px_24px_rgba(0,0,0,0.06)]"
            : "w-full bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-17 max-w-7xl items-center justify-between px-6 sm:px-10">
          {/*  Logo  */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 group transition-opacity duration-200 hover:opacity-80"
          >
            <div className="relative w-16 h-9 overflow-hidden">
              <Image
                src="/sebra.png"
                alt="ZAG Rwanda logo"
                fill
                className={`object-contain transition-all duration-500 ${
                  scrolled
                    ? "filter-none"
                    : "filter-[brightness(0)_invert(1)_drop-shadow(0_0_6px_rgba(255,255,255,0.4))]"
                }`}
              />
            </div>
            <div className="hidden xs:flex flex-col gap-0.5 leading-none">
              <span
                className={`text-[15px] font-bold tracking-tight transition-colors duration-500 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                ZAG Rwanda
              </span>
              <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-primary">
                Design & Build
              </span>
            </div>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <DesktopNavItem
                key={link.href}
                link={link}
                pathname={pathname}
                scrolled={scrolled}
              />
            ))}
          </ul>

          {/* ── Desktop CTA actions  */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              aria-label="Login"
              className={`transition-all duration-300 hover:scale-110 ${
                scrolled
                  ? "text-gray-400 hover:text-gray-800"
                  : "text-white/45 hover:text-white"
              }`}
            >
              <UserCircle size={20} strokeWidth={1.5} />
            </Link>

            <span
              className={`w-px h-4 transition-colors duration-300 ${
                scrolled ? "bg-gray-200" : "bg-white/15"
              }`}
            />

            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                scrolled
                  ? "bg-gray-900 text-white hover:bg-primary"
                  : "bg-white/12 text-white border border-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
              }`}
            >
              Contact Us
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────── */}
          <button
            className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 md:hidden ${
              scrolled
                ? "border-gray-200 bg-gray-50 text-gray-600 hover:text-gray-900"
                : "border-white/15 bg-white/8 text-white hover:bg-white/15 backdrop-blur-sm"
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`absolute transition-all duration-200 ${menuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
            >
              <X size={16} />
            </span>
            <span
              className={`absolute transition-all duration-200 ${menuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
            >
              <Menu size={16} />
            </span>
          </button>
        </nav>

        {/* ── Mobile menu (animated slide-down) ────────────────── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-150 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl border-t border-white/8 bg-[#0d0d0d]/97 backdrop-blur-2xl px-6 py-5 shadow-2xl">
            {/* Gold accent divider */}
            <div className="mb-5 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

            <div className="flex flex-col mb-6">
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.href}
                  link={link}
                  pathname={pathname}
                  onClose={() => setMenuOpen(false)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 text-[13px] font-medium text-white/35 hover:text-white transition-colors"
              >
                <UserCircle size={15} strokeWidth={1.5} />
                Login to dashboard
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary text-[#0d0d0d] px-6 py-3 text-[13px] font-bold tracking-wide rounded-lg hover:bg-[#d4b880] active:scale-[0.98] transition-all"
              >
                Contact Us
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
