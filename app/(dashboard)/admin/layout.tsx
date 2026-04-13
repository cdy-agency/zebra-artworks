import AdminSidebar from "@/components/dashboard/AdminDashboard";
import AdminTopbar from "@/components/dashboard/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-subtle">
      
      {/* Sidebar */}
      <AdminSidebar fullName="ZAG Rwanda" />

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