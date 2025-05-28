import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/homeScreen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isLoggedIn ? (
          <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <AppNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
