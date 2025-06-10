import { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(username, password);
  };

  // Po zalogowaniu — przekieruj na właściwą stronę
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.replace('/admin/home');
      } else {
        router.replace('/home');
      }
    }
  }, [user]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

