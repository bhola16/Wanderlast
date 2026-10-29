
import Link from "next/link";
import { ArrowLeft, Compass, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#3ab0cb]/10">
          <Compass size={42} className="text-[#238ba2]" />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#238ba2]">
          404 — Page Not Found
        </p>

        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Lost your way?
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
          Looks like this destination doesn't exist or may have been moved.
          Let's get you back on track and find your next adventure.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3ab0cb] px-6 py-3 font-semibold text-white transition hover:bg-[#238ba2]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-[#3ab0cb] hover:text-[#238ba2]"
          >
            <SearchX size={18} />
            Explore Destinations
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          Every great journey starts somewhere.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
