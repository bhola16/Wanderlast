
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/add-destination", label: "Add Destination" },
  { href: "/mybookings", label: "My Bookings" },
];

const guestLinks = [
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      // console.log("Sign out.......")
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <header className="w-full border-b border-black/5 bg-white">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={
                  isActive
                    ? "text-sm font-medium text-[#3ab0cb] underline underline-offset-4"
                    : "text-sm font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb]"
                }
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Wanderlast home"
        >
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlast"
            width={173}
            height={20}
            priority
            className="h-5 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                aria-current={pathname === "/profile" ? "page" : undefined}
                className={
                  pathname === "/profile"
                    ? "flex items-center gap-1.5 text-sm font-medium text-[#3ab0cb]"
                    : "flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb]"
                }
              >
                <UserRound className="h-4 w-4" />
                <span>Profile</span>
              </Link>

              <Popover>
                <PopoverTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Open user menu"
                      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#3ab0cb] focus-visible:ring-offset-2"
                    >
                      <Avatar>
                        <AvatarImage
                          src={user.image ?? undefined}
                          alt={user.name ?? "User"}
                          referrerPolicy="no-referrer"
                        />
                        <AvatarFallback>
                          {user.name?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  }
                />

                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>{user.name}</PopoverTitle>
                    <PopoverDescription>
                      {user.email}
                    </PopoverDescription>
                  </PopoverHeader>

                  <div className="mt-3">
                    <Button
                      onClick={handleSignOut}
                      variant="destructive"
                      className="w-full"
                    >
                      Sign out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              {guestLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb]"
                >
                  {label}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
