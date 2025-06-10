// app/add-book.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Picker, ScrollView } from 'react-native';

export default function AddBookScreen() {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  // Fetch categories from backend
  useEffect(() => {
    fetch('http://localhost:3000/categories') // dopasuj do swojego backendu
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error loading categories:', err));
  }, []);

  const handleAddBook = async () => {
    if (!title || !authorName || !selectedCategoryId) {
      Alert.alert('Uzupełnij wszystkie pola');
      return;
    }

    try {
      const res = await fetch('http://localhost:3306/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          authorName,
          categoryId: selectedCategoryId
        })
      });

      if (res.ok) {
        Alert.alert('Książka dodana!');
        setTitle('');
        setAuthorName('');
        setSelectedCategoryId('');
      } else {
        const err = await res.json();
        Alert.alert('Błąd:', err.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Wystąpił błąd sieci');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>Tytuł książki:</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Wpisz tytuł" />

      <Text>Autor:</Text>
      <TextInput value={authorName} onChangeText={setAuthorName} placeholder="Nazwisko autora" />

      <Text>Kategoria:</Text>
      <Picker
        selectedValue={selectedCategoryId}
        onValueChange={(itemValue) => setSelectedCategoryId(itemValue)}
      >
        <Picker.Item label="Wybierz kategorię..." value="" />
        {categories.map(cat => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
        ))}
      </Picker>

      <Button title="Dodaj książkę" onPress={handleAddBook} />
    </ScrollView>
  );
}
