// app/components/EmptyNotes.tsx
import { View, Text } from "react-native";
import { COLORS } from "../constants/colors";

export const EmptyNotes = () => {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <View className="bg-indigo-100 p-6 rounded-full mb-4">
        <Text className="text-indigo-500 text-4xl">📝</Text>
      </View>
      <Text className="text-xl font-semibold text-gray-800 mb-2">
        No Notes Yet
      </Text>
      <Text className="text-gray-500 text-center">
        Tap the + button to create your first note
      </Text>
    </View>
  );
};
