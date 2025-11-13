import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

export type RootStackParamList = {
  Login: undefined;
  Profile: { user: any };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          cardStyle: { overflow: "visible" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Iniciar Sesión" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Perfil de Usuario" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
