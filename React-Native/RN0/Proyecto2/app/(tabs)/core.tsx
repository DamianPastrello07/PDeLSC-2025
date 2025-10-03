import React from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet } from 'react-native';

export default function CoreTab() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Componentes Core</Text>

      <View style={styles.section}>
        <Text style={styles.title}>View</Text>
        <View style={styles.boxView} />
        <Text>Contenedor básico para agrupar elementos.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Text</Text>
        <Text>Este es un texto usando el componente Text.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Image</Text>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>TextInput</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe algo..."
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>ScrollView</Text>
        <ScrollView horizontal style={styles.scrollExample}>
          <View style={styles.scrollBox}><Text>1</Text></View>
          <View style={styles.scrollBox}><Text>2</Text></View>
          <View style={styles.scrollBox}><Text>3</Text></View>
          <View style={styles.scrollBox}><Text>4</Text></View>
          <View style={styles.scrollBox}><Text>5</Text></View>
          <View style={styles.scrollBox}><Text>6</Text></View>
          <View style={styles.scrollBox}><Text>7</Text></View>
          <View style={styles.scrollBox}><Text>8</Text></View>
          <View style={styles.scrollBox}><Text>9</Text></View>
          <View style={styles.scrollBox}><Text>10</Text></View>
          <View style={styles.scrollBox}><Text>11</Text></View>
          <View style={styles.scrollBox}><Text>12</Text></View>
          <View style={styles.scrollBox}><Text>13</Text></View>
          <View style={styles.scrollBox}><Text>14</Text></View>
          <View style={styles.scrollBox}><Text>15</Text></View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  boxView: {
    width: 80,
    height: 80,
    backgroundColor: 'skyblue',
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  scrollExample: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#888',
  },
  scrollBox: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
