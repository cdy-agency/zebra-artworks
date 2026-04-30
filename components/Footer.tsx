"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, MapPin, Mail, Globe } from "lucide-react";
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
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Company Info */}
        <div>
          <img src="/ZEBRA.png" alt="" className="w-20 h-15 mb-5" />
          <p className="text-gray-400 text-type-prose-sm leading-relaxed">
            Transforming spaces into beautiful, functional homes. We bring
            creativity and precision to every interior design project.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-type-meta font-semibold mb-4 uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-2 text-gray-400 text-type-prose-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Services (DROPDOWN ONLY CHANGED PART) */}
        <div>
          <h3 className="text-type-meta font-semibold mb-4 uppercase tracking-wide">
            Services
          </h3>

          {/* Interior Design */}
          <div className="mb-3 border-b border-gray-700 pb-2">
            <button
              onClick={() => toggle("interior")}
              className="w-full flex justify-between items-center text-gray-400 hover:text-white transition text-type-prose-sm"
            >
              <span className="text-left font-medium">Interior Design Department</span>
              <span>{open === "interior" ? "−" : "+"}</span>
            </button>

            {open === "interior" && (
              <ul className="mt-2 space-y-1 text-gray-400 text-type-prose-sm pl-2">
                <li>Commercial Spaces</li>
                <li>Residential Spaces</li>
                <li>Hotels and Apartments</li>
                <li>Public and Private Offices</li>
              </ul>
            )}
          </div>

          {/* Architecture */}
          <div className="border-b border-gray-700 pb-2">
            <button
              onClick={() => toggle("architecture")}
              className="w-full flex justify-between items-center text-gray-400 hover:text-white transition text-type-prose-sm"
            >
              Architecture & Construction
              <span>{open === "architecture" ? "−" : "+"}</span>
            </button>

            {open === "architecture" && (
              <ul className="mt-2 space-y-1 text-gray-400 text-type-prose-sm pl-2">
                <li>Architectural Plan</li>
                <li>MEP Supplies</li>
                <li>Construction</li>
                <li>Materials Supply</li>
              </ul>
            )}
          </div>
        </div>

        {/* Contact & social */}
        <div className="md:min-w-0">
          <h3 className="text-type-meta font-semibold mb-4 uppercase tracking-wide">
            Contact
          </h3>
          <ul className="space-y-2.5 text-gray-400 text-type-prose-sm">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 shrink-0 text-primary/80 mt-0.5" />
              <span>{ZAG_ADDRESS}</span>
            </li>
            <li>
              <a
                href={`tel:${ZAG_PHONE_TEL}`}
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-primary/80 mt-0.5" />
                {ZAG_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${ZAG_EMAIL}`}
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0 text-primary/80 mt-0.5" />
                {ZAG_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={ZAG_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 shrink-0 text-primary/80 mt-0.5" />
                {ZAG_WEBSITE_LABEL}
              </a>
            </li>
          </ul>

          <p className="text-type-eyebrow text-gray-500 uppercase tracking-widest mt-6 mb-2">
            Interior &amp; brand
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={INTERIOR_SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="Interior Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href={INTERIOR_SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href={INTERIOR_SOCIAL.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="X"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>

          <p className="text-type-eyebrow text-gray-500 uppercase tracking-widest mt-5 mb-2">
            Construction
          </p>
          <a
            href={CONSTRUCTION_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-type-prose-sm transition"
          >
            <FaInstagram className="w-5 h-5" />
            @zagrwandac
          </a>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-type-meta">
        © {new Date().getFullYear()} ZAG Rwanda. All rights reserved.
      </div>
    </footer>
  );
}