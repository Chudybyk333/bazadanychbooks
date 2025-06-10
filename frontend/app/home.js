import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [minRatingFilter, setMinRatingFilter] = useState('');

  const fetchBooks = async () => {
    try {
      const query = new URLSearchParams();

      if (titleFilter) query.append('title', titleFilter);
      if (authorFilter) query.append('author', authorFilter);
      if (minRatingFilter) query.append('minRating', minRatingFilter);

      const response = await fetch(`http://localhost:3306/books?${query.toString()}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Fetch przy zmianie filtrów
  useEffect(() => {
    fetchBooks();
  }, [titleFilter, authorFilter, minRatingFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista książek</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtruj po tytule"
        value={titleFilter}
        onChangeText={setTitleFilter}
      />
      <TextInput
        style={styles.input}
        placeholder="Filtruj po autorze"
        value={authorFilter}
        onChangeText={setAuthorFilter}
      />
      <TextInput
        style={styles.input}
        placeholder="Minimalna ocena (np. 3)"
        value={minRatingFilter}
        onChangeText={setMinRatingFilter}
        keyboardType="numeric"
      />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Autor: {item.author}</Text>
            <Text>Dostępna: {item.available ? 'Tak' : 'Nie'}</Text>
            <Text>Średnia ocena: {item.avgRating.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Brak książek do wyświetlenia</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  bookItem: {
    marginBottom: 15,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
  },
  title: { fontSize: 18, fontWeight: '600' },
});

export default HomeScreen;

