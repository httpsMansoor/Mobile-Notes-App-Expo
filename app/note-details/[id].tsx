// app/note-details/[id].tsx
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { useNotes } from "../../hooks/useNotes";

export default function NoteDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, updateNote, deleteNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const note = notes.find((n) => n.id === id);
  const justDeleted = useRef(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    if (note) {
      await updateNote(note.id, title, content);
      setIsEditing(false);
      Keyboard.dismiss();
    }
  };

  const handleDelete = () => {
    if (note) {
      deleteNote(note.id, () => {
        justDeleted.current = true;
        router.back();
      });
    }
  };

  if (justDeleted.current) {
    return null;
  }

  if (!note) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Note not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Feather name="arrow-left" size={24} color={COLORS.textLight} />
        </TouchableOpacity>

        <View className="flex-row gap-2">
          {isEditing ? (
            <TouchableOpacity
              onPress={handleSave}
              className="p-2 px-4 rounded-full bg-indigo-500"
            >
              <Text className="text-white font-medium">Save</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                className="p-2 rounded-full bg-gray-100"
              >
                <Feather name="edit" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="p-2 rounded-full bg-gray-100"
              >
                <Feather name="trash-2" size={20} color={COLORS.secondary} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {isEditing ? (
        <>
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="text-2xl font-bold text-gray-900 mb-4"
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            className="text-base text-gray-800 flex-1"
            multiline
            textAlignVertical="top"
          />
        </>
      ) : (
        <>
          <Text className="text-2xl font-bold text-gray-900 mb-4">{title}</Text>
          <Text className="text-base text-gray-800 mb-6">{content}</Text>
          <Text className="text-xs text-gray-400">
            Created: {format(new Date(note.createdAt), "MMM dd, yyyy - h:mm a")}
          </Text>
          <Text className="text-xs text-gray-400">
            Last updated: {format(new Date(note.updatedAt), "MMM dd, yyyy - h:mm a")}
          </Text>
        </>
      )}
    </View>
  );
}