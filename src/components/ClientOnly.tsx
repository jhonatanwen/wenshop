"use client";

import { useIsClient } from "@/hooks/useIsClient";
import { ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Componente que renderiza seus filhos apenas no lado do cliente
 * Útil para prevenir erros de hidratação
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default ClientOnly;
