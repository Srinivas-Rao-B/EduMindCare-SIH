import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SOSAlert } from '../types';

interface AlertContextType {
  alerts: SOSAlert[];
  addAlert: (alert: Omit<SOSAlert, 'id' | 'timestamp' | 'status'>) => void;
  acknowledgeAlert: (alertId: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<SOSAlert[]>([]);

  const addAlert = (alert: Omit<SOSAlert, 'id' | 'timestamp' | 'status'>) => {
    const newAlert: SOSAlert = {
      ...alert,
      id: `SOS-${Date.now()}`,
      timestamp: new Date(),
      status: 'new',
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
      )
    );
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, acknowledgeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
