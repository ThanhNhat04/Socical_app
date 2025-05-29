import { Comment } from "./Comment";
import { Like } from "./Like";

export type Post = {
  post_id: string;
  user_id: string;
  title: string;
  images: string[];
  video: string[];
  content: string;
  createAt: Date;
  comment: Comment[];
  likes: Like[];
  visibility: 'public' | 'friends' | 'private';
};

export default Post;
