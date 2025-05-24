import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createBook, updateBook, deleteBook } from "../api/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../contexts/Authcontext";

export default function AddBookScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { logout } = useContext(AuthContext);
  const bookToEdit = route.params?.book || null;

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estado, setEstado] = useState("leyendo");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [comentario, setComentario] = useState("");

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);

  useEffect(() => {
    if (bookToEdit) {
      setTitulo(bookToEdit.titulo || "");
      setAutor(bookToEdit.autor || "");
      setEstado(bookToEdit.estado || "leyendo");
      setFechaInicio(bookToEdit.fecha_inicio || null);
      setFechaFin(bookToEdit.fecha_fin || null);
      setComentario(bookToEdit.comentario || "");
    }
  }, [bookToEdit]);

  const handleSaveBook = async () => {
    if (!titulo.trim()) {
      Alert.alert("Error", "El título no puede estar vacío");
      return;
    }
    if (!autor.trim()) {
      Alert.alert("Error", "El autor no puede estar vacío");
      return;
    }

    const bookData = {
      titulo,
      autor,
      estado,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      comentario,
    };

    try {
      if (bookToEdit) {
        await updateBook(bookToEdit.id, bookData);
        Alert.alert("Éxito", "Libro actualizado correctamente");
        navigation.navigate("Lista", { refresh: true });
      } else {
        await createBook(bookData);
        Alert.alert("Éxito", "Libro agregado correctamente");

        // Limpiar campos después de agregar
        setTitulo("");
        setAutor("");
        setEstado("leyendo");
        setFechaInicio(null);
        setFechaFin(null);
        setComentario("");

        navigation.navigate("Lista", { refresh: true });
      }
    } catch (error) {
      console.error(
        "Error al guardar libro:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "No se pudo guardar el libro");
    }
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
              await deleteBook(bookToEdit.id);
              Alert.alert("Éxito", "Libro eliminado correctamente");
              navigation.navigate("Lista", { refresh: true });
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ingresa el título"
      />

      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
        placeholder="Ingresa el autor"
      />

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => setEstado(itemValue)}
        >
          <Picker.Item label="Leyendo" value="leyendo" />
          <Picker.Item label="Completado" value="completado" />
          <Picker.Item label="Por leer" value="por leer" />
        </Picker>
      </View>

      <Text style={styles.label}>Fecha de inicio</Text>
      <Button
        title={
          fechaInicio
            ? new Date(fechaInicio).toLocaleDateString()
            : "Seleccionar fecha"
        }
        onPress={() => setShowInicioPicker(true)}
      />
      {showInicioPicker && (
        <DateTimePicker
          value={fechaInicio ? new Date(fechaInicio) : new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowInicioPicker(false);
            if (date) setFechaInicio(date.toISOString().split("T")[0]);
          }}
        />
      )}

      <Text style={styles.label}>Fecha de fin</Text>
      <Button
        title={
          fechaFin
            ? new Date(fechaFin).toLocaleDateString()
            : "Seleccionar fecha"
        }
        onPress={() => setShowFinPicker(true)}
      />
      {showFinPicker && (
        <DateTimePicker
          value={fechaFin ? new Date(fechaFin) : new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowFinPicker(false);
            if (date) setFechaFin(date.toISOString().split("T")[0]);
          }}
        />
      )}

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={comentario}
        onChangeText={setComentario}
        multiline
        placeholder="Escribe un comentario..."
      />

      <Button
        title={bookToEdit ? "Guardar cambios" : "Guardar libro"}
        onPress={handleSaveBook}
      />

      {bookToEdit && (
        <View style={{ marginTop: 10 }}>
          <Button
            title="Eliminar libro"
            color="red"
            onPress={handleDeleteBook}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});