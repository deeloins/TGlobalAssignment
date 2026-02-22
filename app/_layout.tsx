import { Stack, Tabs } from "expo-router";
import { BookOpen, Calendar, Home, User } from "lucide-react-native";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#5653FC",
      tabBarInactiveTintColor: "#717680",
      headerShown: false,
      tabBarStyle: {
        height: Platform.OS === "ios" ? 88 : 70,
        paddingBottom: Platform.OS === "ios" ? 30 : 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F5F5F5",
        ...Platform.select({
          web: {
            boxShadow: "0px -4px 16px rgba(0, 0, 0, 0.04)",
          },
          default: {
            elevation: 8,
          },
        }),
      },
      tabBarLabelStyle: {
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: "400",
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        tabBarIcon: ({ color }) => <Home size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="index"
      options={{
        title: "Rooster",
        tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="publications"
      options={{
        title: "Publications",
        tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        tabBarIcon: ({ color }) => <User size={24} color={color} />,
      }}
    />
  </Tabs>;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        {/* Hide header for the main tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Show the Detail Page as a Modal */}
        <Stack.Screen
          name="shift-details"
          options={{
            presentation: "modal",
            headerTitle: "Shift Details",
            headerShown: true,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
