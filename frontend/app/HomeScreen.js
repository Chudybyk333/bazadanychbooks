import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {user?.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

