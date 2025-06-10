import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Witaj, {user.username}!</Text>
      <Text style={styles.role}>Rola: {user.role}</Text>

      {/* Później dodamy przyciski do Books, Loans, Reviews */}
      <Button title="Wyloguj" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  welcome: { fontSize: 24, textAlign: 'center', marginBottom: 8 },
  role: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});
