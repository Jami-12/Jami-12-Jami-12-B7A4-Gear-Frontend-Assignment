export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isSuspended?: boolean;
}

export interface IGearItem {
  id: string;
  name: string;
  brand: string;
  description: string;
  dailyRate: number;
  stock: number;
  availableStock: number;
  imageUrl?: string;
  category?: { id: string; name: string };
  providerId: string;
}

export type RentalStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface IRentalOrder {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  rentalStatus: RentalStatus;
  gearItem?: IGearItem;
  customer?: IUser;
}
