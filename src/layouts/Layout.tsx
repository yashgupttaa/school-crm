

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { Role } from "../config/sidebar.config";

export default function Layout({ children }: { children: React.ReactNode }) {
  const role: Role = useSelector((_s: any) => "admin");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1">
        <Header onOpenMenu={() => setMobileOpen(true)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
