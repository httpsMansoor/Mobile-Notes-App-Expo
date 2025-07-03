// app/components/NoteCard.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../constants/colors";
import { Note } from "../types/note";
import { format } from "date-fns";

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Link href={`./note-details/${note.id}`} asChild>
      <TouchableOpacity className="active:opacity-80">
        <View className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {note.title}
          </Text>
          <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
            {note.content}
          </Text>
          <Text className="text-xs text-gray-400">
            {format(new Date(note.updatedAt), "MMM dd, yyyy - h:mm a")}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};