import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, institutionCode: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@edumindcare.com',
    role: 'admin',
    institutionCode: 'EDU001',
    name: 'Admin User',
  },
  {
    id: 'counselor-1',
    username: 'counselor1',
    email: 'sarah.j@edumindcare.com',
    role: 'counselor',
    institutionCode: 'EDU001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cognitive Behavioral Therapy'
  },
   {
    id: 'counselor-2',
    username: 'counselor2',
    email: 'michael.c@edumindcare.com',
    role: 'counselor',
    institutionCode: 'EDU001',
    name: 'Dr. Michael Chen',
    specialization: 'Stress Management'
  },
  {
    id: '3',
    username: 'student1',
    email: 'student1@edumindcare.com',
    role: 'student',
    institutionCode: 'EDU001',
    name: 'John Doe',
    usn: 'CS001',
    section: 'A',
    profile: {
      internalMarks: { Math: 85, Physics: 78, Chemistry: 92 },
      quizMarks: { Math: 88, Physics: 82, Chemistry: 90 },
      attendance: { Math: 95, Physics: 88, Chemistry: 92 },
      stressLevel: 6,
      moodHistory: [],
      counselingSessions: []
    }
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('edumindcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, institutionCode: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => 
      u.username === username && u.institutionCode === institutionCode
    );
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('edumindcare_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edumindcare_user');
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
