import AdminSidebar from "@/components/dashboard/AdminDashboard";
import AdminTopbar from "@/components/dashboard/AdminTopbar";
import { requireAdminUser } from "@/lib/auth/session";
import { icons } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await requireAdminUser();

  return (
    <div className="flex h-screen overflow-hidden bg-subtle">

      {/* Sidebar */}
      <AdminSidebar fullName={currentUser.fullName} email={currentUser.email} />

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar
          fullName="ZAG Rwanda"
          roleLabel="Admin"
          pageTitle="Dashboard"
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}