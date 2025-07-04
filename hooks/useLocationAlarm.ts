import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Note } from "../types/note";

const DISTANCE_THRESHOLD_METERS = 100; // Trigger alarm if within 100 meters
const LOCATION_CHECK_INTERVAL = 60 * 1000; // Check every 60 seconds

function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  // Haversine formula
  const R = 6371e3;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useLocationAlarm(notes: Note[]) {
  const triggeredAlarms = useRef<Set<string>>(new Set());

  useEffect(() => {
    let intervalId: number;
    let isMounted = true;

    async function checkLocationAndTrigger() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        const loc = await Location.getCurrentPositionAsync({});
        const now = new Date();
        for (const note of notes) {
          if (
            note.location &&
            note.alarm &&
            new Date(note.alarm.time) <= now &&
            !triggeredAlarms.current.has(note.id)
          ) {
            const dist = getDistanceMeters(
              loc.coords.latitude,
              loc.coords.longitude,
              note.location.latitude,
              note.location.longitude
            );
            if (dist <= DISTANCE_THRESHOLD_METERS) {
              // Trigger notification
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Location Alarm",
                  body: `You have a note at this location: ${note.title}`,
                  sound: note.alarm.sound || undefined,
                },
                trigger: null,
              });
              triggeredAlarms.current.add(note.id);
            }
          }
        }
      } catch (e) {
        // Ignore errors
      }
    }

    intervalId = setInterval(checkLocationAndTrigger, LOCATION_CHECK_INTERVAL);
    // Run once immediately
    checkLocationAndTrigger();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [notes]);
} 