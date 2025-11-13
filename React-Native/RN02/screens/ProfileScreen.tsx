import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
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
  const [showModal, setShowModal] = useState<null | "save" | "logout">(null);
  const [locationDenied, setLocationDenied] = useState(false);

  // ✅ Para webcam en web
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const pickImage = async () => {
    if (Platform.OS === "web") {
      // Web: abrir selector de archivos
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = () => {
        const file = input.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPhoto(url);
      };
      input.click();
    } else {
      // Móvil: usar expo-image-picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    }
  };

  const openCamera = async () => {
    if (Platform.OS === "web") {
      setShowCamera(true);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }
    } else {
      // Móvil: usar cámara de expo-image-picker
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    }
  };

  const takePhotoWeb = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setPhoto(dataUrl);

    // Detener cámara
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    setShowCamera(false);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationDenied(true);
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
    if (phone.length < 7 || phone.length > 15) {
      setMessage({ text: "El número de teléfono debe tener entre 7 y 15 dígitos", type: "error" });
      return;
    }
    setShowModal("save");
  };

  const confirmSave = () => {
    setShowModal(null);
    setMessage({ text: "Perfil guardado con éxito", type: "success" });
  };

  const handleLogout = () => setShowModal("logout");

  const confirmLogout = () => {
    setShowModal(null);
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      <Image source={{ uri: photo }} style={styles.avatar} />
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={styles.photoButtonText}>Subir Imagen</Text>
        </TouchableOpacity>
        {Platform.OS === "web" && (
          <TouchableOpacity style={[styles.photoButton, { marginLeft: 10 }]} onPress={openCamera}>
            <Text style={styles.photoButtonText}>Usar Webcam</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.label}>Nombre</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nombre completo" />

      <Text style={styles.label}>Correo</Text>
      <Text style={styles.email}>{email}</Text>

      <Text style={styles.label}>Teléfono</Text>
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="Número de teléfono" keyboardType="phone-pad" />

      {message && <Text style={[styles.message, message.type === "error" ? styles.error : styles.success]}>{message.text}</Text>}

      <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
        <Text style={styles.locationButtonText}>Obtener Ubicación Actual</Text>
      </TouchableOpacity>
      {locationDenied && <Text style={styles.error}>Permiso de ubicación denegado. Actívalo para continuar.</Text>}
      {location ? <Text style={styles.location}>{location}</Text> : null}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <Modal transparent visible={!!showModal} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {showModal === "save" ? "¿Deseas guardar los cambios del perfil?" : "¿Seguro que deseas cerrar sesión?"}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowModal(null)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={showModal === "save" ? confirmSave : confirmLogout}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de webcam web */}
      {Platform.OS === "web" && showCamera && (
        <Modal transparent visible={showCamera} animationType="slide">
          <View style={styles.modalContainer}>
            <video ref={videoRef} style={styles.video} autoPlay />
            <TouchableOpacity style={styles.captureButton} onPress={takePhotoWeb}>
              <Text style={styles.buttonText}>Tomar Foto</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </ScrollView>
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
    marginTop: 15,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "40%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#34a853",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  video: {
    width: 400,
    height: 300,
    borderRadius: 10,
  },
  captureButton: {
    marginTop: 15,
    backgroundColor: "#34a853",
    padding: 10,
    borderRadius: 8,
  },
});
