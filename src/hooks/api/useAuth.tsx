// src/hooks/useAuth.tsx
"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import {
  getAuthToken,
  removeAuthToken,
  isTokenExpired,
} from "@/lib/auth/tokens";
import { api } from "@/lib/api/client";
import { User } from "@/types";
import toast from "react-hot-toast";

// Types
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  referred_by?: string;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Zustand store
  const {
    user,
    isAuthenticated,
    isLoading,
    login: storeLogin,
    logout: storeLogout,
    updateUser: storeUpdateUser,
    setLoading,
  } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setLoading(true);

    try {
      const token = getAuthToken();

      if (!token) {
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        handleLogout();
        return;
      }

      // Verify token with server and get user data
      await refreshUser();
    } catch (error) {
      console.error("Auth initialization failed:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await api.auth.login({ email, password });
      const data = response.data;

      if (data.status) {
        storeLogin(data.user, data.token);

        // Set user data in React Query cache
        queryClient.setQueryData(["profile"], data.user);

        toast.success("Login successful!");
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await api.auth.register(userData);
      const data = response.data;

      if (data.status) {
        // Store partial user data for verification step
        storeUpdateUser({
          email: userData.email,
          name: userData.name,
          phone_number: userData.phone_number,
          id: 0,
          referral_code: "",
        });

        toast.success("Registration successful! Please verify your email.");
        return true;
      } else {
        toast.error(data.message || "Registration failed");
        return false;
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    storeLogout();
    queryClient.clear();
    router.push("/login");
    toast.success("Logged out successfully");
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await api.auth.getProfile();
      const userData = response.data.user;

      storeUpdateUser(userData);
      queryClient.setQueryData(["profile"], userData);
    } catch (error: any) {
      console.error("Failed to refresh user data:", error);

      // If token is invalid, logout
      if (error.response?.status === 401) {
        handleLogout();
      }
      throw error;
    }
  };

  const handleUpdateUser = (userData: Partial<User>) => {
    storeUpdateUser(userData);

    // Update React Query cache
    queryClient.setQueryData(["profile"], (oldData: User | undefined) => {
      return oldData ? { ...oldData, ...userData } : undefined;
    });
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser,
    updateUser: handleUpdateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    Component.displayName || Component.name
  })`;

  return AuthenticatedComponent;
};

// Higher-order component for guest-only routes
export const withGuest = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const GuestComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        router.push("/dashboard");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }

    if (isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  GuestComponent.displayName = `withGuest(${
    Component.displayName || Component.name
  })`;

  return GuestComponent;
};

// Hook for checking specific permissions
export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();

  return {
    canAccessDashboard: isAuthenticated,
    canPlaceOrder: isAuthenticated && user?.email,
    canViewHistory: isAuthenticated,
    canEditProfile: isAuthenticated,
    isVerified: isAuthenticated && user?.email, 
  };
};

// Hook for authentication status checks
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    isGuest: !isAuthenticated && !isLoading,
    hasProfile: isAuthenticated && !!user,
    userEmail: user?.email,
    userName: user?.name,
    userPhone: user?.phone_number,
    referralCode: user?.referral_code,
  };
};

// Hook for auth-related navigation
export const useAuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const redirectToLogin = (returnUrl?: string) => {
    const url = returnUrl
      ? `/login?redirect=${encodeURIComponent(returnUrl)}`
      : "/login";
    router.push(url);
  };

  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  const redirectAfterAuth = (defaultPath = "/dashboard") => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get("redirect") || defaultPath;
      router.push(redirectUrl);
    } else {
      router.push(defaultPath);
    }
  };

  return {
    redirectToLogin,
    redirectToDashboard,
    redirectAfterAuth,
    isAuthenticated,
  };
};

// Utility hook for form authentication
export const useAuthForms = () => {
  const { login, register, isLoading } = useAuth();
  const { redirectAfterAuth } = useAuthNavigation();

  const handleLoginSubmit = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      redirectAfterAuth();
    }
    return success;
  };

  const handleRegisterSubmit = async (userData: RegisterData) => {
    const success = await register(userData);
    if (success) {
      // Usually redirect to email verification
      return { success: true, nextStep: "verify-email" };
    }
    return { success: false, nextStep: null };
  };

  return {
    handleLoginSubmit,
    handleRegisterSubmit,
    isLoading,
  };
};

// Default export
export default useAuth;
