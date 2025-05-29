import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { storage } from "./utils/storage";
import type { User } from "./data/User";

const CURRENT_USER_KEY = "currentUser";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); 
  const [loading, setLoading] = useState(true);

  // Kiểm tra AsyncStorage khi app khởi động
  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await storage.get<User>(CURRENT_USER_KEY);
      setIsLoggedIn(!!user);
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (loading) return null; 

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <AppNavigator />
        ) : (
          <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
