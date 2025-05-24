import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import { AuthContext } from "../contexts/Authcontext";
import { getAllBooks, getBookById, deleteBook } from "../api/api";
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from "@react-navigation/native";

export default function BookListScreen() {
  const { logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const fetchBooks = () => {
    getAllBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.refresh) {
        fetchBooks();
        route.params.refresh = false;
      }
    }, [route])
  );

  const handleSelectBook = (id) => {
    getBookById(id)
      .then((res) => {
        setSelectedBook(res.data);
        setModalVisible(true);
      })
      .catch((err) => console.error("Error al obtener detalles:", err));
  };

  const handleDeleteBook = () => {
    Alert.alert(
      "Eliminar libro",
      "¿Estás seguro de que deseas eliminar este libro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteBook(selectedBook.id);
              Alert.alert("Éxito", "Libro eliminado correctamente");
              setModalVisible(false);
              fetchBooks();
            } catch (error) {
              console.error(
                "Error al eliminar libro:",
                error.response?.data || error.message
              );
              Alert.alert("Error", "No se pudo eliminar el libro");
            }
          },
        },
      ]
    );
  };

  const handleEditBook = () => {
    setModalVisible(false);
    navigation.navigate("Agregar", { book: selectedBook });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectBook(item.id)}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.author}>Autor: {item.autor}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedBook ? (
            <>
              <Text style={styles.modalTitle}>{selectedBook.titulo}</Text>
              <Text style={styles.modalText}>Autor: {selectedBook.autor}</Text>
              <Text style={styles.modalText}>
                Estado: {selectedBook.estado}
              </Text>
              <Text style={styles.modalText}>
                Inicio: {formatDate(selectedBook.fecha_inicio)}
              </Text>
              <Text style={styles.modalText}>
                Fin:{" "}
                {selectedBook.fecha_fin
                  ? formatDate(selectedBook.fecha_fin)
                  : "—"}
              </Text>
              <Text style={styles.modalText}>
                Comentario: {selectedBook.comentario || "Sin comentario"}
              </Text>

              <View style={styles.buttonGroup}>
                <View style={styles.button}>
                  <Button title="Editar" onPress={handleEditBook} />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Eliminar"
                    color="red"
                    onPress={handleDeleteBook}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Cerrar"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </>
          ) : (
            <Text>Cargando detalle...</Text>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  card: {
    backgroundColor: "#E6E8E6",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonGroup: {
    marginTop: 24,
  },
  button: {
    marginVertical: 6,
  },
});