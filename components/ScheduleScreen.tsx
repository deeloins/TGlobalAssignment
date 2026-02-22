import { theme } from "@/themes/theme";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { TaskCard } from "../components/TaskCard";

interface Task {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  avatars: string[];
}

export const ScheduleScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/schedule");
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskCard
          title={item.title}
          startTime={item.startTime}
          endTime={item.endTime}
          avatars={item.avatars}
        />
      )}
      contentContainerStyle={styles.listPadding}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listPadding: {
    padding: 16,
  },
});
