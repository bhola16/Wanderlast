import { IFeaturedDestination } from "@/type/Type";
import Link from "next/link";
import FeaturedDestinationsCarousel from "./FeaturedDestinationsCarousel";

const FeaturedPage = async () => {
  let destinations: IFeaturedDestination[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/featured-destinations`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch featured destinations.");
    }

    destinations = await res.json();
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#3ab0cb]">
            Discover your next adventure
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Destinations
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore handpicked destinations and find the perfect place for
            your next unforgettable journey.
          </p>
        </div>

        <Link
          href="/destinations"
          className="mb-1 shrink-0 text-sm font-semibold text-[#238ba2] transition hover:text-[#3ab0cb] sm:text-base"
        >
          All Destinations →
        </Link>
      </div>

      {destinations.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-12 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No featured destinations available
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please check back later for new travel experiences.
          </p>
        </div>
      ) : (
        <FeaturedDestinationsCarousel destinations={destinations} />
      )}
    </main>
  );
};

export default FeaturedPage;