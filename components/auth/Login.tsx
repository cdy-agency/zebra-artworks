"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff, MailCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<"email" | "otp">("email");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryOtp, setRecoveryOtp] = useState("");
  const [recoveryPassword, setRecoveryPassword] = useState("");
  const [recoveryConfirmPassword, setRecoveryConfirmPassword] = useState("");
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLoginSuccess("");

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

  async function requestResetCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRecoveryLoading(true);
    setRecoveryError("");
    setRecoveryMessage("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoveryEmail }),
      });
      const data = await response.json();

      if (!response.ok) {
        setRecoveryError(data.error ?? "Unable to send a reset code.");
        return;
      }

      setRecoveryStep("otp");
      setRecoveryMessage(data.message);
    } catch {
      setRecoveryError("Unable to send a reset code. Please try again.");
    } finally {
      setRecoveryLoading(false);
    }
  }

  async function resetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRecoveryError("");
    setRecoveryMessage("");

    if (recoveryPassword.length < 8) {
      setRecoveryError("Your new password must be at least 8 characters.");
      return;
    }
    if (recoveryPassword !== recoveryConfirmPassword) {
      setRecoveryError("The new passwords do not match.");
      return;
    }

    setRecoveryLoading(true);
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: recoveryEmail,
          otp: recoveryOtp,
          newPassword: recoveryPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setRecoveryError(data.error ?? "Unable to reset your password.");
        return;
      }

      setRecoveryOpen(false);
      setRecoveryStep("email");
      setRecoveryOtp("");
      setRecoveryPassword("");
      setRecoveryConfirmPassword("");
      setForm({ ...form, email: recoveryEmail, password: "" });
      setError("");
      setLoginSuccess("Password reset successfully. Sign in with your new password.");
    } catch {
      setRecoveryError("Unable to reset your password. Please try again.");
    } finally {
      setRecoveryLoading(false);
    }
  }

  async function resendResetCode() {
    setRecoveryLoading(true);
    setRecoveryError("");
    setRecoveryMessage("");
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoveryEmail }),
      });
      const data = await response.json();
      if (!response.ok) {
        setRecoveryError(data.error ?? "Unable to send a new reset code.");
        return;
      }
      setRecoveryMessage(data.message);
    } catch {
      setRecoveryError("Unable to send a new reset code. Please try again.");
    } finally {
      setRecoveryLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-subtle to-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-background overflow-hidden rounded-3xl border border-line/30 shadow-2xl shadow-gray-dark/10 flex flex-col md:flex-row min-h-[600px]">

        {/* LEFT — image panel */}
        <div className="relative w-full md:w-1/2 min-h-[280px] md:min-h-0 flex-shrink-0">
          <Image
            src="/interior4.jpg"
            alt="ZAG Rwanda Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-dark/75 via-gray-dark/25 to-gray-dark/10" />

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

          {recoveryOpen ? (
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
              <button
                type="button"
                onClick={() => {
                  setRecoveryOpen(false);
                  setRecoveryError("");
                  setRecoveryMessage("");
                }}
                className="mb-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-gray-mid transition hover:text-primary"
              >
                <ArrowLeft size={16} />
                Back to login
              </button>

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MailCheck size={22} />
              </div>
              <h1 className="font-extrabold text-foreground mb-1">
                {recoveryStep === "email" ? "Reset your password" : "Check your email"}
              </h1>
              <p className="text-gray-mid text-type-prose mb-8">
                {recoveryStep === "email"
                  ? "We’ll email you a one-time code to securely reset your password."
                  : `Enter the code sent to ${recoveryEmail} and choose a new password.`}
              </p>

              {recoveryStep === "email" ? (
                <form onSubmit={requestResetCode} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="recovery-email" className="text-type-prose font-medium text-foreground">
                      Your Email
                    </label>
                    <input
                      id="recovery-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      required
                      value={recoveryEmail}
                      onChange={(event) => setRecoveryEmail(event.target.value)}
                      className="w-full px-4 py-3 text-type-prose border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  {recoveryError && <p role="alert" className="text-red-500 text-type-prose">{recoveryError}</p>}
                  {recoveryMessage && <p role="status" className="text-green-700 text-type-prose">{recoveryMessage}</p>}
                  <button
                    type="submit"
                    disabled={recoveryLoading}
                    className="w-full bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)]/80 text-white font-bold text-type-prose py-3.5 rounded-xl transition-all duration-300 disabled:opacity-60"
                  >
                    {recoveryLoading ? "Sending code..." : "Send reset code"}
                  </button>
                </form>
              ) : (
                <form onSubmit={resetPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="recovery-otp" className="text-type-prose font-medium text-foreground">
                      Email verification code
                    </label>
                    <input
                      id="recovery-otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6,8}"
                      maxLength={8}
                      placeholder="Enter your code"
                      required
                      value={recoveryOtp}
                      onChange={(event) => setRecoveryOtp(event.target.value.replace(/\D/g, ""))}
                      className="w-full px-4 py-3 text-type-prose border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="recovery-new-password" className="text-type-prose font-medium text-foreground">
                      New password
                    </label>
                    <input
                      id="recovery-new-password"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      value={recoveryPassword}
                      placeholder="Create a password with at least 8 characters"
                      onChange={(event) => setRecoveryPassword(event.target.value)}
                      className="w-full px-4 py-3 text-type-prose border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="recovery-confirm-password" className="text-type-prose font-medium text-foreground">
                      Confirm new password
                    </label>
                    <input
                      id="recovery-confirm-password"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      value={recoveryConfirmPassword}
                      placeholder="Enter your new password again"
                      onChange={(event) => setRecoveryConfirmPassword(event.target.value)}
                      className="w-full px-4 py-3 text-type-prose border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  {recoveryError && <p role="alert" className="text-red-500 text-type-prose">{recoveryError}</p>}
                  {recoveryMessage && <p role="status" className="text-green-700 text-type-prose">{recoveryMessage}</p>}
                  <button
                    type="submit"
                    disabled={recoveryLoading}
                    className="w-full bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)]/80 text-white font-bold text-type-prose py-3.5 rounded-xl transition-all duration-300 disabled:opacity-60"
                  >
                    {recoveryLoading ? "Resetting password..." : "Verify code & reset password"}
                  </button>
                  <button
                    type="button"
                    disabled={recoveryLoading}
                    onClick={resendResetCode}
                    className="w-full py-2 text-sm font-medium text-primary transition hover:opacity-80 disabled:opacity-50"
                  >
                    Resend code
                  </button>
                </form>
              )}
            </div>
          ) : (
          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">

            <h1 className="font-extrabold text-foreground mb-1">
              Welcome Back to ZAG!
            </h1>
            <p className="text-gray-mid text-type-prose mb-8">
              Sign in to your account
            </p>
            {loginSuccess && (
              <p role="status" className="mb-5 text-sm text-green-700">
                {loginSuccess}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="text-type-prose font-medium text-foreground">
                  Your Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-type-prose border border-line rounded-xl bg-subtle text-foreground placeholder:text-gray-mid/60 focus:outline-none focus:border-primary transition"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="login-password" className="text-type-prose font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryEmail(form.email);
                      setRecoveryStep("email");
                      setRecoveryError("");
                      setRecoveryMessage("");
                      setRecoveryOpen(true);
                    }}
                    className="text-sm font-medium text-primary transition hover:opacity-80"
                  >
                    Forgot password?
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
          )}

          <p className="text-center text-type-meta text-gray-mid mt-6">
            Copyright © ZAG Rwanda. All Rights Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
