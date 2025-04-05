
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import authService, { LoginCredentials, RegisterData } from "@/services/authService";
import { toast } from "@/hooks/use-toast";

// Define the shape of user object
export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  isPro: boolean;
}

// Define the shape of auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateCredits: (newCredits: number) => void;
  upgradeToPro: () => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateCredits: () => {},
  upgradeToPro: () => {},
});

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser as User);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      
      if (response.success && response.user) {
        setUser(response.user as User);
        localStorage.setItem("thynkai_token", response.token!);
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.user.name}!`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: response.message || "Invalid credentials",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      if (response.success && response.user) {
        setUser(response.user as User);
        localStorage.setItem("thynkai_token", response.token!);
        toast({
          title: "Registration successful",
          description: `Welcome to ThynkAI, ${response.user.name}!`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: response.message || "Could not create account",
        });
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("thynkai_token");
    setUser(null);
    toast({
      title: "Logout successful",
      description: "You have been logged out.",
    });
  };

  // Update user credits
  const updateCredits = (newCredits: number) => {
    if (user) {
      authService.updateUserCredits(user.id, newCredits);
      setUser({ ...user, credits: newCredits });
    }
  };

  // Upgrade user to pro
  const upgradeToPro = () => {
    if (user) {
      authService.upgradeUserToPro(user.id);
      setUser({ ...user, isPro: true });
      toast({
        title: "Upgrade successful",
        description: "Your account has been upgraded to PRO!",
      });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateCredits,
    upgradeToPro,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
