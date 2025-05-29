export const users = [
  {
    user_id: "u1",
    name: "Alice",
    email: "alice@example.com",
    password_hash: "hashed_pw1",
    avatar_url: "https://example.com/avatars/alice.jpg",
    bio: "I love nature and photography.",
    createdAt: new Date("2024-01-01"),
    friends: ["u2", "u3"]
  },
  {
    user_id: "u2",
    name: "Bob",
    email: "bob@example.com",
    password_hash: "hashed_pw2",
    avatar_url: "https://example.com/avatars/bob.jpg",
    bio: "Tech enthusiast.",
    createdAt: new Date("2024-01-02"),
    friends: ["u1"]
  },
  {
    user_id: "u3",
    name: "Charlie",
    email: "charlie@example.com",
    password_hash: "hashed_pw3",
    avatar_url: "https://example.com/avatars/charlie.jpg",
    bio: "Loves to code.",
    createdAt: new Date("2024-01-03"),
    friends: ["u1"]
  },
  {
    user_id: "u4",
    name: "Diana",
    email: "diana@example.com",
    password_hash: "hashed_pw4",
    avatar_url: "https://example.com/avatars/diana.jpg",
    bio: "Musician and artist.",
    createdAt: new Date("2024-01-04"),
    friends: []
  },
  {
    user_id: "u5",
    name: "Ethan",
    email: "ethan@example.com",
    password_hash: "hashed_pw5",
    avatar_url: "https://example.com/avatars/ethan.jpg",
    bio: "Startup founder.",
    createdAt: new Date("2024-01-05"),
    friends: []
  }
];
