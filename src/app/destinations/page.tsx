import DestinationCard from "@/components/destinations/DestinationCard";
import { IDestination } from "@/type/Type";



const AllDestinationsPage = async () => {
    const res = await fetch("http://localhost:8000/destinations");
    const data: IDestination[] = await res.json();
    

    return (
        <div className="p-6 mx-auto max-w-7xl">
            {/* Heading Section */}
            <div className="mb-8 text-center">
                <h1 className="mb-3 text-3xl font-bold">
                    Explore All Destinations
                </h1>

                <p className="text-gray-500">
                    Find your perfect travel experience from our curated collection
                </p>

                <p className="mt-4 text-sm text-gray-600">
                    Showing {data.length} destinations
                </p>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.map((destination) => (
                    <DestinationCard
                        key={destination._id}
                        destination={destination}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllDestinationsPage;