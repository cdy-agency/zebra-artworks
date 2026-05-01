"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, MapPin, Mail, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  ZAG_ADDRESS,
  ZAG_EMAIL,
  ZAG_PHONE_DISPLAY,
  ZAG_PHONE_TEL,
  ZAG_WEBSITE,
  ZAG_WEBSITE_LABEL,
  INTERIOR_SOCIAL,
  CONSTRUCTION_INSTAGRAM,
} from "@/lib/zagContact";

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpen(open === section ? null : section);
  };

  return (
    <footer className="bg-background border-t border-line/20">

      {/* Top accent line matching primary */}
      <div className="h-0.5 w-full bg-primary/30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="md:col-span-1">
            {/* Logo — same treatment as navbar logo container */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-5 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="relative w-16 h-10 rounded-xl overflow-hidden flex items-center justify-center p-1.5">
                <img
                  src="/sebra.png"
                  alt="ZAG Rwanda logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-foreground font-semibold tracking-tight text-sm">
                ZAG Rwanda
              </span>
            </Link>

            <p className="text-sm text-gray-mid leading-relaxed max-w-[220px]">
              Transforming spaces into beautiful, functional homes — creativity
              and precision in every project.
            </p>

            <div className="mt-6 h-px bg-line/20" />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-[0.18em] text-primary">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/interior-design" },
                { label: "Gallery", href: "/projects" },
                { label: "Pricing", href: "/contact" },
                { label: "News & Updates", href: "/news" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-gray-mid hover:text-primary transition-colors duration-200 font-medium"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-200 group-hover:w-3" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Accordion */}
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-[0.18em] text-primary">
              Services
            </h3>

            {/* Interior Design */}
            <div className="mb-2">
              <button
                onClick={() => toggle("interior")}
                className={`w-full flex justify-between items-center py-2.5 px-3.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  open === "interior"
                    ? "bg-subtle border-line/40 text-primary"
                    : "border-transparent text-gray-mid hover:text-primary hover:bg-subtle"
                }`}
              >
                <span className="text-left">Interior Design</span>
                {open === "interior" ? (
                  <ChevronUp className="w-4 h-4 shrink-0 text-primary" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0 text-gray-mid" />
                )}
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === "interior" ? "200px" : "0px" }}
              >
                <ul className="pt-2 pb-1 pl-4 space-y-1.5">
                  {[
                    "Commercial Spaces",
                    "Residential Spaces",
                    "Hotels and Apartments",
                    "Public and Private Offices",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-mid">
                      <span className="w-1 h-1 rounded-full shrink-0 bg-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Architecture */}
            <div>
              <button
                onClick={() => toggle("architecture")}
                className={`w-full flex justify-between items-center py-2.5 px-3.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  open === "architecture"
                    ? "bg-subtle border-line/40 text-primary"
                    : "border-transparent text-gray-mid hover:text-primary hover:bg-subtle"
                }`}
              >
                <span className="text-left">Architecture & Construction</span>
                {open === "architecture" ? (
                  <ChevronUp className="w-4 h-4 shrink-0 text-primary" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0 text-gray-mid" />
                )}
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === "architecture" ? "200px" : "0px" }}
              >
                <ul className="pt-2 pb-1 pl-4 space-y-1.5">
                  {[
                    "Architectural Plan",
                    "MEP Supplies",
                    "Construction",
                    "Materials Supply",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-mid">
                      <span className="w-1 h-1 rounded-full shrink-0 bg-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-[0.18em] text-primary">
              Contact
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/70" />
                <span className="text-sm text-gray-mid">{ZAG_ADDRESS}</span>
              </li>
              <li>
                <a
                  href={`tel:${ZAG_PHONE_TEL}`}
                  className="flex items-center gap-2.5 text-sm text-gray-mid hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-primary/70" />
                  {ZAG_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ZAG_EMAIL}`}
                  className="flex items-center gap-2.5 text-sm text-gray-mid hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-primary/70" />
                  {ZAG_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={ZAG_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-gray-mid hover:text-primary transition-colors"
                >
                  <Globe className="w-4 h-4 shrink-0 text-primary/70" />
                  {ZAG_WEBSITE_LABEL}
                </a>
              </li>
            </ul>

            {/* Social — Interior */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-gray-mid/60 mb-3">
                Interior &amp; Brand
              </p>
              <div className="flex gap-2">
                {[
                  { href: INTERIOR_SOCIAL.instagram, Icon: FaInstagram, label: "Interior Instagram" },
                  { href: INTERIOR_SOCIAL.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
                  { href: INTERIOR_SOCIAL.x, Icon: FaXTwitter, label: "X" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Social — Construction */}
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-gray-mid/60 mb-3">
                Construction
              </p>
              <a
                href={CONSTRUCTION_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-mid hover:text-primary transition-colors"
              >
                <FaInstagram className="w-4 h-4 text-primary/70" />
                @zagrwandac
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-line/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-gray-mid/60">
            © {new Date().getFullYear()} ZAG Rwanda. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-mid/60">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span>Kigali, Rwanda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}