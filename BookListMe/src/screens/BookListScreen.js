import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../contexts/Authcontext";
import { getAllBooks } from "../api/api";

export default function BookListScreen() {
  const { logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Libros</Text>
        <Button title="Cerrar sesión" onPress={logout} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {books.map((book) => (
          <View key={book._id} style={styles.card}>
            <Text style={styles.cardTitle}>{book.title}</Text>
            <Text style={styles.cardAuthor}>{book.author}</Text>
            <Text style={styles.cardStatus}>Estado: {book.status}</Text>
            {book.comment && (
              <Text style={styles.cardComment}>💬 {book.comment}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  scrollContainer: { paddingBottom: 100 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  cardAuthor: { fontSize: 14, color: "#555" },
  cardStatus: { marginTop: 10, fontWeight: "600" },
  cardComment: { marginTop: 5, fontStyle: "italic", color: "#333" },
});
