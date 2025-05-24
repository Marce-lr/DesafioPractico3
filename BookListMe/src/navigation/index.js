import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BookListScreen from "../screens/BookListScreen";
import { AuthContext } from "../contexts/Authcontext";

const Stack = createStackNavigator();

export default function Navigation() {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          // Si no hay token, mostrar login y registro
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Si está autenticado, mostrar la lista de libros
          <Stack.Screen
            name="BookList"
            component={BookListScreen}
            options={{ title: "Mis Libros" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
