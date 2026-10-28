
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
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <header className="w-full border-b border-black/5 bg-white">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-3 sm:px-5 md:px-6">
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 lg:flex xl:gap-7">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "text-sm font-medium text-[#3ab0cb] underline underline-offset-4"
                    : "text-sm font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb]"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Responsive Logo */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 top-1/2 w-[clamp(100px,35vw,173px)] -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlast"
            width={173}
            height={20}
            priority
            sizes="(max-width: 640px) 35vw, (max-width: 1024px) 173px, 173px"
            className="block h-auto w-full object-contain"
          />
        </Link>

        {/* Desktop User Menu / Guest Links */}
        <div className="ml-auto hidden items-center gap-4 lg:flex xl:gap-6">
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
                          {user.name?.charAt(0).toUpperCase() ?? "U"}
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

        {/* Mobile and Tablet User Actions */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          {user ? (
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
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
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

                <div className="mt-3 flex flex-col gap-3">
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-neutral-900 hover:text-[#3ab0cb]"
                  >
                    Profile
                  </Link>

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
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb] sm:text-sm"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-[#3ab0cb] px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#299bb5] sm:px-3 sm:text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile and Tablet Navigation Links */}
      <nav className="flex items-center justify-center gap-x-4 overflow-x-auto border-t border-black/5 px-3 py-3 sm:gap-x-6 lg:hidden">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "shrink-0 text-xs font-medium text-[#3ab0cb] underline underline-offset-4 sm:text-sm"
                  : "shrink-0 text-xs font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb] sm:text-sm"
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
