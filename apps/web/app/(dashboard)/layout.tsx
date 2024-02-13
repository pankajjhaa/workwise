import "@repo/ui/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Sidebar from "../../components/common/sidebar";
import Provider from "../_trpc/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workwise Dashboard",
  description: "Dashboard for Workwise."
};

export default function DashboardLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <div className={"flex min-h-screen flex-col"}>
        <div className={"flex flex-1"}>
          <div className={"relative"}>
            <Sidebar />
          </div>

          <div className={"flex w-0 flex-1 flex-col"}>
            {children}
          </div>
        </div>

      </div>
    </Provider>
  );
}
