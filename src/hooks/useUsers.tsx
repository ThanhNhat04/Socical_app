import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { User } from '../data/User';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    storage.get<User[]>('users').then(data => data && setUsers(data));
  }, []);

  const saveUsers = async (data: User[]) => {
    await storage.set('users', data);
    setUsers(data);
  };

  const addUser = async (user: User) => {
    await saveUsers([...users, user]);
  };

  const updateUser = async (id: string, update: Partial<User>) => {
    await saveUsers(users.map(u => u.user_id === id ? { ...u, ...update } : u));
  };

  const removeUser = async (id: string) => {
    await saveUsers(users.filter(u => u.user_id !== id));
  };

  return { users, saveUsers, addUser, updateUser, removeUser };
}
