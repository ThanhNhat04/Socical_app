import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { Story } from '../data/Story';

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    storage.get<Story[]>('stories').then(data => data && setStories(data));
  }, []);

  const saveStories = async (data: Story[]) => {
    await storage.set('stories', data);
    setStories(data);
  };

  const addStory = async (story: Story) => {
    await saveStories([...stories, story]);
  };

  const updateStory = async (id: string, update: Partial<Story>) => {
    await saveStories(stories.map(s => s.story_id === id ? { ...s, ...update } : s));
  };

  const removeStory = async (id: string) => {
    await saveStories(stories.filter(s => s.story_id !== id));
  };

  return { stories, saveStories, addStory, updateStory, removeStory };
}
