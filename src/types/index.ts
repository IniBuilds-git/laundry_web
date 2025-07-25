export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  referral_code: string;
}

export interface Service {
  id: number;
  service_name: string;
  service_description: string;
  service_image: string;
  products: Product[];
}

export interface Product {
  id: number;
  product_name: string;
  product_image: string;
  unit_price: string;
}

export interface Address {
  id?: number;
  address: string;
  state: string;
  lga: string;
}

export interface Order {
  id: number;
  client_name: string;
  client_email: string;
  client_phone_number: string;
  transaction_id: string;
  pick_up_date: string;
  delivery_date: string;
  total_price: string;
  pickup_price?: string;
  delivery_price?: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_name: string;
  service_type: string;
  quantity: number;
  total_price: string;
  quantity_price: number;
}

export type DeliveryType = 'standard' | 'express';

export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  referred_by?: string;
}

export interface BookingState {
  selectedService: Service | null;
  selectedItems: { product: Product; quantity: number; service: Service }[];
  deliveryType: DeliveryType;
  pickupDate: Date | null;
  address: Address | null;
  needsPickup: boolean;
  needsDelivery: boolean;
}

