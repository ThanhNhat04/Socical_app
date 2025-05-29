import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { Like } from '../data/Like';

export function useLikes() {
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    storage.get<Like[]>('likes').then(data => data && setLikes(data));
  }, []);

  const saveLikes = async (data: Like[]) => {
    await storage.set('likes', data);
    setLikes(data);
  };

  const addLike = async (like: Like) => {
    await saveLikes([...likes, like]);
  };

  const updateLike = async (id: string, update: Partial<Like>) => {
    await saveLikes(likes.map(l => l.like_id === id ? { ...l, ...update } : l));
  };

  const removeLike = async (id: string) => {
    await saveLikes(likes.filter(l => l.like_id !== id));
  };

  return { likes, saveLikes, addLike, updateLike, removeLike };
}
