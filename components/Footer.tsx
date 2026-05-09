"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  MapPin,
  Mail,
  Globe,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

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
    <footer className="bg-background border-t border-line/15">
      {/* Top accent */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-5 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="relative w-14 h-9 overflow-hidden flex items-center justify-center">
                <Image
                  src="/sebra.png"
                  alt="ZAG Rwanda logo"
                  fill
                  className="object-contain"
                />
              </div>

              <span className="text-foreground text-type-prose-sm font-semibold tracking-tight">
                ZAG Rwanda
              </span>
            </Link>

            <p className="max-w-50 text-type-prose-sm leading-relaxed text-gray-mid">
              Transforming spaces into beautiful, functional homes —
              creativity and precision in every project.
            </p>

            <div className="mt-6 h-px bg-line/15" />
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-[0.18em] text-primary">
              Quick Links
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
                    className="group flex items-center justify-between py-2.5 text-type-prose-sm text-gray-mid transition-colors duration-200 hover:text-primary"
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
            <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
              Services
            </p>

            <div className="space-y-0">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="border-b border-line/10 last:border-0"
                >
                  <button
                    onClick={() =>
                      setOpen(open === svc.id ? null : svc.id)
                    }
                    className="group flex w-full items-center justify-between py-2.5 text-type-prose-sm font-medium text-gray-mid transition-colors duration-200 hover:text-primary"
                  >
                    {svc.label}

                    <ChevronDown
                      className={`size-3.5 shrink-0 text-gray-mid/50 transition-all duration-200 group-hover:text-primary ${
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
                    <ul className="pb-3 pl-2 space-y-2">
                      {svc.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-type-eyebrow text-gray-mid/70"
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
            <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
              Contact
            </p>

            <div className="space-y-0">
              {/* Address */}
              <div className="group border-b border-line/10 py-2.5">
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gray-mid/75">
                  Location
                </p>

                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary/50" />

                  <span className="text-type-prose-sm text-gray-mid">
                    {ZAG_ADDRESS}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <a
                href={`tel:${ZAG_PHONE_TEL}`}
                className="group flex flex-col border-b border-line/10 py-2.5 transition-colors duration-200 hover:text-primary"
              >
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gray-mid/75 group-hover:text-primary/70 transition-colors duration-200">
                  Call us
                </p>

                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 shrink-0 text-primary/50" />

                  <span className="text-type-prose-sm text-gray-mid transition-colors duration-200 group-hover:text-primary">
                    {ZAG_PHONE_DISPLAY}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${ZAG_EMAIL}`}
                className="group flex flex-col border-b border-line/10 py-2.5 transition-colors duration-200"
              >
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gray-mid/75 group-hover:text-primary/70 transition-colors duration-200">
                  Email us
                </p>

                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 shrink-0 text-primary/50" />

                  <span className="text-type-prose-sm text-gray-mid transition-colors duration-200 group-hover:text-primary">
                    {ZAG_EMAIL}
                  </span>
                </div>
              </a>

              {/* Website */}
              <a
                href={ZAG_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border-b border-line/10 py-2.5 transition-colors duration-200"
              >
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gray-mid/75 group-hover:text-primary/70 transition-colors duration-200">
                  Website
                </p>

                <div className="flex items-center gap-2">
                  <Globe className="size-3.5 shrink-0 text-primary/50" />

                  <span className="text-type-prose-sm text-gray-mid transition-colors duration-200 group-hover:text-primary">
                    {ZAG_WEBSITE_LABEL}
                  </span>
                </div>
              </a>
            </div>

            {/* ── Socials ── */}
            <div className="mt-5 space-y-3">
              {/* Interior */}
              <div className="flex items-center justify-between gap-4 border-b border-line/10 pb-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gray-mid/75">
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
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-7 w-7 items-center justify-center border border-line/20 text-gray-mid/60 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      <Icon className="size-3" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Construction */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gray-mid/75">
                  Construction
                </p>

                <div className="flex gap-1.5">
                  {/* Construction Instagram */}
                  <a
                    href={CONSTRUCTION_INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Construction Instagram"
                    className="flex h-7 w-7 items-center justify-center border border-line/20 text-gray-mid/60 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    <FaInstagram className="size-3" />
                  </a>

                  {/* Pinterest */}
                  <a
                    href="https://pinterest.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    className="flex h-7 w-7 items-center justify-center border border-line/20 text-gray-mid/60 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    <FaPinterestP className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-line/15 pt-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span className="text-type-eyebrow text-gray-mid/50">
            © {year} ZAG Rwanda. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}