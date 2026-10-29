"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type Props = {
  fullName: string;
  email: string;
};

const inputClassName =
  "w-full rounded-xl border border-line bg-subtle px-4 py-3 text-sm text-foreground placeholder:text-gray-mid/60 transition focus:border-primary focus:outline-none";

type SettingsTab = "profile" | "email" | "security";

export default function AdminSettings({ fullName, email }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [name, setName] = useState(fullName);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const tabs: {
    id: SettingsTab;
    label: string;
    description: string;
    icon: typeof UserRound;
  }[] = [
    {
      id: "profile",
      label: "Profile",
      description: "Your personal details",
      icon: UserRound,
    },
    {
      id: "email",
      label: "Email address",
      description: "Your sign-in email",
      icon: Mail,
    },
    {
      id: "security",
      label: "Security",
      description: "Your password",
      icon: LockKeyhole,
    },
  ];

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfileLoading(true);
    setProfileMessage("");
    setProfileError("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name }),
      });
      const data = await response.json();

      if (!response.ok) {
        setProfileError(data.error ?? "Unable to update your profile.");
        return;
      }

      setName(data.fullName);
      setProfileMessage("Your profile has been updated.");
      router.refresh();
    } catch {
      setProfileError("Unable to update your profile. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function updateEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailLoading(true);
    setEmailMessage("");
    setEmailError("");

    try {
      const response = await fetch("/api/admin/settings/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, currentPassword: emailPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setEmailError(data.error ?? "Unable to update your email.");
        return;
      }

      setNewEmail("");
      setEmailPassword("");
      setEmailMessage(data.message ?? "Your email address has been updated.");
      router.refresh();
    } catch {
      setEmailError("Unable to update your email. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  }

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("Your new password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await fetch("/api/admin/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setPasswordError(data.error ?? "Unable to change your password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Your password has been changed successfully.");
    } catch {
      setPasswordError("Unable to change your password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-10">
      <header className="relative overflow-hidden rounded-3xl border border-line/20 bg-background shadow-sm">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-light to-primary-dark" />
        <div className="absolute -right-16 -top-28 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white shadow-lg shadow-primary/20">
              {fullName
                .trim()
                .split(/\s+/)
                .map((part) => part[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Account settings
              </p>
              <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {fullName}
              </h1>
              <p className="mt-1 truncate text-sm text-gray-mid">{email}</p>
            </div>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-600/15 bg-green-600/5 px-3.5 py-2 text-xs font-medium text-green-700">
            <BadgeCheck size={15} />
            Account active
          </div>
        </div>
        <div className="relative flex items-center gap-2 border-t border-line/20 bg-subtle/50 px-6 py-3 text-xs text-gray-mid sm:px-8">
          <ShieldCheck size={14} className="text-primary" />
          Changes to your account are protected by password confirmation.
          <ArrowRight size={13} className="ml-auto hidden sm:block" />
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-line/30 bg-background shadow-sm">
        <div
          role="tablist"
          aria-label="Account settings"
          className="flex overflow-x-auto border-b border-line/30 px-2 pt-2 sm:px-4"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`settings-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`settings-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={handleTabKeyDown}
                className={`group relative flex min-w-fit flex-1 items-center gap-3 px-4 py-4 text-left transition sm:px-5 ${
                  isActive
                    ? "text-primary"
                    : "text-gray-mid hover:bg-subtle/70 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-subtle text-gray-mid group-hover:text-foreground"
                  }`}
                >
                  <Icon size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block whitespace-nowrap text-sm font-semibold">
                    {tab.label}
                  </span>
                  <span className="hidden whitespace-nowrap text-xs text-gray-mid sm:block">
                    {tab.description}
                  </span>
                </span>
                {isActive && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary sm:inset-x-5" />
                )}
              </button>
            );
          })}
        </div>

        <div
          id={`settings-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`settings-tab-${activeTab}`}
          tabIndex={0}
          className="p-6 outline-none sm:p-8"
        >
      {activeTab === "profile" && (
      <section>
        <div className="mb-7 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UserRound size={19} />
          </span>
          <div>
            <h2 className="font-semibold text-foreground">Profile information</h2>
            <p className="mt-1 text-sm text-gray-mid">
              Personalize the name shown throughout your admin account.
            </p>
          </div>
        </div>

        <form onSubmit={updateProfile} className="max-w-2xl space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="profile-name" className="text-sm font-medium text-foreground">
              Full name
            </label>
            <input
              id="profile-name"
              autoComplete="name"
              placeholder="e.g. Aline Uwimana"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClassName}
            />
          </div>
          {profileError && (
            <p role="alert" className="text-sm text-red-600">{profileError}</p>
          )}
          {profileMessage && (
            <p role="status" className="text-sm text-green-700">{profileMessage}</p>
          )}
          <button
            type="submit"
            disabled={profileLoading || name.trim() === fullName}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {profileLoading ? "Saving..." : "Save profile"}
          </button>
        </form>
      </section>
      )}

      {activeTab === "email" && (
      <section>
        <div className="mb-7 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail size={19} />
          </span>
          <div>
            <h2 className="font-semibold text-foreground">Email address</h2>
            <p className="mt-1 text-sm text-gray-mid">
              Change your sign-in email after confirming your current password.
            </p>
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-1 rounded-xl border border-line/30 bg-subtle/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-mid">Current email</span>
          <span className="break-all text-sm font-medium text-foreground">{email}</span>
        </div>

        <form onSubmit={updateEmail} className="max-w-2xl space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="new-email" className="text-sm font-medium text-foreground">
                New email address
              </label>
              <input
                id="new-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={254}
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                className={inputClassName}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email-current-password" className="text-sm font-medium text-foreground">
                Confirm current password
              </label>
              <div className="relative">
                <input
                  id="email-current-password"
                  type={showEmailPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your current password"
                  required
                  value={emailPassword}
                  onChange={(event) => setEmailPassword(event.target.value)}
                  className={`${inputClassName} pr-12`}
                />
                <button
                  type="button"
                  aria-label={showEmailPassword ? "Hide current password" : "Show current password"}
                  aria-pressed={showEmailPassword}
                  onClick={() => setShowEmailPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-gray-mid transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {showEmailPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            {emailError && <p role="alert" className="text-sm text-red-600">{emailError}</p>}
            {emailMessage && <p role="status" className="text-sm text-green-700">{emailMessage}</p>}
            <button
              type="submit"
              disabled={emailLoading || newEmail.trim().toLowerCase() === email.toLowerCase()}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {emailLoading ? "Updating email..." : "Update email"}
            </button>
        </form>
      </section>
      )}

      {activeTab === "security" && (
      <section>
        <div className="mb-7 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LockKeyhole size={19} />
          </span>
          <div>
            <h2 className="font-semibold text-foreground">Change password</h2>
            <p className="mt-1 text-sm text-gray-mid">
              Confirm your current password before choosing a new one.
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={updatePassword} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="current-password" className="text-sm font-medium text-foreground">
                Current password
              </label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your current password"
                  required
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className={`${inputClassName} pr-12`}
                />
                <button
                  type="button"
                  aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                  aria-pressed={showCurrentPassword}
                  onClick={() => setShowCurrentPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-gray-mid transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {showCurrentPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
          <div className="space-y-1.5">
            <label htmlFor="new-password" className="text-sm font-medium text-foreground">
              New password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password with at least 8 characters"
                required
                minLength={8}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className={`${inputClassName} pr-12`}
              />
              <button
                type="button"
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                aria-pressed={showNewPassword}
                onClick={() => setShowNewPassword((visible) => !visible)}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-gray-mid transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <p className="text-xs text-gray-mid">Use at least 8 characters.</p>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your new password again"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={`${inputClassName} pr-12`}
              />
              <button
                type="button"
                aria-label={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
                aria-pressed={showConfirmPassword}
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-gray-mid transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          {passwordError && (
            <p role="alert" className="text-sm text-red-600">{passwordError}</p>
          )}
          {passwordMessage && (
            <p role="status" className="text-sm text-green-700">{passwordMessage}</p>
          )}
          <button
            type="submit"
            disabled={passwordLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <KeyRound size={16} />
            {passwordLoading ? "Updating..." : "Update password"}
          </button>
          </form>
        </div>
      </section>
      )}
        </div>
      </div>
    </div>
  );
}
