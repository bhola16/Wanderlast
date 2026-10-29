
import DestinationCard from "@/components/destinations/DestinationCard";
import { IDestination } from "@/type/Type";

const AllDestinationsPage = async () => {
    let data: IDestination[] = [];
    let apiError = false;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_API_URL}/destinations`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch destinations");
        }

        data = await res.json();
    } catch (error) {
        console.error("Error fetching destinations:", error);
        apiError = true;
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            {/* Heading Section */}
            <div className="mb-8 text-center">
                <h1 className="mb-3 text-3xl font-bold">
                    Explore All Destinations
                </h1>

                <p className="text-gray-500">
                    Find your perfect travel experience from our curated collection
                </p>

                {!apiError && (
                    <p className="mt-4 text-sm text-gray-600">
                        Showing {data.length} destinations
                    </p>
                )}
            </div>

            {/* Destinations Grid or Empty State */}
            {apiError || data.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {apiError
                            ? "Unable to load destinations"
                            : "No destinations available"}
                    </h2>

                    <p className="mt-3 text-gray-500">
                        {apiError
                            ? "We're having trouble connecting to the server. Please try again later."
                            : "There are no destinations to show right now. Please check back later."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((destination) => (
                        <DestinationCard
                            key={destination._id}
                            destination={destination}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllDestinationsPage;
