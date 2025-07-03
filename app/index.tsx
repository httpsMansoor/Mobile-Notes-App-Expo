// app/index.tsx
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useNotes } from "../hooks/useNotes";
import { NoteCard } from "../components/NoteCard";
import { EmptyNotes } from "../components/EmptyNotes";
import { COLORS } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const { notes, isLoading } = useNotes();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {notes.length === 0 ? (
        <EmptyNotes />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="pb-20">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </View>
        </ScrollView>
      )}

// In your components where you link to the add note screen:
<Link href="./add-note" asChild>
        <TouchableOpacity className="absolute bottom-6 right-6 bg-indigo-500 w-14 h-14 rounded-full items-center justify-center shadow-lg">
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}