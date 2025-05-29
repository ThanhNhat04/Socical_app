export const notifications = [
  {
    notification_id: "n1",
    to_user_id: "u1",
    from_user_id: "u2",
    type: "like",
    post_id: "p1",
    comment_id: null,
    createdAt: new Date(),
    read: false
  },
  {
    notification_id: "n2",
    to_user_id: "u3",
    from_user_id: "u1",
    type: "comment",
    post_id: "p3",
    comment_id: "c1",
    createdAt: new Date(),
    read: true
  },
  {
    notification_id: "n3",
    to_user_id: "u2",
    from_user_id: "u4",
    type: "friend_request",
    post_id: null,
    comment_id: null,
    createdAt: new Date(),
    read: false
  },
  {
    notification_id: "n4",
    to_user_id: "u5",
    from_user_id: "u3",
    type: "share",
    post_id: "p2",
    comment_id: null,
    createdAt: new Date(),
    read: false
  },
  {
    notification_id: "n5",
    to_user_id: "u4",
    from_user_id: "u1",
    type: "like",
    post_id: "p4",
    comment_id: null,
    createdAt: new Date(),
    read: true
  }
];
