// src/hooks/api/useOrders.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { Order } from '@/types';
import toast from 'react-hot-toast';

// Create order mutation
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderData: any) => {
      const response = await api.orders.create(orderData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status !== false) {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        toast.success('Order placed successfully!');
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to place order';
      toast.error(message);
    },
  });
};

// Get order history
export const useOrderHistory = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.orders.getHistory();
      return response.data.order_history as Order[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get order details
export const useOrderDetails = (orderId: number) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await api.orders.getDetails(orderId);
      return response.data.order as Order;
    },
    enabled: !!orderId,
    staleTime: 30 * 1000, // 30 seconds for real-time updates
  });
};

// Initiate payment mutation
export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: async (orderId: number) => {
      const response = await api.orders.initiatePayment(orderId);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status !== false) {
        // Payment data will be handled by the component
      } else {
        toast.error(data.message || 'Failed to initiate payment');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to initiate payment';
      toast.error(message);
    },
  });
};

// Verify payment mutation
export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reference: string) => {
      const response = await api.orders.verifyPayment({ reference });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        toast.success('Payment verified successfully!');
      } else {
        toast.error(data.message || 'Payment verification failed');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Payment verification failed';
      toast.error(message);
    },
  });
};