import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
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

  // Detectar plataforma y generar redirectUri correcto
  const redirectUri = Platform.select({
    web: AuthSession.makeRedirectUri({ useProxy: true }),
    default: AuthSession.makeRedirectUri({ useProxy: false }),
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "448208271515-s80lo4nimg24t9fspb8v0c70l5efh0da.apps.googleusercontent.com",
    androidClientId: Platform.OS === "android" ? "448208271515-d6k8g4m5mgp1eq3ljg4f6hemha5u5aib.apps.googleusercontent.com" : undefined,
    scopes: ["profile", "email"],
    redirectUri,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUserInfo(null);
      setError(null);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        getUserInfo(authentication.accessToken);
      }
    } else if (response?.type === "error") {
      setError("Error al iniciar sesión con Google.");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      {loading && <ActivityIndicator size="large" color="#4285F4" style={{ marginVertical: 20 }} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, !request && styles.buttonDisabled]}
        disabled={!request}
        onPress={() => {
          setError(null);
          promptAsync();
        }}
      >
        <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 20,
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
  error: {
    color: "#e53935",
    marginTop: 15,
    textAlign: "center",
  },
});
