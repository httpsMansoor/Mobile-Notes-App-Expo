// Root layout for the Mobile Notes App (ToDo project). Uses <Slot /> for nested layouts (e.g., tabs).
import { Slot } from "expo-router";
import "../app/globals.css";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Stack } from "expo-router";
import { COLORS } from "../constants/colors";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "My Notes",
            headerRight: () => (
              <Link href="/add-note" asChild>
                <TouchableOpacity className="mr-4">
                  <Feather name="plus" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="add-note"
          options={{
            title: "Add Note",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="note-details/[id]"
          options={{
            title: "Note Details",
          }}
        />
      </Stack>
    </>
  );
}