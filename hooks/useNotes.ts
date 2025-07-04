// app/hooks/useNotes.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Note } from "../types/note";

const NOTES_KEY = "NOTES_APP_NOTES";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes from storage
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(NOTES_KEY);
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error("Failed to load notes", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Save notes to storage whenever they change
  useEffect(() => {
    const saveNotes = async () => {
      if (!isLoading) {
        try {
          await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        } catch (error) {
          console.error("Failed to save notes", error);
        }
      }
    };

    saveNotes();
  }, [notes, isLoading]);

  const addNote = async (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    return newNote;
  };

  const updateNote = async (id: string, title: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, title, content, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = async (id: string, onDeleted?: () => void) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            if (onDeleted) onDeleted();
          },
        },
      ]
    );
  };

  const reloadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(NOTES_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Failed to reload notes", error);
    }
  };

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    reloadNotes,
  };
};