import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { getAllBooks } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";

export default function EstadoScreen() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    getAllBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [])
  );

  const groupBooksByEstado = (estado) =>
    books.filter((book) => book.estado === estado);

  const renderBookItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.author}>Autor: {item.autor}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>📖 Leyendo</Text>
        <FlatList
          data={groupBooksByEstado("leyendo")}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookItem}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>✅ Completado</Text>
        <FlatList
          data={groupBooksByEstado("completado")}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookItem}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>🕓 Por leer</Text>
        <FlatList
          data={groupBooksByEstado("por leer")}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookItem}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374B65",
    marginTop: 24,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#E6E8E6",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: "#666",
  },
  deleteButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ff4d4d",
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});