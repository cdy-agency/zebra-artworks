"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, UserCircle } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-5">
      <nav className="max-w-6xl mx-auto bg-background/90 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-lg">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-all duration-200"
        >
          <span className="bg-primary text-background rounded-lg p-1.5">
            <Home size={18} />
          </span>
          <span className="text-foreground font-extrabold tracking-tight text-lg">
            ZAG Rwanda
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-gray-mid font-medium hover:text-primary hover:font-bold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — Login icon + Contact button */}
        <div className="hidden md:flex items-center gap-3">

          {/* User / Login icon */}
          <Link
            href="/login"
            aria-label="Login"
            className="text-gray-mid hover:text-primary transition-all duration-200 hover:-translate-y-0.5 inline-flex"
          >
            <UserCircle size={26} />
          </Link>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-background font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Contact Us
          </Link>

        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-mid hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 bg-background rounded-2xl shadow-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-mid font-medium hover:text-primary hover:font-bold transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Login link in mobile */}
          <Link
            href="/login"
            className="text-gray-mid font-medium hover:text-primary transition-all flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <UserCircle size={18} />
            Login
          </Link>

          <Link
            href="/contact"
            className="bg-primary text-background font-semibold text-sm px-6 py-2.5 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}