import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'super_admin' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  aadhaar?: string;
  dob?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'super_admin' | 'admin') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'superadmin',
    name: 'Super Administrator',
    role: 'super_admin',
    status: 'approved'
  },
  {
    id: '2',
    username: 'admin1',
    name: 'John Smith',
    role: 'admin',
    status: 'approved',
    aadhaar: '1234-5678-9012',
    dob: '1985-06-15',
    approvedBy: 'Super Administrator',
    approvedAt: '2024-01-15'
  },
  {
    id: '3',
    username: 'admin2',
    name: 'Sarah Johnson',
    role: 'admin',
    status: 'pending',
    aadhaar: '9876-5432-1098',
    dob: '1990-03-22'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('civicvoice_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, role: 'super_admin' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication logic
    const foundUser = mockUsers.find(u => 
      u.username === username && 
      u.role === role &&
      (role === 'super_admin' || u.status === 'approved')
    );

    if (foundUser && (
      (username === 'superadmin' && password === 'admin123') ||
      (username === 'admin1' && password === 'admin123')
    )) {
      setUser(foundUser);
      localStorage.setItem('civicvoice_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civicvoice_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};