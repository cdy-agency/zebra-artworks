"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle, ChevronDown } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Interior Design", href: "/interior-design" },
  { label: "Construction", href: "/construction" },
  { label: "News & Updates", href: "/news" },
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
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
      <div className="bg-background border border-line/20 rounded-2xl shadow-xl overflow-hidden min-w-55 py-1.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-mid hover:text-primary hover:bg-subtle transition-colors"
          >
            <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
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
}: {
  link: NavLink;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const active = isActive(link.href, pathname, link.children);

  if (link.children) {
    return (
      <li
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className={`flex items-center gap-1 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
            active
              ? "text-primary font-semibold"
              : "text-gray-mid hover:text-primary"
          }`}
        >
          {link.label}
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {active && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
        )}

        {open && <DropdownMenu items={link.children} />}
      </li>
    );
  }

  return (
    <li className="relative">
      <Link
        href={link.href}
        className={`text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 inline-block ${
          active
            ? "text-primary font-semibold"
            : "text-gray-mid hover:text-primary"
        }`}
      >
        {link.label}
      </Link>
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
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
          className={`w-full flex items-center justify-between py-2.5 text-sm font-medium border-b border-line/10 transition-colors ${
            active ? "text-primary" : "text-gray-mid"
          }`}
        >
          {link.label}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="pl-3 mt-1 space-y-0.5 border-l-2 border-primary/20 ml-1 mb-2">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className={`flex items-center gap-2 py-2 text-sm transition-colors ${
                  pathname.startsWith(child.href)
                    ? "text-primary font-semibold"
                    : "text-gray-mid hover:text-primary"
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
      className={`flex items-center justify-between py-2.5 text-sm font-medium border-b border-line/10 transition-colors ${
        active
          ? "text-primary font-semibold"
          : "text-gray-mid hover:text-primary"
      }`}
    >
      {link.label}
      {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      {/* ORANGE TOP BAR */}
      <div className="bg-orange-500/55 text-white text-xs sm:text-sm text-center py-1.5 font-semibold">
        We Are Open: Deliveries Start Soon
      </div>

      {/* ORIGINAL NAVBAR (UNCHANGED) */}
      <div className="px-4 sm:px-6 pt-2">
        <nav
          className={`max-w-6xl mx-auto bg-background/90 backdrop-blur-md rounded-full px-5 sm:px-7 py-3 flex items-center justify-between transition-shadow duration-300 ${
            scrolled ? "shadow-xl" : "shadow-md"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 hover:-translate-y-0.5 transition-transform duration-200"
          >
            <div className="relative w-15 h-9 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/sebra.png" alt="" />
            </div>
            <span className="text-foreground font-semibold tracking-tight text-sm hidden xs:block">
              ZAG Rwanda
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <DesktopNavItem key={link.href} link={link} pathname={pathname} />
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              aria-label="Login"
              className="text-gray-mid hover:text-primary transition-colors hover:-translate-y-0.5 inline-flex"
            >
              <UserCircle size={22} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-background text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          <button
            className="md:hidden w-9 h-9 rounded-xl bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden max-w-6xl mx-auto mt-2 bg-background border border-line/20 rounded-2xl shadow-xl px-5 py-4 flex flex-col">
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
                <UserCircle size={16} />
                Login to dashboard
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-primary text-background text-sm font-semibold px-6 py-2.5 rounded-full text-center hover:opacity-90 transition-opacity"
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