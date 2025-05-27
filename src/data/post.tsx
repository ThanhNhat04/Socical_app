type Post = {
  post_id: string;
  user_id: string;
  title: string;
  images: string[];
  video: string[];
  content: string;
  createAt: Date;
  comment: Comment[];
  likes: Like[];
  share: string;
};

type Comment = {
  comment_id: string;
  user_id: string;
  content: string;
  createAt: Date;
};

type Like = {
  like_id: string;
  user_id: string;
  likes: number;
};

type Story = {
  story_id: string;
  user_id: string;
  media_url: string;
  status: boolean;
  createAt: Date;
  expires_at: Date;
};


export { Post, Comment, Like,Story };
