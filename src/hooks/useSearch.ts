"use client";

import { productService } from "@/services/api";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

interface SearchState {
  query: string;
  results: Product[];
  loading: boolean;
  hasSearched: boolean;
}

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    loading: false,
    hasSearched: false,
  });

  const router = useRouter();
  const debouncedQuery = useDebounce(state.query, 300);

  const setQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, query }));
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setState((prev) => ({
        ...prev,
        results: [],
        loading: false,
        hasSearched: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const allProducts = await productService.getAll();
      const searchLower = searchQuery.toLowerCase();

      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );

      setState((prev) => ({
        ...prev,
        results,
        loading: false,
        hasSearched: true,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        results: [],
        loading: false,
        hasSearched: true,
      }));
    }
  }, []);

  const navigateToProducts = useCallback(
    (query?: string) => {
      const searchParams = new URLSearchParams();
      if (query?.trim()) {
        searchParams.set("search", query.trim());
      }

      const url = `/products${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;
      router.push(url);
    },
    [router]
  );

  const clearSearch = useCallback(() => {
    setState({
      query: "",
      results: [],
      loading: false,
      hasSearched: false,
    });
  }, []);

  useEffect(() => {
    if (debouncedQuery !== state.query) return;
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch, state.query]);

  return {
    query: state.query,
    results: state.results,
    loading: state.loading,
    hasSearched: state.hasSearched,
    setQuery,
    navigateToProducts,
    clearSearch,
  };
}
