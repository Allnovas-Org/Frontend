import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      gcTime: 1000 * 60 * 10, // Cache for 10 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch when user returns to tab
      refetchOnReconnect: true, // Refetch when internet reconnects
    },
    mutations: {
      retry: 0, // Don't retry mutations (POST, PUT, DELETE)
    },
  },
});