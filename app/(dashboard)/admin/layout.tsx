// import { requireAdminUser } from "@/lib/auth/session";
import AdminSidebar from "@/components/dashboard/AdminDashboard";
import AdminTopbar from "@/components/dashboard/AdminTopbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const currentUser = await requireAdminUser();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f7f8fa" }}>
      <AdminSidebar fullName="Admin Page" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar
          fullName="Admin Page"
          roleLabel="Administrator"
          pageTitle="Dashboard"
          // Pass breadcrumb from nested layouts or page props as needed:
          // breadcrumb={["Vehicles"]}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}