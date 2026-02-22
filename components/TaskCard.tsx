// src/components/TaskCard.tsx
import { theme } from "@/themes/theme";
import { Clock } from "lucide-react-native"; // Matching the time-04 icon
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface TaskCardProps {
  title: string;
  startTime: string;
  endTime: string;
  avatars: string[];
}

export const TaskCard = ({
  title,
  startTime,
  endTime,
  avatars,
}: TaskCardProps) => {
  return (
    <View style={styles.cardContainer}>
      {/* Line 167: The blue side indicator */}
      <View style={styles.sideIndicator} />

      <View style={styles.content}>
        <Text style={styles.taskName}>{title}</Text>

        <View style={styles.timeRow}>
          <Clock size={16} color={theme.colors.indicatorBlue} />
          <Text style={styles.timeText}>{`${startTime} - ${endTime}`}</Text>
        </View>

        {/* Avatar Stack Implementation */}
        <View style={styles.footer}>
          <View style={styles.avatarStack}>
            {avatars.map((url, index) => (
              <View
                key={index}
                style={[
                  styles.avatarWrapper,
                  { zIndex: 10 - index, marginLeft: index === 0 ? 0 : -8 },
                ]}
              >
                <Image source={{ uri: url }} style={styles.avatar} />
              </View>
            ))}
          </View>
          <Text style={styles.durationText}>{`${startTime} - ${endTime}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 101,
    backgroundColor: theme.colors.cardBlue,
    borderRadius: theme.borderRadius.md,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 12,
  },
  sideIndicator: {
    width: 5,
    height: "100%",
    backgroundColor: theme.colors.indicatorBlue,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  taskName: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textMain,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontFamily: "Manrope",
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.indicatorBlue,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: theme.colors.borderLight,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  durationText: {
    fontFamily: "Manrope",
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});
