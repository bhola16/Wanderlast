import { ArrowRight } from "lucide-react";
import { display } from "@/lib/fonts";

export default function Cta() {
  return (
    <section className="bg-[#1a1a1a] px-6 py-24 text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <h2
          className={`${display.className} text-4xl font-light text-white md:text-5xl`}
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-neutral-300">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button
          type="button"
          className="group mt-9 flex items-center gap-4 rounded-sm bg-white px-8 py-4 text-sm font-semibold tracking-wide text-neutral-900 uppercase transition-colors hover:bg-neutral-200"
        >
          Book Your Trip Today
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
