import { useEffect, useState } from "react";
import { storage } from "../utils/storage";
import type { Post } from "../data/Post";
import { UserComment } from "../data/Comment";
import { Like } from "../data/Like";

const POSTS_KEY = "posts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Tách riêng hàm này để tái sử dụng trong refetch
  const fetchPosts = async () => {
    const storedPosts = await storage.get<Post[]>(POSTS_KEY);
    if (storedPosts) setPosts(storedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const savePosts = async (data: Post[]) => {
    await storage.set(POSTS_KEY, data);
    setPosts(data);
  };

  const addPost = async (post: Post) => {
    setPosts((prev) => {
      const updated = [post, ...prev];
      storage.set("posts", updated);
      return updated;
    });
  };

  const updatePost = async (post_id: string, updatedFields: Partial<Post>) => {
    const updated = posts.map((p) =>
      p.post_id === post_id ? { ...p, ...updatedFields } : p
    );
    await savePosts(updated);
  };

  const removePost = async (post_id: string) => {
    const updated = posts.filter((p) => p.post_id !== post_id);
    await savePosts(updated);
  };

  const addCommentToPost = async (post_id: string, comment: UserComment) => {
    const updated = posts.map((p) =>
      p.post_id === post_id
        ? { ...p, userComment: [...p.userComment, comment] }
        : p
    );
    await savePosts(updated);
  };

  const addLikeToPost = async (post_id: string, like: Like) => {
    const updated = posts.map((p) =>
      p.post_id === post_id
        ? { ...p, likes: [...p.likes, like] }
        : p
    );
    await savePosts(updated);
  };

  return {
    posts,
    savePosts,
    addPost,
    updatePost,
    removePost,
    addCommentToPost,
    addLikeToPost,
    refetch: fetchPosts, 
  };
}












// export function usePosts() {
//   const [posts, setPosts] = useState<Post[]>([]);

//   // Load dữ liệu từ localStorage khi khởi động
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const storedPosts = await storage.get<Post[]>(POSTS_KEY);
//       if (storedPosts) setPosts(storedPosts);
//     };
//     fetchPosts();
//   }, []);

//   // Lưu toàn bộ vào localStorage
//   const savePosts = async (data: Post[]) => {
//     await storage.set(POSTS_KEY, data);
//     setPosts(data);
//   };


// const addPost = async (post: Post) => {
//   setPosts((prev) => {
//     const updated = [post, ...prev]; // bài mới lên đầu
//     storage.set("posts", updated);
//     return updated;
//   });
// };

//   // Cập nhật nội dung bài viết
//   const updatePost = async (post_id: string, updatedFields: Partial<Post>) => {
//     const updated = posts.map((p) =>
//       p.post_id === post_id ? { ...p, ...updatedFields } : p
//     );
//     await savePosts(updated);
//   };

//   // Xoá bài viết
//   const removePost = async (post_id: string) => {
//     const updated = posts.filter((p) => p.post_id !== post_id);
//     await savePosts(updated);
//   };

//   // Thêm 1 bình luận vào userComment (có thể dùng nếu muốn thao tác từ hook này)
//   const addCommentToPost = async (post_id: string, comment: UserComment) => {
//     const updated = posts.map((p) =>
//       p.post_id === post_id
//         ? { ...p, userComment: [...p.userComment, comment] }
//         : p
//     );
//     await savePosts(updated);
//   };

//   // Thêm like vào bài viết
//   const addLikeToPost = async (post_id: string, like: Like) => {
//     const updated = posts.map((p) =>
//       p.post_id === post_id
//         ? { ...p, likes: [...p.likes, like] }
//         : p
//     );
//     await savePosts(updated);
//   };

//   return {
//     posts,
//     savePosts,
//     addPost,
//     updatePost,
//     removePost,
//     addCommentToPost,
//     addLikeToPost,
//   };
// }
