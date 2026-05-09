"use client";

interface ToastMessageProps {
  message: string;
  variant?: "success" | "error";
}

export default function ToastMessage({
  message,
  variant = "success",
}: ToastMessageProps) {
  if (!message) return null;

  const dotClass = variant === "error" ? "bg-red-400" : "bg-primary";

  return (
    <div className="fixed bottom-6 right-6 z-[2000] flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
      {message}
    </div>
  );
}
