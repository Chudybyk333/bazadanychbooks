import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function AddAuthorScreen() {
  const [authorName, setAuthorName] = useState('');

  const handleAddAuthor = async () => {
    if (!authorName.trim()) {
      Alert.alert('Błąd', 'Wpisz imię i nazwisko autora');
      return;
    }

    try {
      const response = await fetch('http://localhost:3306/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: authorName }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sukces', 'Autor został dodany');
        setAuthorName('');
        router.back();
      } else {
        Alert.alert('Błąd', data.error || 'Coś poszło nie tak');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Brak połączenia z serwerem');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj autora</Text>

      <TextInput
        style={styles.input}
        placeholder="Imię i nazwisko autora"
        value={authorName}
        onChangeText={setAuthorName}
      />

      <Button title="Dodaj autora" onPress={handleAddAuthor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});
