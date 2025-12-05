import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PriceAlert {
  id: string;
  cropId: string;
  cropName: string;
  cropNameBn: string;
  marketId: string;
  marketName: string;
  marketNameBn: string;
  alertType: 'price_increase' | 'price_decrease';
  targetPrice: number;
  isActive: boolean;
  createdAt: string;
}

interface AlertStore {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;
  updateAlert: (id: string, alert: Partial<PriceAlert>) => void;
}

export const useAlertStore = create<AlertStore>()(
  persist(
    (set) => ({
      alerts: [],
      
      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              ...alert,
              id: `alert-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      
      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      
      toggleAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
          ),
        })),
      
      updateAlert: (id, updatedAlert) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, ...updatedAlert } : alert
          ),
        })),
    }),
    {
      name: 'krishimitra-price-alerts',
    }
  )
);
