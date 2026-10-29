import AdminSettings from "@/components/dashboard/AdminSettings";
import { requireAdminUser } from "@/lib/auth/session";

export default async function AdminSettingsPage() {
  const user = await requireAdminUser();

  return <AdminSettings fullName={user.fullName} email={user.email} />;
}
