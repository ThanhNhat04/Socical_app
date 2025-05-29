export type Notification = {
  notification_id: string;
  to_user_id: string;
  from_user_id?: string;
  type: 'friend_request' | 'like' | 'comment' | 'share';
  post_id?: string;
  comment_id?: string;
  createdAt: Date;
  read: boolean;
};

export default Notification;