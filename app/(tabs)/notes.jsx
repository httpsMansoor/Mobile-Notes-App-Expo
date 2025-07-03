
import NoteCard from '../../components/NoteCard';
import { View, ScrollView } from 'react-native';

const sampleNotes = [
  { id: 1, title: 'First Note', content: 'This is your first note.' },
  { id: 2, title: 'Second Note', content: 'This is your second note.' },
];

export default function NotesScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Header title="My Notes" />
      <ScrollView className="flex-1 px-4 py-2">
        {sampleNotes.map(note => (
          <NoteCard key={note.id} title={note.title} content={note.content} />
        ))}
      </ScrollView>
      <View className="p-4">
        <Button label="Add Note" onPress={() => {}} />
      </View>
    </View>
  );
} 