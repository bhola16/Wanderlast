
"use client";

import { IBooking } from "@/type/Type";
import { CalendarDays, Eye, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface MyBookingsCardProps {
  booking: IBooking;
}

const MyBookingsCard = ({ booking }: MyBookingsCardProps) => {
  const router = useRouter();

  const handleCancelBooking = async () => {
    const res = await fetch(
      `http://localhost:8000/mybookings/${booking._id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      router.refresh();
    }
  };

  const handleViewBooking = () => {
    router.push(`/destinations/${booking.destinationId}`);
  };

  return (
    <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row">
      {/* Destination Image */}
      <div className="h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-48">
        <Image
          src={booking.imageUrl}
          alt={booking.destinationName}
          width={192}
          height={160}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Booking Information */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {booking.destinationName}
          </h2>

          <p className="mt-1 text-sm text-gray-500">{booking.country}</p>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays size={18} className="shrink-0 text-blue-600" />
            <span>
              Departure:{" "}
              {new Date(booking.departureDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Booking ID:{" "}
            <span className="font-medium text-gray-800">{booking._id}</span>
          </p>

          <p className="mt-3 text-lg font-bold text-gray-900">
            ${booking.price}
            <span className="ml-1 text-sm font-normal text-gray-500">
              / person
            </span>
          </p>
        </div>

        {/* Status and Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : booking.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {booking.status}
          </span>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleCancelBooking}
              variant="outline"
              type="button"
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <XCircle size={17} />
              Cancel
            </Button>

            <Button
              onClick={handleViewBooking}
              type="button"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Eye size={17} />
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsCard;
