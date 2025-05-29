import { useEffect, useState } from "react";
import { storage } from "../utils/storage";
import type { Post } from "../data/Post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load khi khởi động
  useEffect(() => {
    storage.get<Post[]>("posts").then((data) => data && setPosts(data));
  }, []);

  // Lưu lại toàn bộ
  const savePosts = async (data: Post[]) => {
    await storage.set("posts", data);
    setPosts(data);
  };

  // Thêm bài viết
  const addPost = async (post: Post) => {
    setPosts((prev) => {
      const updated = [...prev, post];
      storage.set("posts", updated); // lưu lại
      return updated;
    });
  };

  // Cập nhật bài viết
  const updatePost = async (post_id: string, updatedFields: Partial<Post>) => {
    const updated = posts.map((p) =>
      p.post_id === post_id ? { ...p, ...updatedFields } : p
    );
    await savePosts(updated);
  };

  // Xóa bài viết
  const removePost = async (post_id: string) => {
    const updated = posts.filter((p) => p.post_id !== post_id);
    await savePosts(updated);
  };

  return { posts, savePosts, addPost, updatePost, removePost };
}
