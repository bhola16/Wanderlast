
import BookingCard from "@/components/booking/BookingCard";
import DeleteDestinationDialog from "@/components/destinations/DeleteDestinationDialog";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import { IDestination } from "@/type/Type";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/destinations/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch destination details");
  }

  const destination: IDestination = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Destinations
          </Link>

          <div className="flex gap-3">
            <EditDestinationDialog destination={destination} />
            <DeleteDestinationDialog id={id} />
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Destination Information */}
          <div className="space-y-7 lg:col-span-2">
            {/* Destination Image */}
            <div className="relative h-64 overflow-hidden rounded-2xl sm:h-96">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />

              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-md">
                <Star
                  size={17}
                  className="fill-yellow-400 text-yellow-400"
                />
                {destination.rating}
              </div>
            </div>

            {/* Destination Heading */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={18} className="text-blue-600" />
                <span>{destination.country}</span>
                <span>·</span>
                <span>{destination.category}</span>
              </div>

              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                {destination.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="font-semibold text-gray-900">
                    {destination.rating}
                  </span>
                  <span>reviews</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={17}
                    className="text-blue-600"
                  />
                  <span>{destination.duration}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Overview
              </h2>

              <p className="leading-7 text-gray-600">
                {destination.description}
              </p>
            </section>

            {/* Highlights */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Highlights
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-green-600"
                  />
                  <span>
                    Explore the beautiful destination in {destination.country}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-green-600"
                  />
                  <span>
                    Enjoy a {destination.duration} travel experience
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-green-600"
                  />
                  <span>
                    Discover unique{" "}
                    {destination.category.toLowerCase()} attractions
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Booking Card */}
          <BookingCard destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
