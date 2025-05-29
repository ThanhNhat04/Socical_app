import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { FriendRequest } from '../data/FriendRequest';

export function useFriendRequests() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    storage.get<FriendRequest[]>('friendRequests').then(data => data && setRequests(data));
  }, []);

  const saveRequests = async (data: FriendRequest[]) => {
    await storage.set('friendRequests', data);
    setRequests(data);
  };

  const addRequest = async (request: FriendRequest) => {
    await saveRequests([...requests, request]);
  };

  const updateRequest = async (id: string, update: Partial<FriendRequest>) => {
    await saveRequests(requests.map(r => r.request_id === id ? { ...r, ...update } : r));
  };

  const removeRequest = async (id: string) => {
    await saveRequests(requests.filter(r => r.request_id !== id));
  };

  return { requests, saveRequests, addRequest, updateRequest, removeRequest };
}
