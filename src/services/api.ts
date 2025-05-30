import axios from "axios";
import {
  CartItem,
  LoginCredentials,
  Product,
  RegisterData,
  User,
} from "../types";

// URL base da API - usa variável de ambiente ou fallback para localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Criando uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de autenticação em todas as requisições
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

// Serviço para produtos
export const productService = {
  // Buscar todos os produtos
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get("/products");
      return response.data.data; // A API retorna { success: true, data: [...] }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  },

  // Buscar um produto pelo ID
  getById: async (id: number): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return null;
    }
  },

  // Buscar produtos em destaque
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

// Serviço para autenticação
export const authService = {
  // Login de usuário
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

  // Registro de usuário
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

  // Logout de usuário
  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },

  // Obter o usuário atual
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// Serviço para o carrinho de compras
export const cartService = {
  // Obter itens do carrinho
  getItems: (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  },

  // Adicionar item ao carrinho
  addItem: async (productId: number, quantity: number = 1): Promise<void> => {
    if (typeof window === "undefined") return;

    const cartItems = cartService.getItems();
    const product = await productService.getById(productId);

    if (!product) return;

    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Gera um ID mais determinístico baseado no productId
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

  // Remover item do carrinho
  removeItem: (id: number): void => {
    if (typeof window === "undefined") return;

    let cartItems = cartService.getItems();
    cartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  },

  // Atualizar quantidade de um item
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

  // Calcular o total do carrinho
  getTotal: (): number => {
    const cartItems = cartService.getItems();
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  // Limpar o carrinho
  clearCart: (): void => {
    localStorage.removeItem("cartItems");
  },
};

export default api;
