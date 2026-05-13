"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import {
  ZAG_ADDRESS,
  ZAG_EMAIL,
  ZAG_PHONE_DISPLAY,
  ZAG_PHONE_TEL,
  INTERIOR_SOCIAL,
  CONSTRUCTION_SOCIAL,
} from "@/lib/zagContact";
import Link from "next/link";

const services = ["Interior Design", "Architecture & Construction"];

const contactInfo = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: ZAG_PHONE_DISPLAY,
    href: `tel:${ZAG_PHONE_TEL}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: ZAG_EMAIL,
    href: `mailto:${ZAG_EMAIL}`,
  },
  {
    icon: MapPin,
    label: "Our location",
    value: ZAG_ADDRESS,
    href: "#map",
  },
];

const interiorSocials = [
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@zagrwanda",
    href: INTERIOR_SOCIAL.instagram,
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    handle: "zagrwanda",
    href: INTERIOR_SOCIAL.linkedin,
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    handle: "@zagrwanda",
    href: INTERIOR_SOCIAL.x,
  },
  {
    icon: FaXTwitter,
    label: "Pinterest",
    handle: "@zagrwanda",
    href: INTERIOR_SOCIAL.pinterest,
  },
] as const;

const constructionSocials = [
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@zagrwanda",
    href: CONSTRUCTION_SOCIAL.instagram,
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    handle: "@zagrwanda",
    href: CONSTRUCTION_SOCIAL.pinterest,
  },
] as const;

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-foreground/50 text-[10px] font-medium uppercase tracking-widest mb-1.5">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-subtle border border-foreground/10 text-foreground text-sm font-light px-4 py-3 placeholder:text-foreground/25 focus:outline-none focus:border-primary transition-colors duration-200";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setSuccess(true);

        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          subject: "",
          message: "",
        });
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ── */}
      <section className="relative w-full h-[42vh] sm:h-[50vh] overflow-hidden flex items-end">
        <Image
          src="/contact.jpg"
          alt="Contact ZAG Rwanda"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.38)" }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-primary z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-6 sm:px-10 lg:px-20 pb-10 w-full max-w-7xl mx-auto"
        >
          <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Get in touch
          </p>

          <h1
            className="text-white font-bold leading-[1.05]"
            style={{ fontSize: "clamp(36px, 7vw, 72px)" }}
          >
            Contact Us
          </h1>
        </motion.div>
      </section>

      {/* ── Main content ── */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 sm:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-3"
          >
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">
              Send a message
            </p>

            <h2 className="text-foreground text-3xl sm:text-4xl font-bold leading-tight mb-3">
              Get In Touch
            </h2>

            <p className="text-gray-mid text-sm font-light leading-relaxed mb-10 max-w-md">
              Have a project in mind? Reach out and let&apos;s build something
              extraordinary together.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full name" required>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jean Claude"
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Email address" required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Phone number">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+250 781 234 567"
                    pattern="^\+?[0-9\s-]{7,15}$"
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Service select */}
              <Field label="Service interested in" required>
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none cursor-pointer pr-10`}
                    style={{
                      color: form.service
                        ? "var(--color-foreground)"
                        : "rgba(0,0,0,0.25)",
                    }}
                  >
                    <option value="" disabled className="text-foreground/40">
                      Select a service...
                    </option>

                    {services.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="text-foreground bg-background"
                      >
                        {s}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 5l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
              </Field>

              {/* Subject */}
              <Field label="Subject" required>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your project"
                  required
                  className={inputClass}
                />
              </Field>

              {/* Message */}
              <Field label="Message" required>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your vision, timeline, and budget..."
                  rows={6}
                  required
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Feedback */}
              {error && (
                <div className="border-l-[3px] border-red-500 pl-4 py-1">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="border-l-[3px] border-primary pl-4 py-1">
                  <p className="text-primary text-sm">
                    Message sent successfully. We&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white text-xs font-medium uppercase tracking-widest px-10 py-4 hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 flex items-center gap-3"
              >
                {loading ? "Sending..." : "Send Message"}

                {!loading && (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M8 3l5 4-5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                )}
              </button>
            </form>
          </motion.div>

          {/* ── Contact info ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-2 flex flex-col gap-px"
          >
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-6">
              Contact details
            </p>

            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const external = item.href.startsWith("http");

              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="flex items-center gap-4 px-5 py-5 bg-subtle border-l-[3px] border-transparent hover:border-primary hover:bg-background transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Icon
                      size={16}
                      className="text-primary group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <p className="text-foreground/40 text-[10px] font-medium uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>

                    <p className="text-foreground text-sm font-medium">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.49 }}
              className="px-5 py-5 bg-subtle border-l-[3px] border-transparent hover:border-primary hover:bg-background transition-all duration-300"
            >
              <p className="text-foreground/40 text-[10px] font-medium uppercase tracking-widest mb-3">
                Social media
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-foreground/60">
                    Interior &amp; Brand
                  </p>

                  <div className="flex gap-1.5">
                    {interiorSocials.map(({ href, icon: Icon, label }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-8 w-8 items-center justify-center border border-foreground/10 text-foreground/60 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                      >
                        <Icon className="size-3.5" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-foreground/60">
                    Interior &amp; Brand
                  </p>

                  <div className="flex gap-1.5">
                    {constructionSocials.map(({ href, icon: Icon, label }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-8 w-8 items-center justify-center border border-foreground/10 text-foreground/60 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                      >
                        <Icon className="size-3.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
