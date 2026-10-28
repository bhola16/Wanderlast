
"use client";

import { authClient } from "@/lib/auth-client";
import { IDestination } from "@/type/Type";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    Headset,
    ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface BookingCardProps {
  destination: IDestination;
}

const BookingCard = ({ destination }: BookingCardProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      router.push("/login");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate") as string;

    if (!departureDate) {
      setMessage("Please select a departure date.");
      return;
    }

    const bookingData = {
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
      destinationId: destination._id,
      destinationName: destination.name,
      country: destination.country,
      imageUrl: destination.imageUrl,
      price: destination.price,
      departureDate,
      bookingDate: new Date(),
      status: "pending",
    };

    // console.log(bookingData);
    const res = await fetch("http://localhost:8000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const bookingRes = await res.json()
      console.log(bookingRes);

    
  };

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <p className="text-sm text-gray-500">Starting from</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            ${destination.price}
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-500">per person</p>

        <p className="mt-3 text-center text-xs text-gray-500">
          No payment required to inquire
        </p>

        <div className="my-6 border-t border-gray-100" />

        <form onSubmit={handleBooking}>
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
                name="departureDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                defaultValue={destination.departureDate}
                required
                className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {message && (
            <p
              role="status"
              className="mb-4 text-sm text-gray-700"
            >
              {message}
            </p>
          )}

          <div className="my-6 border-t border-gray-100" />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Book Now"}
            {!loading && <ArrowRight size={19} />}
          </button>
        </form>

        {/* Booking Benefits */}
        <div className="mt-6 space-y-4">
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
            Plan your trip and get ready to explore {destination.country}.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default BookingCard;
