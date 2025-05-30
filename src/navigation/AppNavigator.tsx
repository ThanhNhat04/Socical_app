import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen/homeScreen";
import UserProfileScreen from "../screens/profileScreen/profileScreen";
import HeaderComponent from "../components/header";

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = ({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <HeaderComponent setIsLoggedIn={setIsLoggedIn} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={UserProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
