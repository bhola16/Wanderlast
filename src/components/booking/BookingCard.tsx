
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
import { FormEvent, useEffect, useState } from "react";

interface BookingCardProps {
  destination: IDestination;
}

const BookingCard = ({ destination }: BookingCardProps) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [checkingBooking, setCheckingBooking] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      setBooked(false);
      setCheckingBooking(false);
      setMessage("");
      return;
    }

    let cancelled = false;

    const checkBooking = async () => {
      setCheckingBooking(true);
      setMessage("");

      try {
        const params = new URLSearchParams({
          userEmail: user.email,
          destinationId: destination._id,
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/bookings/check?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error("Failed to check booking.");
        }

        const data: { booked: boolean } = await res.json();

        if (!cancelled) {
          setBooked(data.booked);

          if (data.booked) {
            setMessage(
              "You have already booked this destination. Cancel your existing booking before booking again."
            );
          }
        }
      } catch {
        if (!cancelled) {
          setMessage("Unable to check your existing booking. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setCheckingBooking(false);
        }
      }
    };

    void checkBooking();

    return () => {
      cancelled = true;
    };
  }, [user, isPending, destination._id]);

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      router.push("/login");
      return;
    }

    if (booked || checkingBooking || loading) return;

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate");

    if (typeof departureDate !== "string" || !departureDate) {
      setMessage("Please select a departure date.");
      return;
    }

    setLoading(true);

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

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const bookingRes: { message?: string } = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setBooked(true);
        }

        setMessage(
          bookingRes.message || "Booking failed. Please try again."
        );
        return;
      }

      setBooked(true);
      setMessage("Your booking was successful!");
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled =
    loading || booked || checkingBooking || isPending;

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
                disabled={buttonDisabled}
                className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
          </div>

          {message && (
            <p
              role="status"
              className={`mb-4 text-sm ${
                booked ? "text-green-600" : "text-gray-700"
              }`}
            >
              {message}
            </p>
          )}

          <div className="my-6 border-t border-gray-100" />

          <button
            type="submit"
            disabled={buttonDisabled}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              booked
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending || checkingBooking
              ? "Checking Booking..."
              : loading
                ? "Submitting..."
                : booked
                  ? "Already Booked"
                  : "Book Now"}

            {!loading &&
              !checkingBooking &&
              !isPending &&
              (booked ? (
                <CheckCircle2 size={19} />
              ) : (
                <ArrowRight size={19} />
              ))}
          </button>
        </form>

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
