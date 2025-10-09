import React, { useState } from 'react';
import {
  View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Detectar plataforma y asignar URL correcta
  const getBaseUrl = () => {
    if (Platform.OS === 'android') {
      // Emulador Android
      return 'http://10.0.2.2:3000';
    } else if (Platform.OS === 'web') {
      // Navegador web
      return 'http://localhost:3000';
    } else {
      // Dispositivo físico Android
      return 'http://192.168.1.100:3000'; // ← CAMBIA por tu IP local
    }
  };

  const API_URL = `${getBaseUrl()}/api/login`;

  const onSubmit = async () => {
    if (!identifier.trim() || !password.trim()) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigation.navigate('Welcome', {
          id: data.user.id,
          email: data.user.email,
          usuario: data.user.usuario,
        });
      } else {
        setError(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email o Usuario"
        value={identifier}
        onChangeText={(text) => {
          setIdentifier(text);
          if (error) setError('');
        }}
        style={[styles.input, error && !identifier ? styles.inputError : null]}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (error) setError('');
        }}
        secureTextEntry
        style={[styles.input, error && !password ? styles.inputError : null]}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Ingresar" onPress={onSubmit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 60,
    backgroundColor: '#ebebebff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#727272ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },

});
