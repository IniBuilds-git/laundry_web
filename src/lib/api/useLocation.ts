// src/hooks/api/useLocation.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';

export const useLgaPrices = () => {
  return useQuery({
    queryKey: ['lga-prices'],
    queryFn: async () => {
      const response = await api.location.getLgaPrices();
      return response.data.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour - prices don't change often
  });
};