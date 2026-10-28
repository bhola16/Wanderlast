export interface IDestination {
    _id: string;
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    rating: number;
}

export interface IBooking {
  _id: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  destinationId: string;
  destinationName: string;
  country: string;
  imageUrl: string;
  price: number;
  departureDate: string;
  status: string;
}