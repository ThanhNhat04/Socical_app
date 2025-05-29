import { useState, useEffect } from "react";
import { storage } from "../utils/storage";
import type { User } from "../data/User";
import uuid from "react-native-uuid";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load người dùng hiện tại khi app khởi động
  useEffect(() => {
    storage.get<User>(CURRENT_USER_KEY).then((user) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  // Đăng ký
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<string | null> => {
    const users = (await storage.get<User[]>(USERS_KEY)) || [];
    if (users.find((u) => u.email === email)) {
      return "Email đã tồn tại.";
    }

    const newUser: User = {
      user_id: uuid.v4().toString(),
      name,
      email,
      password, 
      avatar_url: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
      bio: "",
      createdAt: new Date(),
      friends: [],
    };

    const updatedUsers = [...users, newUser];
    await storage.set(USERS_KEY, updatedUsers);
    await storage.set(CURRENT_USER_KEY, newUser);
    setCurrentUser(newUser);
    return null;
  };

  // Đăng nhập
  const login = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    const users = (await storage.get<User[]>(USERS_KEY)) || [];
    const user = users.find(
  (u) =>
    u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
    u.password === password
);

    if (!user) return "Email hoặc mật khẩu không đúng.";

    await storage.set(CURRENT_USER_KEY, user);
    setCurrentUser(user);
    return null;
  };

  // Đăng xuất
  const logout = async () => {
    await storage.remove(CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  return {
    currentUser,
    isLoggedIn: !!currentUser,
    register,
    login,
    logout,
  };
}



// USERS_KEY = "users"	Lưu tất cả người dùng đã đăng ký (mảng User[])
// CURRENT_USER_KEY = "currentUser"	Lưu duy nhất người đang đăng nhập tại thời điểm hiện tại (User)