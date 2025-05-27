"use client";

import {
  ArrowRightIcon,
  CalendarIcon,
  CurrencyIcon,
  EmailIcon,
  HeartIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@/components/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { authState, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authState.loading && !authState.isAuthenticated) {
      router.push("/login");
    }
  }, [authState.isAuthenticated, authState.loading, router]);

  if (authState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Carregando seu perfil...
          </p>
        </div>
      </div>
    );
  }

  if (!authState.user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header moderno */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    Olá, {authState.user.name}!
                  </h1>
                  <p className="text-primary-100 mt-1">
                    Bem-vindo(a) ao seu painel pessoal
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-medium transition-all duration-200"
              >
                <ArrowRightIcon className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>

          {/* Grid principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações pessoais */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Informações Pessoais
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={authState.user.name}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <UserIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={authState.user.email}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <EmailIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Membro desde
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={new Date().toLocaleDateString("pt-BR")}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <CalendarIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  Editar Informações
                </button>
              </div>
            </div>

            {/* Sidebar com estatísticas */}
            <div className="space-y-6">
              {/* Estatísticas */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Estatísticas
                </h3>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          0
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          Total de Pedidos
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <ShoppingBagIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          R$ 0,00
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Total Gasto
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <CurrencyIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status da conta */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Status da Conta
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Conta ativa
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Email verificado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seções de ação */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBagIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    Meus Pedidos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Acompanhe seus pedidos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HeartIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    Lista de Desejos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Produtos favoritos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <SettingsIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    Configurações
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Preferências da conta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
