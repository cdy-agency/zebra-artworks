"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <main className="min-h-screen bg-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-background rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[600px]">

        {/* ── LEFT — image panel ── */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0 flex-shrink-0">
          <Image
            src="/interior4.jpg"
            alt="ZAG Rwanda Interior"
            fill
            className="object-cover"
            priority
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-gray-dark/40" />

          {/* Logo top-left */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center">
              <span className="text-primary font-extrabold text-sm">Z</span>
            </div>
            <span className="text-white font-extrabold tracking-tight text-base">
              ZAG Rwanda
            </span>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-8 left-6 right-6">
            <h2 className="text-white text-2xl font-extrabold leading-snug">
              Transforming spaces,<br />shaping futures.
            </h2>
            <p className="text-white/70 text-sm mt-2">
              Design and construction excellence across Rwanda.
            </p>
            {/* dots */}
            <div className="flex items-center gap-2 mt-5">
              <span className="w-6 h-2 rounded-full bg-white" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        {/* ── RIGHT — form panel ── */}
        <div className="w-full md:w-1/2 flex flex-col justify-between px-8 py-10 relative">

          {/* Sign up button top right */}
          <div className="flex justify-end mb-6">
            <Link
              href="/register"
              className="bg-gray-dark text-background text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              Sign up
            </Link>
          </div>

          {/* Form content */}
          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">

            <h1 className="text-2xl font-extrabold text-foreground mb-1">
              Create Your Account
            </h1>
            <p className="text-gray-mid text-sm mb-8">
              Join ZAG Rwanda and explore our world of design.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 pr-10 py-3 text-sm border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-mid hover:text-primary transition"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
            
              {/* <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    className="w-full px-4 pr-10 py-3 text-sm border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-mid hover:text-primary transition"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div> */}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)]/80 text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-300"
              >
                Create Account
              </button>

            </form>

            {/* Login link */}
            <p className="text-center text-xs text-gray-mid mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:text-[var(--color-primary-dark)] transition"
              >
                Sign In
              </Link>
            </p>

          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-mid mt-6">
            Copyright © ZAG Rwanda. All Rights Reserved.
          </p>

        </div>
      </div>
    </main>
  );
}