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

export interface IUser {
 id: string;
 createdAt: Date;
 updatedAt: Date;
 email: string;
 emailVerified: boolean;
 name: string;
 image?: string | null | undefined;
} 

export interface IFeaturedDestination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  imageUrl: string;
}