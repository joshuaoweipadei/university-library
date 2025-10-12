import React, { ReactNode } from "react";
import { User } from "next-auth";
// import type { Session } from "@auth/core/types";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header user={session?.user as User} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
