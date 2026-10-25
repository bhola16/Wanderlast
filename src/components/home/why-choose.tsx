import Image from "next/image";
import { display } from "@/lib/fonts";

const features = [
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#e8f5fa] px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2
          className={`${display.className} text-4xl font-light text-neutral-900 md:text-5xl`}
        >
          Why Choose Wanderlast
        </h2>
        <p className="mt-3 text-sm text-neutral-600">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid gap-7 text-left md:grid-cols-3">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col bg-white px-9 pt-9 pb-10"
            >
              <Image src={icon} alt="" width={44} height={44} className="h-11 w-11" />
              <h3
                className={`${display.className} mt-6 text-2xl font-normal text-neutral-900`}
              >
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
