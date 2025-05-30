import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { User } from '../data/user';

const CURRENT_USER_KEY = 'currentUser';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    storage.get<User[]>('users').then(data => data && setUsers(data));
    storage.get<User>(CURRENT_USER_KEY).then(user => setCurrentUser(user || null));
  }, []);

  const saveUsers = async (data: User[]) => {
    await storage.set('users', data);
    setUsers(data);
  };

  const addUser = async (user: User) => {
    await saveUsers([...users, user]);
  };

  const updateUser = async (id: string, update: Partial<User>) => {
    const updatedUsers = users.map(u => u.user_id === id ? { ...u, ...update } : u);
    await saveUsers(updatedUsers);
    if (currentUser?.user_id === id) {
      const updatedCurrent = { ...currentUser, ...update };
      await storage.set('currentUser', updatedCurrent);
      setCurrentUser(updatedCurrent);
    }
  };

  const removeUser = async (id: string) => {
    await saveUsers(users.filter(u => u.user_id !== id));
  };

  return { users, currentUser, saveUsers, addUser, updateUser, removeUser };
}
