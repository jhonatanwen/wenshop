"use client";

import { useEffect, useState } from "react";

/**
 * Hook para detectar se estamos no lado do cliente
 * Resolve problemas de hidratação ao trabalhar com localStorage, sessionStorage, etc.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marca como cliente apenas após a hidratação completa
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook alternativo que também verifica se estamos no browser
 */
export function useIsBrowser() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  return isBrowser;
}

/**
 * Hook para aguardar hidratação completa
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Aguarda o próximo tick para garantir que a hidratação terminou
    const timer = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return hydrated;
}
