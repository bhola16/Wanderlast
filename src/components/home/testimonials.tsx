import Image from "next/image";
import { display } from "@/lib/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/assets/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/assets/person1.png",
  },
  {
    quote:
      '"The Tropical Island Hopping Tour Was Beyond Expectations! Crystal Clear Waters, Delicious Local Food And The Friendliest Crew We\'ve Ever Met."',
    name: "Priya Patel",
    location: "Mumbai, India",
    photo: "/assets/person1.png",
  },
  {
    quote:
      '"From Booking To The Final Sunset, Everything Ran Seamlessly. Our Guide Knew Every Hidden Gem And Made The Trip Feel Truly Personal."',
    name: "David Kim",
    location: "Seoul, South Korea",
    photo: "/assets/person2.png",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-20">
      <Carousel className="mx-auto max-w-6xl" opts={{ align: "start" }}>
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <h2
              className={`${display.className} text-4xl font-light text-neutral-900 md:text-5xl`}
            >
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="relative hidden h-11 w-24 shrink-0 sm:block">
            <CarouselPrevious className="absolute inset-y-0 left-0 my-auto size-11 text-neutral-400" />
            <CarouselNext className="absolute inset-y-0 right-0 my-auto size-11 text-neutral-400" />
          </div>
        </div>

        <CarouselContent>
          {testimonials.map(({ quote, name, location, photo }) => (
            <CarouselItem key={name} className="md:basis-1/2">
              <figure className="flex h-full flex-col justify-between gap-6 border border-neutral-200 bg-white p-7 sm:flex-row">
                <div className="flex flex-1 flex-col">
                  <blockquote
                    className={`${display.className} text-lg leading-snug font-normal text-neutral-900`}
                  >
                    {quote}
                  </blockquote>
                  <figcaption className="mt-auto pt-8">
                    <p className="text-sm font-medium text-[#3ab0cb]">
                      — {name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{location}</p>
                  </figcaption>
                </div>
                <Image
                  src={photo}
                  alt={name}
                  width={208}
                  height={208}
                  className="h-40 w-40 shrink-0 self-start object-cover sm:h-52 sm:w-52"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
