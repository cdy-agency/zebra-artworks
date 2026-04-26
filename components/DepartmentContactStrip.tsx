"use client";

import Link from "next/link";
import { Phone, MapPin, Globe, Construction } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  ZAG_ADDRESS,
  ZAG_PHONE_DISPLAY,
  ZAG_PHONE_TEL,
  ZAG_WEBSITE,
  ZAG_WEBSITE_LABEL,
  INTERIOR_SOCIAL,
  CONSTRUCTION_INSTAGRAM,
} from "@/lib/zagContact";

const linkBase =
  "inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors text-type-prose";

function InteriorSocials() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
      <a
        href={INTERIOR_SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaInstagram className="w-4 h-4 text-primary shrink-0" />
        <span>Instagram</span>
      </a>
      <a
        href={INTERIOR_SOCIAL.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaLinkedinIn className="w-4 h-4 text-primary shrink-0" />
        <span>LinkedIn</span>
      </a>
      <a
        href={INTERIOR_SOCIAL.x}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaXTwitter className="w-4 h-4 text-primary shrink-0" />
        <span>X</span>
      </a>
    </div>
  );
}

export default function DepartmentContactStrip({
  department,
}: {
  department: "interior" | "construction";
}) {
  const isInterior = department === "interior";

  return (
    <section
      className={
        isInterior
          ? "bg-subtle border-y border-foreground/5"
          : "bg-foreground/[0.03] border-y border-foreground/5"
      }
    >
      <div className="max-w-6xl mx-auto px-6 py-12 sm:py-14">
        <p className="text-primary text-type-eyebrow font-medium uppercase tracking-[0.2em] mb-2">
          {isInterior ? "Interior design" : "Architecture & construction"}
        </p>
        <h2 className="font-heading text-type-h2 text-foreground mb-6 max-w-2xl">
          {isInterior
            ? "Connect with us"
            : "Follow our construction work"}
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-3 text-type-prose text-foreground/85">
            <a href={`tel:${ZAG_PHONE_TEL}`} className="flex items-start gap-3 group">
              <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-type-eyebrow uppercase tracking-widest text-foreground/40 mb-0.5">
                  Phone / WhatsApp
                </p>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {ZAG_PHONE_DISPLAY}
                </p>
              </div>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-type-eyebrow uppercase tracking-widest text-foreground/40 mb-0.5">
                  Location
                </p>
                <p>{ZAG_ADDRESS}</p>
              </div>
            </div>
            <a
              href={ZAG_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <Globe className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-type-eyebrow uppercase tracking-widest text-foreground/40 mb-0.5">
                  Website
                </p>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors underline-offset-2 group-hover:underline">
                  {ZAG_WEBSITE_LABEL}
                </p>
              </div>
            </a>
          </div>

          <div>
            {isInterior ? (
              <div>
                <p className="text-type-eyebrow uppercase tracking-widest text-foreground/40 mb-3">
                  Social
                </p>
                <InteriorSocials />
                <p className="text-type-meta text-foreground/50 mt-4">
                  @zagrwanda on Instagram, LinkedIn &amp; X
                </p>
              </div>
            ) : (
              <div>
                <p className="text-type-eyebrow uppercase tracking-widest text-foreground/40 mb-3">
                  Construction on Instagram
                </p>
                <a
                  href={CONSTRUCTION_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border-2 border-primary/30 bg-primary/5 px-5 py-4 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-colors"
                >
                  <Construction className="w-6 h-6 text-primary shrink-0" />
                  <div className="text-left">
                    <p className="text-type-prose font-semibold">@zagrwandac</p>
                    <p className="text-type-meta text-foreground/60">
                      Architecture &amp; build updates
                    </p>
                  </div>
                </a>
                <p className="text-type-meta text-foreground/50 mt-4">
                  General brand &amp; interior:{" "}
                  <a
                    href={INTERIOR_SOCIAL.instagram}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @zagrwanda
                  </a>{" "}
                  on Instagram
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-foreground/10">
          <Link
            href="/contact"
            className="text-type-prose text-primary font-medium border-b border-primary/40 pb-0.5 hover:border-primary transition-colors"
          >
            Full contact form →
          </Link>
        </div>
      </div>
    </section>
  );
}
