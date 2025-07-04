// app/add-note.tsx
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { useNotes } from "../hooks/useNotes";
export default function AddNoteScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { addNote } = useNotes();

  const handleSave = async () => {
    if (title.trim() === "" && content.trim() === "") {
      setError("Please enter a title or some content.");
      return;
    }
    setError("");
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
        >
          <Text className="text-white font-medium">Save</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
      ) : null}

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={text => {
          setTitle(text);
          if (error) setError("");
        }}
        className="text-2xl font-bold text-gray-900 mb-4"
        placeholderTextColor={COLORS.textLight}
        autoFocus
      />

      <TextInput
        placeholder="Start typing..."
        value={content}
        onChangeText={text => {
          setContent(text);
          if (error) setError("");
        }}
        className="text-base text-gray-800 flex-1"
        placeholderTextColor={COLORS.textLight}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
}