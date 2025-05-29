export type FriendRequest = {
  request_id: string;
  from_user_id: string;
  to_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
};

export default FriendRequest;