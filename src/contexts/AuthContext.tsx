import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Define user types
export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock users for demo
const MOCK_USERS = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@cineniche.com',
    password: 'password',
    role: 'customer' as UserRole,
    avatar: 'https://i.pravatar.cc/150?u=demo',
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@cineniche.com',
    password: 'admin',
    role: 'admin' as UserRole,
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('cinenicheUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('cinenicheUser');
      }
    }
  }, []);

  // Login logic
  const login = async (email: string, password: string) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const matchedUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('cinenicheUser', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${userWithoutPassword.username}!`);
    } else {
      toast.error('Invalid email or password');
      throw new Error('Invalid email or password');
    }
  };

  // Register logic
  const register = async (username: string, email: string, password: string) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error('Email already in use');
      throw new Error('Email already in use');
    }
    
    // Create new user (in a real app, this would be API call)
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      role: 'customer' as UserRole,
      avatar: `https://i.pravatar.cc/150?u=${username}`,
    };
    
    setUser(newUser);
    localStorage.setItem('cinenicheUser', JSON.stringify(newUser));
    toast.success('Account created successfully!');
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cinenicheUser');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
