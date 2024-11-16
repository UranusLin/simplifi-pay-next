import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Notification {
    id: string
    title: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    timestamp: string
    read: boolean
    paymentId?: string
}

interface NotificationStore {
    notifications: Notification[]
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
    markAsRead: (id: string) => void
    clearNotifications: () => void
}

export const useNotificationStore = create<NotificationStore>()(
    persist(
        (set) => ({
            notifications: [],
            addNotification: (notification) =>
                set((state) => ({
                    notifications: [
                        {
                            ...notification,
                            id: `notification_${Date.now()}`,
                            timestamp: new Date().toISOString(),
                            read: false,
                        },
                        ...state.notifications,
                    ],
                })),
            markAsRead: (id) =>
                set((state) => ({
                    notifications: state.notifications.map((notification) =>
                        notification.id === id ? { ...notification, read: true } : notification
                    ),
                })),
            clearNotifications: () => set({ notifications: [] }),
        }),
        {
            name: 'notification-storage',
        }
    )
)