import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Button, Linking, PixelRatio, Animated, BackHandler, ScrollView } from 'react-native';

export default function APIsTab() {
  const [dim, setDim] = useState(Dimensions.get('window'));
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleBackPress = () => {
    Alert.alert('Volviendo', 'Se presionó el botón de atrás.');
    return true;
  };

  useEffect(() => {
    const dimSubscription = Dimensions.addEventListener('change', ({ window }) => setDim(window));
    const backSubscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      dimSubscription.remove();  
      backSubscription.remove(); 
    };
  }, []);

  const startAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>APIs / Utilidades</Text>

      <Text style={styles.title}>Dimensions</Text>
      <Text>Ancho: {dim.width}, Alto: {dim.height}</Text>

      <Text style={styles.title}>PixelRatio</Text>
      <Text>Pixel ratio: {PixelRatio.get()}</Text>

      <Text style={styles.title}>Alert</Text>
      <Button title="Mostrar alerta" onPress={() => alert('Esto es una alerta!')} />

      <Text style={styles.title}>Linking</Text>
      <Button title="Abrir Google" onPress={() => Linking.openURL('https://google.com')} />

      <Text style={styles.title}>Animated</Text>
      <Button title="Animar" onPress={startAnimation} />
      <Animated.View style={[styles.box, { opacity: fadeAnim }]} />

      <Text style={styles.title}>BackHandler</Text>
      <Text>Presiona el botón de atrás en Android para probar la funcionalidad.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  box: { width: 100, height: 100, backgroundColor: 'tomato', marginTop: 10 },
});
