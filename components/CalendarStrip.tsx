// components/CalendarStrip.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DAYS = [
  { day: "15", label: "Thu", hasShift: false },
  { day: "16", label: "Fri", hasShift: false },
  { day: "17", label: "Sat", hasShift: false },
  { day: "18", label: "Sun", hasShift: true, selected: true },
  { day: "19", label: "Mon", hasShift: true },
  { day: "20", label: "Tue", hasShift: true },
  { day: "21", label: "Wed", hasShift: true },
];

export function CalendarStrip() {
  return (
    <View style={styles.container}>
      <View style={styles.daysWrapper}>
        {DAYS.map((item, index) => (
          <TouchableOpacity key={index} style={styles.dayColumn}>
            <Text style={styles.dayLabel}>{item.label}</Text>
            <View
              style={[
                styles.dateCircle,
                item.selected && styles.selectedCircle,
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  item.selected && styles.selectedDateText,
                ]}
              >
                {item.day}
              </Text>
            </View>
            {/* The status dot from Figma */}
            {item.hasShift && <View style={styles.dot} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, backgroundColor: "#FFF" },
  monthLabel: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    color: "#242424",
  },
  daysWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  dayColumn: { alignItems: "center", width: 40 },
  dayLabel: { fontSize: 12, color: "#717680", marginBottom: 8 },
  dateCircle: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  selectedCircle: { backgroundColor: "#5653FC" },
  dateText: { fontSize: 14, fontWeight: "600", color: "#242424" },
  selectedDateText: { color: "#FFF" },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5653FC",
    marginTop: 4,
  },
});
