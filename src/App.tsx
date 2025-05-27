import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/auth/LoginScreen";
import HomeScreen from "./screens/homeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
