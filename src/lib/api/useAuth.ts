// src/hooks/api/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { useAuthStore } from '@/store/auth';
import { 
  LoginFormData, 
  RegisterFormData, 
  ForgotPasswordFormData,
  ResetPasswordFormData,
  VerifyEmailFormData,
  UpdateProfileFormData 
} from '@/lib/validations/auth';
import { User } from '@/types';
import toast from 'react-hot-toast';

// Login mutation
export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.auth.login(data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        login(data.user, data.token);
        queryClient.setQueryData(['profile'], data.user);
        toast.success('Login successful!');
      } else {
        toast.error(data.message || 'Login failed');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    },
  });
};

// Register mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const { confirmPassword, agreeToTerms, ...registerData } = data;
      const response = await api.auth.register(registerData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success('Registration successful! Please verify your email.');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
    },
  });
};

// Email verification mutation
export const useVerifyEmail = () => {
  const login = useAuthStore((state) => state.login);
  
  return useMutation({
    mutationFn: async (data: VerifyEmailFormData) => {
      const response = await api.auth.verifyEmail(data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success('Email verified successfully!');
        // Note: The API should return user and token on successful verification
        if (data.user && data.token) {
          login(data.user, data.token);
        }
      } else {
        toast.error(data.message || 'Verification failed');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Verification failed. Please try again.';
      toast.error(message);
    },
  });
};

// Resend OTP mutation
export const useResendOtp = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await api.auth.resendOtp({ email });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success('Verification code sent!');
      } else {
        toast.error(data.message || 'Failed to send verification code');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to send verification code';
      toast.error(message);
    },
  });
};

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordFormData) => {
      const response = await api.auth.forgotPassword(data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success('Password reset instructions sent to your email!');
      } else {
        toast.error(data.message || 'Failed to send reset instructions');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to send reset instructions';
      toast.error(message);
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email, ...data }: ResetPasswordFormData & { email: string }) => {
      const response = await api.auth.resetPassword({
        email,
        token: data.token,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success('Password reset successful! Please login with your new password.');
      } else {
        toast.error(data.message || 'Password reset failed');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Password reset failed';
      toast.error(message);
    },
  });
};

// Get profile query
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.auth.getProfile();
      return response.data.user as User;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const updateUser = useAuthStore((state) => state.updateUser);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateProfileFormData) => {
      const response = await api.auth.updateProfile(data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        updateUser(data.user);
        queryClient.setQueryData(['profile'], data.user);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data.message || 'Profile update failed');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
    },
  });
};

// Logout function
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  
  return () => {
    logout();
    queryClient.clear();
    toast.success('Logged out successfully');
  };
};
