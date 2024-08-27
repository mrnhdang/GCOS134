import AdminLayout from "@/components/layout/admin/AdminLayout";
import "../globals.css";

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
