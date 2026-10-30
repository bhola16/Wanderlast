
import MyBookingsCard from "@/components/booking/MyBookingsCard";
import { auth } from "@/lib/auth";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { IBooking } from "@/type/Type";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  let bookings: IBooking[] = [];
  let apiError = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/mybookings/${encodeURIComponent(user.email)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch bookings.");
    }

    bookings = await res.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    apiError = true;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and view your upcoming travel plans.
        </p>

        {!apiError && (
          <p className="mt-3 text-sm text-gray-600">
            Showing {bookings.length} bookings
          </p>
        )}
      </div>

      {/* Error or Empty State */}
      {apiError ? (
        <div className="w-full rounded-xl border border-red-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Unable to load bookings
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            We couldn't connect to the server. Please try again later.
          </p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No bookings yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your travel bookings will appear here when you book a destination.
          </p>
        </div>
      ) : (
        <div className="w-full space-y-5">
          {bookings.map((booking) => (
            <MyBookingsCard
              booking={booking}
              key={booking._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
