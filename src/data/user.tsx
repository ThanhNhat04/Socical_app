export type User = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
  bio?: string;
  createdAt: Date;
  friends: string[];
};

export default User;