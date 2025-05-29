import { useEffect, useState } from "react";
import { storage } from "../utils/storage";
import { UserComment } from "../data/Comment";
import uuid from "react-native-uuid";

const COMMENTS_KEY = "comments"; // lưu toàn bộ bình luận theo postId

export function useComments(postId: string) {
  const [comments, setComments] = useState<UserComment[]>([]);

  // Load comment ban đầu
  useEffect(() => {
    const loadComments = async () => {
      const allComments = (await storage.get<{ [key: string]: UserComment[] }>(COMMENTS_KEY)) || {};
      setComments(allComments[postId] || []);
    };
    loadComments();
  }, [postId]);

  // Thêm bình luận mới
  const addComment = async (userId: string, content: string) => {
    const newComment: UserComment = {
      comment_id: uuid.v4().toString(),
      user_id: userId,
      content,
      createAt: new Date(),
    };

    const allComments = (await storage.get<{ [key: string]: UserComment[] }>(COMMENTS_KEY)) || {};
    const updatedComments = [...(allComments[postId] || []), newComment];
    allComments[postId] = updatedComments;

    await storage.set(COMMENTS_KEY, allComments);
    setComments(updatedComments);
  };

  // Sửa bình luận
  const editComment = async (commentId: string, newContent: string) => {
    const allComments = (await storage.get<{ [key: string]: UserComment[] }>(COMMENTS_KEY)) || {};
    const updatedComments = (allComments[postId] || []).map((c) =>
      c.comment_id === commentId ? { ...c, content: newContent } : c
    );
    allComments[postId] = updatedComments;

    await storage.set(COMMENTS_KEY, allComments);
    setComments(updatedComments);
  };

  // Xoá bình luận
  const deleteComment = async (commentId: string) => {
    const allComments = (await storage.get<{ [key: string]: UserComment[] }>(COMMENTS_KEY)) || {};
    const updatedComments = (allComments[postId] || []).filter((c) => c.comment_id !== commentId);
    allComments[postId] = updatedComments;

    await storage.set(COMMENTS_KEY, allComments);
    setComments(updatedComments);
  };

  return { comments, addComment, editComment, deleteComment };
}
