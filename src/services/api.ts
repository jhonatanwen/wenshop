import axios from "axios";
import {
  CartItem,
  LoginCredentials,
  Product,
  RegisterData,
  User,
} from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const productService = {
  getAll: async (params?: {
    search?: string;
    category?: string;
    limit?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<Product[]> => {
    try {
      const searchParams = new URLSearchParams();

      if (params?.search?.trim()) {
        searchParams.append("search", params.search.trim());
      }
      if (params?.category?.trim()) {
        searchParams.append("category", params.category.trim());
      }
      if (params?.limit && params.limit > 0) {
        searchParams.append("limit", params.limit.toString());
      }
      if (params?.sortBy?.trim()) {
        searchParams.append("sortBy", params.sortBy.trim());
      }
      if (params?.order) {
        searchParams.append("order", params.order);
      }

      const queryString = searchParams.toString();
      const url = `/products${queryString ? `?${queryString}` : ""}`;

      const response = await api.get(url);
      return response.data.data || [];
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  },

  getById: async (id: number): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return null;
    }
  },

  getFeatured: async (): Promise<Product[]> => {
    try {
      const response = await api.get("/products/featured/list");
      return response.data.data;
    } catch (error) {
      console.error("Erro ao buscar produtos em destaque:", error);
      return [];
    }
  },
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User | null> => {
    try {
      const response = await api
        .post("/auth/login", credentials)
        .catch((error) => {
          if (error.response) {
            console.log("Erro de autenticação:", error.response.data);
            throw new Error(
              error.response.data.message || "Erro de autenticação"
            );
          } else if (error.request) {
            console.log("Erro de rede:", error.message);
            throw new Error("Erro de rede. Por favor, tente novamente.");
          } else {
            console.log("Erro ao configurar a requisição:", error.message);
            throw new Error(
              "Erro ao configurar a requisição. Por favor, tente novamente."
            );
          }
        });
      const { token, user } = response.data.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return null;
    }
  },

  register: async (data: RegisterData): Promise<User | null> => {
    try {
      const response = await api.post("/auth/register", data);
      const { token, user } = response.data.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return null;
    }
  },

  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export const cartService = {
  getItems: (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  },

  addItem: async (productId: number, quantity: number = 1): Promise<void> => {
    if (typeof window === "undefined") return;

    const cartItems = cartService.getItems();
    const product = await productService.getById(productId);

    if (!product) return;

    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newId = productId * 1000 + cartItems.length;
      cartItems.push({
        id: newId,
        productId,
        product,
        quantity,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  },

  removeItem: (id: number): void => {
    if (typeof window === "undefined") return;

    let cartItems = cartService.getItems();
    cartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  },

  updateQuantity: (id: number, quantity: number): void => {
    if (typeof window === "undefined") return;

    if (quantity <= 0) {
      cartService.removeItem(id);
      return;
    }

    const cartItems = cartService.getItems();
    const item = cartItems.find((item) => item.id === id);

    if (item) {
      item.quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  },

  getTotal: (): number => {
    const cartItems = cartService.getItems();
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  clearCart: (): void => {
    localStorage.removeItem("cartItems");
  },
};

export default api;
