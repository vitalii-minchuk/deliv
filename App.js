import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl text-red-400">Op app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

