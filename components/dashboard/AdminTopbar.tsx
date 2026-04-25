"use client";

export default function AdminTopbar({
  fullName,
  roleLabel,
  pageTitle,
}: {
  fullName: string;
  roleLabel: string;
  pageTitle: string;
}) {
  return (
    <header className="h-[60px] border-b border-line/20 bg-background flex items-center justify-between px-6">
      
      <h2 className="text-type-h4 font-bold text-foreground">
        {pageTitle}
      </h2>

      <div className="text-right">
        <p className="text-type-prose font-semibold text-foreground">{fullName}</p>
        <p className="text-type-meta text-gray-mid">{roleLabel}</p>
      </div>

    </header>
  );
}