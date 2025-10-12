"use client";

import { User } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const Header = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        {/*<li>*/}
        {/*  <form*/}
        {/*    action={async () => {*/}
        {/*      console.log("Logout");*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Button>Logout</Button>*/}
        {/*  </form>*/}
        {/*</li>*/}
      </ul>
    </header>
  );
};

export default Header;
