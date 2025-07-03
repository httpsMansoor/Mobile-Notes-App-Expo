
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Header title="Settings" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-300 text-lg">Settings coming soon...</Text>
      </View>
    </View>
  );
} 