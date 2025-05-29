import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { Comment } from '../data/Comment';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    storage.get<Comment[]>('comments').then(data => data && setComments(data));
  }, []);

  const saveComments = async (data: Comment[]) => {
    await storage.set('comments', data);
    setComments(data);
  };

  const addComment = async (comment: Comment) => {
    await saveComments([...comments, comment]);
  };

  const updateComment = async (id: string, update: Partial<Comment>) => {
    await saveComments(comments.map(c => c.comment_id === id ? { ...c, ...update } : c));
  };

  const removeComment = async (id: string) => {
    await saveComments(comments.filter(c => c.comment_id !== id));
  };

  return { comments, saveComments, addComment, updateComment, removeComment };
}
