import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function AdminHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel administratora</Text>

      <Button
        title="Dodaj książkę"
        onPress={() => router.push('/admin/add-book')}
      />

      <View style={styles.space} />

      <Button
        title="Dodaj autora"
        onPress={() => router.push('/admin/add-author')}
      />

      <View style={styles.space} />

      <Button
        title="Dodaj kategorię"
        onPress={() => router.push('/admin/add-category')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  space: {
    height: 20
  }
});
