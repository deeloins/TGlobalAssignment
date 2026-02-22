import { CalendarStrip } from "@/components/CalendarStrip";
import { useNavigation } from "expo-router";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MoreVertical,
  X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SHIFTS = [
  {
    id: "1",
    time: "08:30",
    title: "OctendedisentsShift",
    color: "#5653FC",
    bg: "#EFEEFF",
  },
  {
    id: "2",
    time: "09:00",
    title: "OctendedisentsShift",
    color: "#10B981",
    bg: "#E6FFFA",
  },
  {
    id: "3",
    time: "09:30",
    title: "OctendedisentsShift",
    color: "#E35F00",
    bg: "#FFF8EB",
  },
  {
    id: "4",
    time: "10:00",
    title: "OctendedisentsShift",
    color: "#5653FC",
    bg: "#EFEEFF",
  },
  {
    id: "5",
    time: "10:30",
    title: "OctendedisentsShift",
    color: "#E35F00",
    bg: "#FFF8EB",
  },
];

const TIME_SLOTS = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];

export default function ScheduleScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: isModalVisible ? "none" : "flex",
        height: 87,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F5F5F5",
      },
    });
  }, [isModalVisible]);

  const toggleModal = (show: boolean) => {
    if (show) {
      setModalVisible(true);
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
    } else {
      opacity.value = withTiming(0, { duration: 250 });
      translateY.value = withTiming(
        SCREEN_HEIGHT,
        { duration: 300 },
        (finished) => {
          if (finished) {
            runOnJS(setModalVisible)(false);
          }
        },
      );
    }
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
        opacity.value = Math.max(0, 1 - e.translationY / (SCREEN_HEIGHT * 0.5));
      }
    })
    .onEnd((e) => {
      if (e.velocityY > 500 || e.translationY > 150) {
        opacity.value = withTiming(0, { duration: 200 });
        translateY.value = withTiming(
          SCREEN_HEIGHT,
          { duration: 250 },
          (finished) => {
            if (finished) {
              runOnJS(setModalVisible)(false);
            }
          },
        );
      } else {
        opacity.value = withTiming(1);
        translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mijn rooster</Text>
          <TouchableOpacity style={styles.iconButton}>
            <MoreVertical size={20} color="#535862" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarPlaceholder}>
          <CalendarStrip />
        </View>

        <View style={styles.roomSelectorContainer}>
          <TouchableOpacity style={styles.roomSelector}>
            <Text style={styles.roomText}>Room1</Text>
            <ChevronDown size={18} color="#535862" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.timelineWrapper}>
            <View style={[styles.timeIndicator, { top: 95 }]}>
              <View style={styles.timeIndicatorDot} />
              <View style={styles.timeIndicatorLine} />
            </View>

            {TIME_SLOTS.map((slot) => {
              const shift = SHIFTS.find((s) => s.time === slot);
              return (
                <View key={slot} style={styles.timeRow}>
                  <View style={styles.timeLabelContainer}>
                    <Text style={styles.timeLabel}>{slot}</Text>
                  </View>
                  <View style={styles.shiftColumn}>
                    {shift && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => toggleModal(true)}
                      >
                        <View
                          style={[
                            styles.shiftCard,
                            {
                              backgroundColor: shift.bg,
                              borderLeftColor: shift.color,
                            },
                          ]}
                        >
                          <View style={styles.cardHeader}>
                            <Text style={styles.taskName} numberOfLines={1}>
                              {shift.title}
                            </Text>
                            <Text
                              style={[styles.timeRange, { color: shift.color }]}
                            >
                              12:00 - 20:00
                            </Text>
                          </View>
                          <View style={styles.cardFooter}>
                            <Image
                              source={{
                                uri: "https://i.pravatar.cc/100?u=omar",
                              }}
                              style={styles.miniAvatar}
                            />
                            <Text style={styles.workerName}>
                              Omar r. •{" "}
                              <Text style={styles.statusText}>Beschikbaar</Text>
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {isModalVisible && (
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.dimOverlay, overlayStyle]}>
              <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1 }}
                onPress={() => toggleModal(false)}
              />
            </Animated.View>

            <GestureDetector gesture={swipeGesture}>
              <Animated.View style={[styles.modalSheet, animatedStyle]}>
                <View style={styles.modalHandle} />
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => toggleModal(false)}
                    style={styles.circleBtn}
                  >
                    <ChevronLeft size={20} color="#667085" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Shift Details</Text>
                  <TouchableOpacity
                    onPress={() => toggleModal(false)}
                    style={styles.circleBtn}
                  >
                    <X size={20} color="#667085" />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Clock size={16} color="#667085" />
                      <Text style={styles.metaText}>8:00am - 12:00pm</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                      <Calendar size={16} color="#667085" />
                      <Text style={styles.metaText}>10 - 02 - 2024</Text>
                    </View>
                  </View>

                  <Text style={styles.sectionLabel}>Beschrijving</Text>
                  <Text style={styles.desc}>
                    Dit is een kamer for gesprekken tussen chirurgische artsen
                    en patiënten over
                  </Text>

                  <View style={styles.dienstRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.sectionLabel}>Dienst</Text>
                      <View style={styles.ochtendBadge}>
                        <Text style={styles.ochtendText}>
                          Ochtend 8:00-12:00
                        </Text>
                      </View>
                    </View>
                    <View style={styles.vDividerLight} />
                    <View style={{ flex: 1, paddingLeft: 16 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <MapPin size={14} color="#98A2B3" />
                        <Text style={styles.kamersLabel}>Kamers</Text>
                      </View>
                      <Text style={styles.roomName}>Verkoeverruimte</Text>
                    </View>
                  </View>

                  <Text style={styles.sectionLabel}>Team</Text>
                  <View
                    style={[styles.teamCard, { backgroundColor: "#FFFAEB" }]}
                  >
                    <View style={styles.avatarGroup}>
                      <Image
                        source={{ uri: "https://i.pravatar.cc/100?u=1" }}
                        style={styles.av}
                      />
                      <Image
                        source={{ uri: "https://i.pravatar.cc/100?u=2" }}
                        style={[styles.av, styles.avOverlap]}
                      />
                    </View>
                    <Text style={styles.teamNames}>Omar r. , Elijah a.</Text>
                    <Text style={[styles.teamTime, { color: "#B54708" }]}>
                      4:00 - 8:00
                    </Text>
                  </View>

                  <View style={styles.notitiesHeader}>
                    <Text style={styles.sectionLabel}>Notities</Text>
                    <div style={styles.notitieBadge}>
                      <Text style={styles.notitieBadgeText}>3 notities</Text>
                      <ChevronRight size={14} color="#344054" />
                    </div>
                  </View>

                  {[1, 2].map((i) => (
                    <View key={i} style={styles.noteCard}>
                      <Image
                        source={{ uri: `https://i.pravatar.cc/100?u=note${i}` }}
                        style={styles.noteAvatar}
                      />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.noteAuthor}>Omar r</Text>
                          <Text style={styles.noteTime}>2 min geleden</Text>
                        </View>
                        <Text style={styles.noteText} numberOfLines={1}>
                          Medewerker is medisch toegewezen a...
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </Animated.View>
            </GestureDetector>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    maxWidth: Platform.OS === "web" ? 400 : "100%",
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 28, fontWeight: "700", color: "#101828" },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F2F4F7",
  },
  calendarPlaceholder: { height: 80, justifyContent: "center" },
  roomSelectorContainer: { paddingHorizontal: 16, marginBottom: 10 },
  roomSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F2F4F7",
  },
  roomText: { fontSize: 16, fontWeight: "600", color: "#242424" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  timelineWrapper: { position: "relative" },
  timeIndicator: {
    position: "absolute",
    left: 5,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99,
  },
  timeIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5653FC",
    marginLeft: -5,
  },
  timeIndicatorLine: { flex: 1, height: 2, backgroundColor: "#5653FC" },
  timeRow: { flexDirection: "row", height: 90 },
  timeLabelContainer: { width: 50, alignItems: "flex-start" },
  timeLabel: { fontSize: 14, color: "#717680", fontWeight: "500" },
  shiftColumn: {
    flex: 1,
    paddingLeft: 10,
    borderTopWidth: 1,
    borderTopColor: "#F9FAFB",
  },
  shiftCard: {
    padding: 10,
    borderRadius: 12,
    borderLeftWidth: 4,
    height: 80,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#242424",
    flex: 1,
    marginRight: 4,
  },
  timeRange: { fontSize: 12, fontWeight: "600" },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 6 },
  miniAvatar: { width: 22, height: 22, borderRadius: 11 },
  workerName: { fontSize: 13, color: "#242424", fontWeight: "500" },
  statusText: { fontSize: 12, color: "#717680" },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
  modalSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "92%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    zIndex: 1001,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#EAECF0",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "700" },
  metaRow: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  metaText: { color: "#475467", fontWeight: "500", fontSize: 14 },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#D0D5DD",
    marginHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 8,
  },
  desc: { color: "#475467", lineHeight: 20, marginBottom: 24 },
  dienstRow: {
    flexDirection: "row",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
    paddingBottom: 24,
  },
  vDividerLight: { width: 1, backgroundColor: "#F2F4F7" },
  ochtendBadge: {
    backgroundColor: "#FFFAEB",
    padding: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  ochtendText: { color: "#B54708", fontWeight: "700", fontSize: 12 },
  kamersLabel: { fontSize: 12, color: "#98A2B3", fontWeight: "500" },
  roomName: { fontSize: 14, fontWeight: "600", color: "#344054" },
  teamCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
  },
  avatarGroup: { flexDirection: "row" },
  av: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  avOverlap: { marginLeft: -12 },
  teamNames: { flex: 1, marginLeft: 12, fontWeight: "500", color: "#344054" },
  teamTime: { fontWeight: "700" },
  notitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },
  notitieBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  notitieBadgeText: { fontSize: 12, fontWeight: "700", marginRight: 4 },
  noteCard: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: "#F2F4F7",
    borderRadius: 12,
    marginBottom: 8,
  },
  noteAvatar: { width: 40, height: 40, borderRadius: 20 },
  noteAuthor: { fontWeight: "600", color: "#344054" },
  noteTime: { fontSize: 12, color: "#667085" },
  noteText: { fontSize: 13, color: "#475467", marginTop: 2 },
});
