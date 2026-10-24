import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { display } from "@/lib/fonts";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <Image
        src="/assets/Banner.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex min-h-[560px] flex-col md:min-h-[calc(100vh-4rem)]">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
          <h1
            className={`${display.className} text-5xl leading-[1.1] font-light text-white md:text-7xl`}
          >
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mt-6 max-w-xl text-base text-neutral-200">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="group flex items-center gap-3 rounded-sm bg-[#4dbdd8] px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#3ab0cb]"
            >
              Explore Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              className="rounded-sm bg-neutral-600 px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-neutral-500"
            >
              View Destination
            </button>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 md:grid-cols-5">
          {searchFields.map(({ label, value }) => (
            <button
              key={label}
              type="button"
              className="flex flex-col items-start justify-center border-r border-white/10 bg-[#3d3d3d] px-6 py-3 text-left transition-colors hover:bg-[#484848]"
            >
              <span className="text-sm font-semibold text-white">{label}</span>
              <span className="text-xs text-neutral-300">{value}</span>
            </button>
          ))}
          <button
            type="button"
            className="col-span-2 bg-[#4dbdd8] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#3ab0cb] md:col-span-1"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
