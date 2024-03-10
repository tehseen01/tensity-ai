import { Sidebar } from "@/components/dashboard";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-dvh flex overflow-hidden max-md:flex-col">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default DashboardLayout;
