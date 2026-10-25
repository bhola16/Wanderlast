
import DeleteDestinationDialog from "@/components/destinations/DeleteDestinationDialog";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import { IDestination } from "@/type/Type";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    Headset,
    MapPin,
    ShieldCheck,
    Star,
    X
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

    const data: IDestination = await res.json();

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
                        <EditDestinationDialog destination={data} />
                        
                        <DeleteDestinationDialog id={id}/>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

                    {/* Destination Information */}
                    <div className="space-y-7 lg:col-span-2">

                        {/* Destination Image */}
                        <div className="relative h-64 overflow-hidden rounded-2xl sm:h-96">
                            <Image
                                src={data.imageUrl}
                                alt={data.name}
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
                                {data.rating}
                            </div>
                        </div>

                        {/* Destination Heading */}
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                                <MapPin size={18} className="text-blue-600" />
                                <span>{data.country}</span>
                                <span>·</span>
                                <span>{data.category}</span>
                            </div>

                            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {data.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Star
                                        size={17}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                    <span className="font-semibold text-gray-900">
                                        {data.rating}
                                    </span>
                                    <span>reviews</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <CalendarDays
                                        size={17}
                                        className="text-blue-600"
                                    />
                                    <span>{data.duration}</span>
                                </div>
                            </div>
                        </div>

                        {/* Overview */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Overview
                            </h2>

                            <p className="leading-7 text-gray-600">
                                {data.description}
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
                                        Explore the beautiful destination in {data.country}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600">
                                    <CheckCircle2
                                        size={20}
                                        className="shrink-0 text-green-600"
                                    />
                                    <span>
                                        Enjoy a {data.duration} travel experience
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600">
                                    <CheckCircle2
                                        size={20}
                                        className="shrink-0 text-green-600"
                                    />
                                    <span>
                                        Discover unique {data.category.toLowerCase()} attractions
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Booking Card */}
                    <aside className="lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

                            <p className="text-sm text-gray-500">
                                Starting from
                            </p>

                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${data.price}
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                per person
                            </p>

                            <div className="my-6 border-t border-gray-100" />

                            {/* Departure Date */}
                            <div className="mb-6">
                                <label
                                    htmlFor="departureDate"
                                    className="mb-2 block text-sm font-semibold text-gray-800"
                                >
                                    Departure Date
                                </label>

                                <div className="relative">
                                    <CalendarDays
                                        size={18}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        id="departureDate"
                                        type="date"
                                        defaultValue={data.departureDate}
                                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            {/* Book Now */}
                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700">
                                Book Now
                                <ArrowRight size={19} />
                            </button>

                            <p className="mt-3 text-center text-xs text-gray-500">
                                No payment required to inquire
                            </p>

                            <div className="my-6 border-t border-gray-100" />

                            {/* Booking Benefits */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={19}
                                        className="mt-0.5 shrink-0 text-green-600"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Free cancellation up to 7 days
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <ShieldCheck
                                        size={19}
                                        className="mt-0.5 shrink-0 text-green-600"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Travel insurance included
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Headset
                                        size={19}
                                        className="mt-0.5 shrink-0 text-green-600"
                                    />
                                    <span className="text-sm text-gray-600">
                                        24/7 customer support
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 rounded-lg bg-blue-50 p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                                    <Clock size={18} />
                                    Ready for your next adventure?
                                </div>
                                <p className="mt-2 text-sm leading-6 text-blue-700">
                                    Plan your trip and get ready to explore {data.country}.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;
