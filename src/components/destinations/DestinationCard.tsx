import { IDestination } from '@/type/Type';
import { ArrowRight, CalendarDays, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



interface DestinationCardProps {
    destination: IDestination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
    const {
        name,
        country,
        price,
        duration,
        imageUrl,
        rating,
    } = destination;


    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Image and Rating */}
            <div className="relative h-56 w-full">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold shadow">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>{rating}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5">
                {/* Location */}
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-blue-600" />
                    <span>{country}</span>
                </div>

                {/* Name and Price */}
                <div className="mb-4 flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                        {name}
                    </h2>

                    <div className="shrink-0 text-right">
                        <p className="text-xl font-bold text-blue-600">
                            ${price}<span className="text-md text-gray-500">/ Person</span>
                        </p>
                        
                    </div>
                </div>

                {/* Duration */}
                <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={17} className="text-blue-600" />
                    <span>{duration}</span>
                </div>
                {/* Book Now */}
<Link
    href={`/destinations/${destination._id}`}
    className="group flex w-full items-center justify-between rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
>
    <span>BOOK NOW</span>
    <ArrowRight
        size={20}
        className="transition-transform group-hover:translate-x-1"
    />
</Link>
                
            </div>
        </div>
    );
};

export default DestinationCard;