"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import {
  ZAG_ADDRESS,
  ZAG_EMAIL,
  ZAG_PHONE_DISPLAY,
  ZAG_PHONE_TEL,
  INTERIOR_SOCIAL,
  CONSTRUCTION_SOCIAL,
} from "@/lib/zagContact";

const pageLinks = [
  { label: "Interior Design", href: "/interior-design" },
  { label: "Construction", href: "/construction" },
  { label: "Announcements", href: "/news" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const interiorSocials = [
  {
    href: INTERIOR_SOCIAL.instagram,
    Icon: FaInstagram,
    label: "Instagram (Interior)",
  },
  { href: INTERIOR_SOCIAL.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
  { href: INTERIOR_SOCIAL.x, Icon: FaXTwitter, label: "X" },
  {
    href: INTERIOR_SOCIAL.pinterest,
    Icon: FaPinterestP,
    label: "Pinterest (Interior)",
  },
];

const constructionSocials = [
  {
    href: CONSTRUCTION_SOCIAL.instagram,
    Icon: FaInstagram,
    label: "Instagram (Construction)",
  },
  {
    href: CONSTRUCTION_SOCIAL.pinterest,
    Icon: FaPinterestP,
    label: "Pinterest (Construction)",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0f18] border-t border-white/10">
      {/* Top accent line */}

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-20 md:gap-48">
          {/* ── LEFT: Logo + tagline + socials ── */}
          <div className="flex flex-col gap-6 md:max-w-65">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="relative w-32 h-32 shrink-0">
                <Image
                  src="/sebra.png"
                  alt="ZAG Rwanda logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg font-bold tracking-tight leading-tight">
                  ZAG Rwanda
                </span>
                <span className="text-white/40 text-[0.45rem] tracking-widest uppercase">
                  Design · Build 
                </span>
              </div>
            </Link>

            {/* Social icons — Interior */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-primary/60 font-semibold">
                  Interior
                </span>
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex gap-1.5">
                  {interiorSocials.map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-7 w-7 items-center justify-center border border-white/15 text-white/40 transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                    >
                      <Icon className="size-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-primary/60 font-semibold">
                  Build
                </span>
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex gap-1.5">
                  {constructionSocials.map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-7 w-7 items-center justify-center border border-white/15 text-white/40 transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                    >
                      <Icon className="size-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Nav links (top) + Contact (below) ── */}
          <div className="flex flex-col gap-8 flex-1">
            {/* Page nav links — horizontal row like reference */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {pageLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-medium text-white/50 hover:text-primary transition-colors duration-200 uppercase tracking-wide"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Contact info row */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-6">
              <div className="flex items-start gap-2 text-sm text-white/40">
                <MapPin className="size-3.5 shrink-0 mt-0.5 text-primary/50" />
                <span>{ZAG_ADDRESS}</span>
              </div>

              <Link
                href={`tel:${ZAG_PHONE_TEL}`}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors duration-200"
              >
                <Phone className="size-3.5 shrink-0 text-primary/50" />
                <span>{ZAG_PHONE_DISPLAY}</span>
              </Link>

              <Link
                href={`mailto:${ZAG_EMAIL}`}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors duration-200"
              >
                <Mail className="size-3.5 shrink-0 text-primary/50" />
                <span>{ZAG_EMAIL}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[0.65rem] uppercase tracking-widest text-white/25">
            © {year} ZAG Rwanda. All rights reserved.
          </span>
          <span className="text-[0.65rem] text-white/20 tracking-wide">
            Interior Design &amp; Architecture
          </span>
        </div>
      </div>
    </footer>
  );
}
