// app/add-note.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useNotes } from "../hooks/useNotes";
import { COLORS } from "../constants/colors";
import { Feather } from "@expo/vector-icons";

export default function AddNoteScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { addNote } = useNotes();

  const handleSave = async () => {
    if (title.trim() === "" && content.trim() === "") {
      router.back();
      return;
    }

    await addNote(title, content);
    Keyboard.dismiss();
    router.back();
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Feather name="x" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          className="p-2 px-4 rounded-full bg-indigo-500"
          disabled={title.trim() === "" && content.trim() === ""}
        >
          <Text className="text-white font-medium">Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="text-2xl font-bold text-gray-900 mb-4"
        placeholderTextColor={COLORS.textLight}
        autoFocus
      />

      <TextInput
        placeholder="Start typing..."
        value={content}
        onChangeText={setContent}
        className="text-base text-gray-800 flex-1"
        placeholderTextColor={COLORS.textLight}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
}