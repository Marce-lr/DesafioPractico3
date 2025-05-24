import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookListScreen from '../screens/BookListScreen';
import AddEditBookForm from '../screens/AddEditBookForm';
import { Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

const AuthenticatedTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="BookList" 
        component={BookListScreen} 
        options={{ 
          title: "Lista de Libros",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="AddBook" 
        component={AddEditBookForm} 
        options={{ 
          title: "Agregar Libro",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          )
        }} 
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedTabs;
