import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
];

const authLinks = [
  { href: "/profile", label: "Profile", icon: true },
  { href: "/login", label: "Login", icon: false },
  { href: "/signup", label: "Sign Up", icon: false },
];

export default function Navbar() {
  return (
    <header className="w-full border-b border-black/5 bg-white">
      <div className="relative flex h-16 w-full items-center justify-between px-6">
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                href === "/"
                  ? "text-sm font-medium text-[#3ab0cb] underline underline-offset-4"
                  : "text-sm font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb]"
              }
            >
              {label}
            </Link>
          ))}
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
          {authLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-[#3ab0cb]"
            >
              {icon && <User className="h-4 w-4" />}
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
