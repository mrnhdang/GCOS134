"use client";

import AdminLayout from "@/components/admin/layout/AdminLayout";
import "../globals.css";

export default function AdminRootLayout({ children }) {
  return (
    <AdminLayout>{children}</AdminLayout>
  );
}
