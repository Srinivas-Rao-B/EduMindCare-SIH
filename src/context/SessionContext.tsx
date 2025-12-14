import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessage } from '../types';

interface ActiveSession {
  sessionId: string;
  studentId: string;
  counselorId: string;
  messages: ChatMessage[];
}

interface SessionContextType {
  activeSession: ActiveSession | null;
  startCounselorSession: (sessionId: string, studentId: string, counselorId: string) => void;
  endSession: () => void;
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);

  const startCounselorSession = (sessionId: string, studentId: string, counselorId: string) => {
    setActiveSession({
      sessionId,
      studentId,
      counselorId,
      messages: [
        {
          id: Date.now().toString(),
          sender: 'counselor',
          text: "Hello! I'm here for our session. How are you feeling today?",
          timestamp: new Date(),
        }
      ],
    });
  };

  const endSession = () => {
    setActiveSession(null);
  };

  const sendMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    if (!activeSession) return;

    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setActiveSession(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : null);
  };

  return (
    <SessionContext.Provider value={{ activeSession, startCounselorSession, endSession, sendMessage }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
