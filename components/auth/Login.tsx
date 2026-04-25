"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }

      // Redirect based on role
      router.push(data.redirect);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-background rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[600px]">

        {/* LEFT — image panel */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0 flex-shrink-0">
          <Image
            src="/interior4.jpg"
            alt="ZAG Rwanda Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-dark/40" />

          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center">
              <span className="text-primary font-extrabold text-type-ui">Z</span>
            </div>
            <span className="text-white font-heading font-semibold tracking-tight text-type-prose">
              ZAG Rwanda
            </span>
          </div>

          <div className="absolute bottom-8 left-6 right-6">
            <h2 className="text-white font-extrabold leading-snug">
              Transforming spaces,<br />shaping futures.
            </h2>
            <p className="text-white/70 text-type-prose mt-2">
              Design and construction excellence across Rwanda.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="w-6 h-2 rounded-full bg-white" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-between px-8 py-10 relative">

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">

            <h1 className="font-extrabold text-foreground mb-1">
              Welcome Back to ZAG!
            </h1>
            <p className="text-gray-mid text-type-prose mb-8">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-type-prose font-medium text-foreground">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-type-prose border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-type-prose font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 pr-10 py-3 text-type-prose border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
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

              {/* Error */}
              {error && (
                <p className="text-red-500 text-type-prose">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)]/80 text-white font-bold text-type-prose py-3.5 rounded-xl transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

            </form>
          </div>

          <p className="text-center text-type-meta text-gray-mid mt-6">
            Copyright © ZAG Rwanda. All Rights Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
