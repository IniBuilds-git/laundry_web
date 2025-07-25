import axios, { AxiosResponse } from 'axios';
import { getAuthToken, removeAuthToken, isTokenExpired } from '@/lib/auth/tokens';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://laundryroom.com.ng/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      // Only redirect if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoint functions
export const api = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) => 
      apiClient.post('/login/client', data),
    register: (data: { name: string; email: string; phone_number: string; password: string; referred_by?: string }) => 
      apiClient.post('/register/client', data),
    verifyEmail: (data: { otp_code: string; push_token?: string }) => 
      apiClient.post('/verify/email', data),
    resendOtp: (data: { email: string }) => 
      apiClient.post('/resend/email', data),
    forgotPassword: (data: { email: string }) => 
      apiClient.post('/forgot/password', data),
    resetPassword: (data: { email: string; token: string; password: string; password_confirmation: string }) => 
      apiClient.post('/reset/password', data),
    getProfile: () => 
      apiClient.get('/get/profile'),
    updateProfile: (data: { name?: string; email?: string; phone_number?: string }) => 
      apiClient.post('/edit/profile', data),
  },

  // Services endpoints
  services: {
    getAll: () => 
      apiClient.get('/get/services'),
    getProducts: () => 
      apiClient.get('/get/product'),
  },

  // Orders endpoints
  orders: {
    create: (data: any) => 
      apiClient.post('/place/order', data),
    getHistory: () => 
      apiClient.get('/get/client/history'),
    getDetails: (id: number) => 
      apiClient.get(`/get/client/history/${id}`),
    initiatePayment: (orderId: number) => 
      apiClient.post(`/client/pay/${orderId}`),
    verifyPayment: (data: { reference: string }) => 
      apiClient.post('/payment/status', data),
  },

  // Location endpoints
  location: {
    getLgaPrices: () => 
      apiClient.get('/get/lga'),
  },
};


