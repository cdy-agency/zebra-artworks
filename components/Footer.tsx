"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  MapPin,
  Mail,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

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

const services = [
  {
    id: "interior",
    label: "Interior Design",
    items: [
      "Commercial Spaces",
      "Residential Spaces",
      "Hotels and Apartments",
      "Public and Private Offices",
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Construction",
    items: [
      "Architectural Plan",
      "MEP Supplies",
      "Construction",
      "Materials Supply",
    ],
  },
];

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Top accent */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="relative w-12 h-8 overflow-hidden flex items-center justify-center">
                <Image
                  src="/sebra.png"
                  alt="ZAG Rwanda logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>

              <span className="text-white text-type-prose-sm font-semibold tracking-tight">
                ZAG Rwanda
              </span>
            </Link>

            <p className="max-w-48 text-type-prose-sm leading-relaxed text-white/50">
              Transforming spaces into beautiful, functional homes — creativity
              and precision in every project.
            </p>

            <div className="mt-5 h-px bg-white/10" />
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-xs font-bold mb-4 uppercase tracking-[0.18em] text-primary">
              Quick Links
            </h3>

            <ul className="space-y-0">
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
                    className="group flex items-center justify-between py-2 text-type-prose-sm text-white/50 transition-colors duration-200 hover:text-primary"
                  >
                    {label}
                    <ArrowRight className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
              Services
            </p>

            <div className="space-y-0">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="border-b border-white/10 last:border-0"
                >
                  <button
                    onClick={() => setOpen(open === svc.id ? null : svc.id)}
                    className="group flex w-full items-center justify-between py-2 text-type-prose-sm font-medium text-white/50 transition-colors duration-200 hover:text-primary"
                  >
                    {svc.label}
                    <ChevronDown
                      className={`size-3.5 shrink-0 text-white/30 transition-all duration-200 group-hover:text-primary ${
                        open === svc.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: open === svc.id ? "200px" : "0px",
                    }}
                  >
                    <ul className="pb-2.5 pl-2 space-y-1.5">
                      {svc.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-type-eyebrow text-white/40"
                        >
                          <span className="w-1 h-1 shrink-0 bg-primary/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Contact & Social ── */}
          <div>
            <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
              Contact
            </p>

            <div className="space-y-0">
              {/* Address */}
              <div className="group border-b border-white/10 py-2">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary/50" />
                  <span className="text-type-prose-sm text-white/50">
                    {ZAG_ADDRESS}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <Link
                href={`tel:${ZAG_PHONE_TEL}`}
                className="group flex flex-col border-b border-white/10 py-2 transition-colors duration-200 hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 shrink-0 text-primary/50" />
                  <span className="text-type-prose-sm text-white/50 transition-colors duration-200 group-hover:text-primary">
                    {ZAG_PHONE_DISPLAY}
                  </span>
                </div>
              </Link>

              {/* Email */}
              <Link
                href={`mailto:${ZAG_EMAIL}`}
                className="group flex flex-col border-b border-white/10 py-2 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 shrink-0 text-primary/50" />
                  <span className="text-type-prose-sm text-white/50 transition-colors duration-200 group-hover:text-primary">
                    {ZAG_EMAIL}
                  </span>
                </div>
              </Link>
            </div>

            {/* ── Socials ── */}
            <div className="mt-4 space-y-2.5">
              {/* Interior */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2.5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Interior &amp; Brand
                </p>
                <div className="flex gap-1.5">
                  {[
                    {
                      href: INTERIOR_SOCIAL.instagram,
                      Icon: FaInstagram,
                      label: "Interior Instagram",
                    },
                    {
                      href: INTERIOR_SOCIAL.linkedin,
                      Icon: FaLinkedinIn,
                      label: "LinkedIn",
                    },
                    {
                      href: INTERIOR_SOCIAL.x,
                      Icon: FaXTwitter,
                      label: "X",
                    },
                    {
                      href: INTERIOR_SOCIAL.pinterest,
                      Icon: FaPinterestP,
                      label: "Pinterest",
                    },
                  ].map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-7 w-7 items-center justify-center border border-white/15 text-white/40 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      <Icon className="size-3" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Construction */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2.5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Construction
                </p>
                <div className="flex gap-1.5">
                  {[
                    {
                      href: CONSTRUCTION_SOCIAL.instagram,
                      Icon: FaInstagram,
                      label: "Interior Instagram",
                    },
                    {
                      href: CONSTRUCTION_SOCIAL.pinterest,
                      Icon: FaPinterestP,
                      label: "Pinterest",
                    },
                  ].map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-7 w-7 items-center justify-center border border-white/15 text-white/40 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      <Icon className="size-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-5 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span className="text-type-eyebrow text-white/30">
            © {year} ZAG Rwanda. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
