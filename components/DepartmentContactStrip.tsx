"use client";

import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaPinterestP,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  ZAG_ADDRESS,
  ZAG_PHONE_DISPLAY,
  ZAG_PHONE_TEL,
  INTERIOR_SOCIAL,
  CONSTRUCTION_SOCIAL,
} from "@/lib/zagContact";

const linkBase =
  "inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors text-type-prose";

function InteriorSocials() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
      <Link
        href={INTERIOR_SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaInstagram className="w-4 h-4 text-primary shrink-0" />
        <span>Instagram</span>
      </Link>
      <Link
        href={INTERIOR_SOCIAL.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaLinkedinIn className="w-4 h-4 text-primary shrink-0" />
        <span>LinkedIn</span>
      </Link>
      <Link
        href={INTERIOR_SOCIAL.x}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaXTwitter className="w-4 h-4 text-primary shrink-0" />
        <span>Twitter</span>
      </Link>
      <Link
        href={INTERIOR_SOCIAL.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaPinterestP className="w-4 h-4 text-primary shrink-0" />
        <span>Pinterest</span>
      </Link>
    </div>
  );
}

function ConstructionSocials() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
      <Link
        href={CONSTRUCTION_SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaInstagram className="w-4 h-4 text-primary shrink-0" />
        <span>Instagram</span>
      </Link>
      <Link
        href={INTERIOR_SOCIAL.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
      >
        <FaPinterest className="w-4 h-4 text-primary shrink-0" />
        <span>Pinterest</span>
      </Link>
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
          : "bg-foreground/3 border-y border-foreground/5"
      }
    >
      <div className="max-w-6xl mx-auto py-12 sm:py-14">
        <h2 className="font-heading text-type-h2 text-foreground max-w-2xl uppercase">
          Connect with us
        </h2>
        <div className="landing-rule mb-6" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-3 text-type-prose text-foreground/85">
            <a
              href={`tel:${ZAG_PHONE_TEL}`}
              className="flex items-start gap-3 group"
            >
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
          </div>

          <div>
            {isInterior ? (
              <div>
                <p className="text-type-eyebrow uppercase tracking-widest text-foreground/40 mb-3">
                  Social
                </p>
                <InteriorSocials />
                <p className="text-type-meta text-foreground/50 mt-4">
                  @zagrwanda Interior-design on Social media
                </p>
              </div>
            ) : (
              <div>
                <p className="text-type-eyebrow uppercase tracking-widest text-foreground/40 mb-3">
                  Social
                </p>
                <ConstructionSocials />
                <p className="text-type-meta text-foreground/50 mt-4">
                  @zagrwanda Construction on Social media
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
