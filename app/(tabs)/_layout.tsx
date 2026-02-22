import { Tabs } from "expo-router";
import { BookOpen, Calendar, Home, User } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5653FC",
        tabBarInactiveTintColor: "#717680",
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F5F5F5",
          height: 87,
          paddingTop: 12,
          paddingBottom: 12,
          maxWidth: 400,
          width: "100%",
          alignSelf: "center",
          shadowColor: "rgba(0, 0, 0, 0.04)",
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 16,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: "400",
          marginTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Rooster",
          tabBarIcon: ({ color }) => (
            <View style={styles.activeContainer}>
              <View style={styles.activeIndicator} />
              <Calendar color={color} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="publications"
        options={{
          title: "Publications",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 81.75,
  },
  activeIndicator: {
    width: 64,
    height: 4,
    backgroundColor: "#5653FC",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
