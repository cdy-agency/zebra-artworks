"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle, ChevronDown } from "lucide-react";

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

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 z-50">
      <div className="bg-background/98 backdrop-blur-xl border border-line/10 shadow-2xl overflow-hidden min-w-52 py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-5 py-2.5 text-[0.8rem] text-gray-mid hover:text-primary hover:bg-subtle transition-colors tracking-wide"
          >
            <span className="w-1 h-1 bg-primary/50 shrink-0" />
            {item.label}
          </Link>
        ))}
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

  const textClass = scrolled
    ? active
      ? "text-primary"
      : "text-gray-mid hover:text-primary"
    : active
      ? "text-white"
      : "text-white/70 hover:text-white";

  if (link.children) {
    return (
      <li
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className={`flex items-center gap-1 text-[0.8rem] font-medium tracking-wide transition-all duration-200 ${textClass}`}
        >
          {link.label}
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {active && (
          <span className="absolute -bottom-1 left-0 right-0 h-px bg-current opacity-60" />
        )}
        {open && <DropdownMenu items={link.children} />}
      </li>
    );
  }

  return (
    <li className="relative">
      <Link
        href={link.href}
        className={`text-[0.8rem] font-medium tracking-wide transition-all duration-200 inline-block ${textClass} ${active ? "font-semibold" : ""}`}
      >
        {link.label}
      </Link>
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-current opacity-60" />
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
          className={`w-full flex items-center justify-between py-3 text-sm font-medium border-b border-line/10 transition-colors ${active ? "text-primary" : "text-gray-mid"}`}
        >
          {link.label}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="pl-3 mt-1 space-y-0.5 border-l border-primary/20 ml-1 mb-2">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className={`flex items-center gap-2 py-2 text-sm transition-colors ${pathname.startsWith(child.href) ? "text-primary font-semibold" : "text-gray-mid hover:text-primary"}`}
              >
                <span className="w-1 h-1 bg-primary/40 shrink-0" />
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
      className={`flex items-center justify-between py-3 text-sm font-medium border-b border-line/10 transition-colors ${active ? "text-primary font-semibold" : "text-gray-mid hover:text-primary"}`}
    >
      {link.label}
      {active && <span className="w-1.5 h-1.5 bg-primary" />}
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
      <div className="bg-orange-500 text-white text-[0.7rem] text-center py-1.5 font-medium tracking-wider uppercase">
        Website Under Maintenance — Services Remain Available
      </div>

      {/* Navbar */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-background/96 backdrop-blur-xl shadow-sm border-b border-line/8"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="relative w-14 h-8 overflow-hidden">
              <Image
                src="/sebra.png"
                alt="ZAG Rwanda logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`font-semibold tracking-tight text-sm hidden xs:block transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}
            >
              ZAG Rwanda
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <DesktopNavItem
                key={link.href}
                link={link}
                pathname={pathname}
                scrolled={scrolled}
              />
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              aria-label="Login"
              className={`transition-all duration-300 hover:-translate-y-0.5 inline-flex ${
                scrolled
                  ? "text-gray-mid hover:text-primary"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <UserCircle size={20} />
            </Link>
            <Link
              href="/contact"
              className={`inline-flex items-center text-[0.8rem] font-semibold px-5 py-2 tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled
                  ? "bg-primary text-background hover:bg-primary-dark"
                  : "bg-white text-gray-dark hover:bg-white/90"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden w-9 h-9 flex items-center justify-center border transition-colors duration-200 ${
              scrolled
                ? "border-line/20 bg-subtle text-gray-mid hover:text-primary"
                : "border-white/20 bg-white/10 text-white hover:bg-white/20"
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden max-w-6xl mx-auto bg-background border-t border-line/10 shadow-xl px-5 py-4 flex flex-col">
            <div className="flex flex-col mb-4">
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.href}
                  link={link}
                  pathname={pathname}
                  onClose={() => setMenuOpen(false)}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-gray-mid hover:text-primary transition-colors font-medium"
              >
                <UserCircle size={15} />
                Login to dashboard
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-primary text-background text-sm font-semibold px-6 py-2.5 text-center hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
