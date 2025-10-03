import React, { useState } from 'react';
import { View, Text, FlatList, SectionList, ScrollView, RefreshControl, StyleSheet, VirtualizedList } from 'react-native';

export default function ListsTab() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const data = ['Elemento 1', 'Elemento 2', 'Elemento 3'];
  const sections = [
    { title: 'Sección A', data: ['A1', 'A2'] },
    { title: 'Sección B', data: ['B1', 'B2'] },
  ];

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Text style={styles.header}>List Components</Text>

      <Text style={styles.title}>FlatList</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.title}>SectionList</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      />

      <Text style={styles.title}>VirtualizedList</Text>
      <VirtualizedList
        data={data}
        initialNumToRender={2}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />

      <Text style={styles.title}>RefreshControl</Text>
      <Text>Desliza hacia abajo para actualizar (en ScrollView arriba)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white'  },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  item: { padding: 10, backgroundColor: '#eee', marginBottom: 5 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', backgroundColor: '#ccc', padding: 5 },
});
