
"use client";

import { IFeaturedDestination } from "@/type/Type";
import {
    ArrowRight,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface FeaturedDestinationsCarouselProps {
  destinations: IFeaturedDestination[];
}

const FeaturedDestinationsCarousel = ({
  destinations,
}: FeaturedDestinationsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const updateCurrent = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card !== null
    );

    if (cards.length === 0) {
        setCurrent(0);
        return;
    }

    const containerRect = container.getBoundingClientRect();

    let bestIndex = 0;
    let maxVisibleWidth = 0;

    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();

        const visibleLeft = Math.max(cardRect.left, containerRect.left);
        const visibleRight = Math.min(cardRect.right, containerRect.right);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);

        if (visibleWidth > maxVisibleWidth) {
        maxVisibleWidth = visibleWidth;
        bestIndex = index;
        }
    });

    setCurrent(bestIndex);
}, []);

  const handleScroll = useCallback(
    (direction: "left" | "right") => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card !== null
      );

      if (cards.length === 0) return;

      const nextIndex =
        direction === "right"
          ? Math.min(current + 1, cards.length - 1)
          : Math.max(current - 1, 0);

      const container = scrollRef.current;
      const target = cards[nextIndex];

      if (!container || !target) return;

      const containerStyle = window.getComputedStyle(container);
      const paddingLeft = parseFloat(containerStyle.scrollPaddingLeft) || 0;

      const targetLeft =
        container.scrollLeft +
        target.getBoundingClientRect().left -
        container.getBoundingClientRect().left -
        paddingLeft;

      container.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    },
    [current]
  );

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let frame = 0;

    const handleScrollUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateCurrent);
    };

    container.addEventListener("scroll", handleScrollUpdate, {
      passive: true,
    });

    updateCurrent();

    return () => {
      container.removeEventListener("scroll", handleScrollUpdate);
      cancelAnimationFrame(frame);
    };
  }, [updateCurrent, destinations]);

  return (
    <div className="relative">
      {/* Scrollable Destination Cards */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {destinations.map((destination, index) => (
          <article
            key={destination._id}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="group w-[340px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[400px] lg:w-[460px]"
          >
            {/* Image and Rating */}
            <div className="relative h-60 w-full overflow-hidden bg-gray-100 sm:h-64">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                fill
                unoptimized
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 460px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold shadow">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span>{destination.rating ?? "New"}</span>
              </div>

              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                {destination.category}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-[#3ab0cb]" />
                <span>{destination.country}</span>
              </div>

              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {destination.name}
                </h2>

                <div className="shrink-0 text-right">
                  <p className="text-xl font-bold text-[#238ba2]">
                    ${Number(destination.price).toLocaleString("en-US")}
                  </p>
                  <span className="text-xs text-gray-500">/ Person</span>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={17} className="text-[#3ab0cb]" />
                <span>{destination.duration}</span>
              </div>

              <Link
                href={`/destinations/${destination._id}`}
                className="group/button flex w-full items-center justify-between rounded-lg bg-[#3ab0cb] px-4 py-3 font-semibold text-white transition hover:bg-[#238ba2]"
              >
                <span>BOOK NOW</span>
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover/button:translate-x-1"
                />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Counter and Arrow Buttons */}
      <div className="mt-2 flex items-center justify-between">
        <p
          className="text-sm font-medium text-gray-500"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="inline-flex min-w-10 items-center justify-center rounded-md bg-[#3ab0cb]/10 px-2 py-1 text-lg font-bold text-[#238ba2] transition-all duration-300 hover:bg-[#3ab0cb] hover:text-white">
            {String(destinations.length === 0 ? 0 : current + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(destinations.length).padStart(2, "0")}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={current <= 0}
            aria-label="Previous destination"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[#3ab0cb] hover:bg-[#3ab0cb] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-700"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={current >= destinations.length - 1}
            aria-label="Next destination"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[#3ab0cb] hover:bg-[#3ab0cb] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-700"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestinationsCarousel;
