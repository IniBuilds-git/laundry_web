import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { Service, Product } from '@/types';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.services.getAll();
      return response.data.data as Service[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.services.getProducts();
      return response.data.data as Product[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get service by ID
export const useService = (serviceId: number) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const response = await api.services.getAll();
      const services = response.data.data as Service[];
      return services.find(service => service.id === serviceId);
    },
    enabled: !!serviceId,
    staleTime: 10 * 60 * 1000,
  });
};