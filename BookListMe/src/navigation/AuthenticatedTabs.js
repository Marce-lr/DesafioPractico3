import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookListScreen from "../screens/BookListScreen";
import AddBookScreen from "../screens/AddBookScreen";
import EstadoScreen from "../screens/EstadoScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/Authcontext";

const Tab = createBottomTabNavigator();

export default function AuthenticatedTabs() {
  const { logout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Lista") {
            iconName = "list";
          } else if (route.name === "Agregar") {
            iconName = "add-circle";
          } else if (route.name === "Estado") {
            iconName = "reader";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#374B65",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#ddd",
          borderTopColor: "#374B65",
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: "#ddd",
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: "#374B65",
      })}
    >
      <Tab.Screen
        name="Lista"
        component={BookListScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={logout}
              style={{ marginRight: 15 }}
              accessibilityLabel="Cerrar sesión"
            >
              <Icon name="log-out-outline" size={26} color="#374B65" />
            </TouchableOpacity>
          ),
          headerTitle: "📚 Mis Libros",
          headerTitleStyle: { fontWeight: "bold", fontSize: 22, color: "#333" },
        }}
      />
      <Tab.Screen
        name="Agregar"
        component={AddBookScreen}
        options={{
          headerTitle: "➕ Agregar Libro",
          headerTitleStyle: { fontWeight: "bold", fontSize: 22, color: "#333" },
        }}
      />
      <Tab.Screen
        name="Estado"
        component={EstadoScreen}
        options={{
          headerTitle: "📖 Libros por Estado",
          headerTitleStyle: { fontWeight: "bold", fontSize: 22, color: "#333" },
        }}
      />
    </Tab.Navigator>
  );
}
