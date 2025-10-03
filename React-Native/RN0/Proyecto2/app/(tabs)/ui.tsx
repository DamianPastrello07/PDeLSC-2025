import React, { useState } from 'react';
import { View, Text, Button, Pressable, Switch, Modal, ActivityIndicator, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';

export default function UITab() {
  const [modalVisible, setModalVisible] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UI Components</Text>

      <Text style={styles.title}>Button</Text>
      <Button title="Presióname" onPress={() => alert('Botón presionado')} />

      <Text style={styles.title}>Pressable</Text>
      <Pressable style={styles.button} onPress={() => alert('Pressable')}>
        <Text style={{ color: 'white' }}>Pressable</Text>
      </Pressable>

      <Text style={styles.title}>Switch</Text>
      <Switch value={switchOn} onValueChange={setSwitchOn} />
      <Text>{switchOn ? 'Encendido' : 'Apagado'}</Text>

      <Text style={styles.title}>Modal</Text>
      <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Este es un modal</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>ActivityIndicator</Text>
      <ActivityIndicator size="large" color="blue" />

      <Text style={styles.title}>TouchableOpacity</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('TouchableOpacity')}>
        <Text style={{ color: 'white' }}>TouchableOpacity</Text>
      </TouchableOpacity>

      <Text style={styles.title}>TouchableHighlight</Text>
      <TouchableHighlight style={styles.button} underlayColor="#005BBB" onPress={() => alert('TouchableHighlight')}>
        <Text style={{ color: 'white' }}>TouchableHighlight</Text>
      </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white'   },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 8 },
});
