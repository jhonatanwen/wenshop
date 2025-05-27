export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
}

export interface IconProps {
  className?: string;
  size?: number;
  fill?: string;
  stroke?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  token?: string;
}
