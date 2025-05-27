import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
            {/* <Stack.Screen name =   */}
        </Stack.Navigator>
    )
}

export default AuthNavigator;
