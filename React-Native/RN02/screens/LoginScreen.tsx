import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

WebBrowser.maybeCompleteAuthSession();

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  phone?: string;
}

export default function LoginScreen({ navigation }: Props) {
  const [userInfo, setUserInfo] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Forzar uso de proxy URL de Expo
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true, // Expo Go
  });

  console.log("DEBUG redirectUri:", redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "448208271515-s80lo4nimg24t9fspb8v0c70l5efh0da.apps.googleusercontent.com",
    androidClientId:
      "448208271515-s80lo4nimg24t9fspb8v0c70l5efh0da.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUserInfo(null);
      setError(null);
      setModalVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log("DEBUG auth response:", response);
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        getUserInfo(authentication.accessToken);
      } else {
        setError("No se recibió token de acceso.");
        setModalVisible(true);
      }
    } else if (response?.type === "error") {
      setError("Error al iniciar sesión con Google.");
      setModalVisible(true);
    } else if (response && response.type === "dismiss") {
      setError("Login cancelado por el usuario.");
      setModalVisible(true);
    }
  }, [response]);

  const getUserInfo = async (token: string) => {
    try {
      setLoading(true);
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se pudo obtener información del usuario.");
      const user: GoogleUser = await res.json();
      setUserInfo(user);
      navigation.navigate("Profile", { user });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      {loading && (
        <ActivityIndicator size="large" color="#4285F4" style={{ marginVertical: 20 }} />
      )}

      <TouchableOpacity
        style={[styles.button, !request && styles.buttonDisabled]}
        disabled={!request}
        onPress={() => {
          setError(null);
          setModalVisible(false);
          promptAsync();
        }}
      >
        <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      {/* Modal de error */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error de Login</Text>
            <Text style={styles.modalText}>{error}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#a0c4f4",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "50%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
