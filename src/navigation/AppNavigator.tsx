import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import UserProfileScreen from "../screens/profileScreen";
import HeaderComponent from "../components/header";

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (
          <HeaderComponent
            // appName="AI ROBOTIC"/
            // onNotificationPress={() => console.log("Thông báo được nhấn")}
            // onAvatarPress={() => console.log("Avatar được nhấn")}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
