import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { Notification } from '../data/Notification';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    storage.get<Notification[]>('notifications').then(data => data && setNotifications(data));
  }, []);

  const saveNotifications = async (data: Notification[]) => {
    await storage.set('notifications', data);
    setNotifications(data);
  };

  const addNotification = async (noti: Notification) => {
    await saveNotifications([...notifications, noti]);
  };

  const updateNotification = async (id: string, update: Partial<Notification>) => {
    await saveNotifications(notifications.map(n => n.notification_id === id ? { ...n, ...update } : n));
  };

  const removeNotification = async (id: string) => {
    await saveNotifications(notifications.filter(n => n.notification_id !== id));
  };

  return { notifications, saveNotifications, addNotification, updateNotification, removeNotification };
}
