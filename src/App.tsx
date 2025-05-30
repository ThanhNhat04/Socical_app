import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { storage } from "./utils/storage";
import type { User } from "./data/user";
import { ThemeProvider } from "./context/ThemeContext"; 

const CURRENT_USER_KEY = "currentUser";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); 
  const [loading, setLoading] = useState(true);

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
    <ThemeProvider> 
      <SafeAreaProvider>
        <NavigationContainer>
          {isLoggedIn ? (
            <AppNavigator setIsLoggedIn={setIsLoggedIn} /> 
          ) : (
            <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
