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

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAuth = () => {
      try {
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

    requestAnimationFrame(checkAuth);
  }, [mounted]);

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

  const logout = () => {
    authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

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
