
import MyBookingsCard from "@/components/booking/MyBookingsCard";
import { auth } from "@/lib/auth";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
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
  const token = await getTokenFromClient();

  const res = await fetch(
    `http://localhost:8000/mybookings/${encodeURIComponent(user.email)}`,
    {
      headers: {
          authorization: `Bearer ${token}`
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings.");
  }

  const bookings: IBooking[] = await res.json();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and view your upcoming travel plans.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No bookings yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your travel bookings will appear here.
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
