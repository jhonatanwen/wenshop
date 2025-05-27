"use client";

import { authService } from "@/services/api";
import { AuthState } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Criando o contexto de autenticação com um valor inicial
const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}>({
  authState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado para controlar se o componente está montado no cliente
  const [mounted, setMounted] = useState(false);

  // Estado para armazenar informações de autenticação
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  // Efeito para marcar como montado
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efeito para verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    if (!mounted) return;

    const checkAuth = () => {
      try {
        // Verifica se há um token no localStorage
        if (authService.isAuthenticated()) {
          const user = authService.getCurrentUser();
          setAuthState({
            user,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: "Erro ao verificar autenticação",
        });
      }
    };

    // Aguarda um frame para garantir que a hidratação terminou
    requestAnimationFrame(checkAuth);
  }, [mounted]);

  // Função para realizar login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const user = await authService.login({ email, password });

      if (user) {
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
        return true;
      } else {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: "Credenciais inválidas",
        }));
        return false;
      }
    } catch {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: "Erro ao fazer login",
      }));
      return false;
    }
  };

  // Função para realizar registro
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const user = await authService.register({ name, email, password });

      if (user) {
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
        return true;
      } else {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: "Erro ao registrar usuário",
        }));
        return false;
      }
    } catch {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: "Erro ao registrar usuário",
      }));
      return false;
    }
  };

  // Função para realizar logout
  const logout = () => {
    authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  // Fornece o contexto para os componentes filhos
  return (
    <AuthContext.Provider
      value={{
        authState: mounted
          ? authState
          : {
              user: null,
              isAuthenticated: false,
              loading: true,
              error: null,
            },
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
