import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, StatusBar, Button, TouchableNativeFeedback, ScrollView } from 'react-native';

export default function PlatformTab() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Platform Components</Text>

          <Text style={styles.title}>SafeAreaView</Text>
          <Text>Protege el contenido de áreas de notch, status bar y bordes.</Text>

          <Text style={styles.title}>KeyboardAvoidingView</Text>
          <Text>Evita que el teclado cubra los inputs.</Text>

          {Platform.OS === 'android' && (
            <>
              <Text style={styles.title}>DrawerLayoutAndroid</Text>
              <Text>Drawer lateral específico de Android.</Text>

              <Text style={styles.title}>TouchableNativeFeedback</Text>
              <TouchableNativeFeedback onPress={() => alert('Presionado')}>
                <View style={styles.androidButton}>
                  <Text style={{ color: 'white' }}>TouchableNativeFeedback</Text>
                </View>
              </TouchableNativeFeedback>
            </>
          )}

          <Text style={styles.title}>StatusBar</Text>
          <StatusBar barStyle="dark-content" />
          <Button title="Cambiar contador" onPress={() => setCount(count + 1)} />
          <Text>Contador: {count}</Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white'   },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  androidButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
});
