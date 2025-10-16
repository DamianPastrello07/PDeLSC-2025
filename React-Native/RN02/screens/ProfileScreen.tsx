import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

interface UserProfile {
  name: string;
  email: string;
  picture: string;
  phone?: string;
}

export default function ProfileScreen({ route, navigation }: Props) {
  const { user } = route.params as { user: UserProfile };

  const [name, setName] = useState(user.name || "");
  const [email] = useState(user.email || "");
  const [photo, setPhoto] = useState(user.picture || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [location, setLocation] = useState<string>("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso de ubicación denegado");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`);
  };

  const handleSave = () => {
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      setMessage({ text: "El teléfono solo puede contener números", type: "error" });
      return;
    }
    setMessage({ text: "Perfil guardado con éxito", type: "success" });
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perfil del Usuario</Text>

        <Image source={{ uri: photo }} style={styles.avatar} />
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={styles.photoButtonText}>Cambiar Foto</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Nombre completo"
        />

        <Text style={styles.label}>Correo</Text>
        <Text style={styles.email}>{email}</Text>

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
        />

        {message && (
          <Text style={[styles.message, message.type === "error" ? styles.error : styles.success]}>
            {message.text}
          </Text>
        )}

        <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
          <Text style={styles.locationButtonText}>Obtener Ubicación Actual</Text>
        </TouchableOpacity>
        {location ? <Text style={styles.location}>{location}</Text> : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  email: {
    alignSelf: "flex-start",
    color: "#555",
    marginBottom: 10,
  },
  locationButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  locationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  location: {
    marginVertical: 10,
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#34a853",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 25,
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    marginTop: 10,
    fontWeight: "bold",
  },
  error: {
    color: "#e53935",
  },
  success: {
    color: "#34a853",
  },
});
