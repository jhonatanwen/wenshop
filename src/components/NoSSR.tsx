"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

interface NoSSRProps {
  children: ReactNode;
}

function NoSSRComponent({ children }: NoSSRProps) {
  return <>{children}</>;
}

export const NoSSR = dynamic(() => Promise.resolve(NoSSRComponent), {
  ssr: false,
});
