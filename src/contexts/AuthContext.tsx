
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type SubscriptionTier = 'free' | 'pro' | 'team';

type User = {
  id: string;
  email: string;
  name: string;
  points: number;
  projectsGenerated: number;
  subscriptionTier: SubscriptionTier;
  subscriptionActive: boolean;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserPoints: (newPoints: number) => void;
  incrementProjectCount: () => void;
  checkRemainingGenerations: () => { canGenerate: boolean, remaining: number };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only - in a real app, this would be a backend call
      if (email && password) {
        const user = {
          id: "user-123",
          email,
          name: email.split('@')[0],
          points: 3,
          projectsGenerated: 0,
          subscriptionTier: 'free' as SubscriptionTier,
          subscriptionActive: true
        };
        
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Successfully logged in!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only - in a real app, this would be a backend call
      if (email && name && password) {
        const user = {
          id: "user-" + Date.now(),
          email,
          name,
          points: 3,
          projectsGenerated: 0,
          subscriptionTier: 'free' as SubscriptionTier,
          subscriptionActive: true
        };
        
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Account created successfully!");
      } else {
        throw new Error("Invalid information");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const updateUserPoints = (newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, points: newPoints };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const incrementProjectCount = () => {
    if (user) {
      const updatedUser = { 
        ...user, 
        projectsGenerated: user.projectsGenerated + 1,
        points: user.subscriptionTier === 'free' ? user.points - 1 : user.points
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const checkRemainingGenerations = () => {
    if (!user) {
      return { canGenerate: false, remaining: 0 };
    }

    if (user.subscriptionTier === 'free') {
      return { 
        canGenerate: user.points > 0, 
        remaining: user.points 
      };
    }
    
    // Pro or team users have unlimited generations
    return { canGenerate: true, remaining: Infinity };
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    updateUserPoints,
    incrementProjectCount,
    checkRemainingGenerations
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
