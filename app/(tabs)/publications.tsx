import { Inter_400Regular } from "@expo-google-fonts/inter";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { Search } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

const PUBLICATIONS = [
  {
    id: "1",
    title: "Vaccine hesitancy trends",
    desc: "How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?",
    author: "Elijah Oyindamola",
    date: "20 Jan 2022",
    readTime: "3mins",
    image: require("@/assets/images/first aid.svg"),
    authorImage: require("@/assets/images/male doctor.svg"),
  },
  {
    id: "2",
    title: "Vaccine hesitancy trends",
    desc: "How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?",
    author: "Elijah Oyindamola",
    date: "20 Jan 2022",
    readTime: "3mins",
    image: require("@/assets/images/first aid.svg"),
    authorImage: require("@/assets/images/male doctor.svg"),
  },
];

export default function PublicationsScreen() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerFrame}>
        <View style={styles.headerTextGroup}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.welcomeText}>👋 Welcome back</Text>
          </View>
          <Text style={styles.subHeaderText}>Start exploring publications</Text>
        </View>
        <Image
          source={require("@/assets/images/male doctor.svg")}
          style={styles.headerAvatar}
        />
      </View>

      <View style={styles.searchFrame}>
        <View style={styles.searchItem}>
          <Search size={20} color="#717680" />
          <Text style={styles.searchLabel}>Search publications</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionHeading}>Latest publications</Text>

        {PUBLICATIONS.map((pub) => (
          <View key={pub.id} style={styles.pubCard}>
            <View style={styles.imageWrapper}>
              <Image source={pub.image} style={styles.cardImage} />
              <View style={styles.imageOverlay} />
            </View>

            <View style={styles.cardContentFrame}>
              <View style={styles.contentInner}>
                <View style={styles.badgeRow}>
                  <View style={styles.blueBadge}>
                    <Text style={styles.blueBadgeText}>Covid</Text>
                  </View>
                  <View style={styles.pinkBadge}>
                    <Text style={styles.pinkBadgeText}>Vaccine</Text>
                  </View>
                </View>

                <View style={styles.textGroup}>
                  <Text style={styles.pubTitle}>{pub.title}</Text>
                  <Text style={styles.pubDesc} numberOfLines={2}>
                    {pub.desc}
                  </Text>
                </View>
              </View>

              <View style={styles.authorRow}>
                <Image source={pub.authorImage} style={styles.authorAvatar} />
                <View style={styles.authorMeta}>
                  <Text style={styles.authorName}>{pub.author}</Text>
                  <View style={styles.metaFrame}>
                    <View style={styles.metaSubRow}>
                      <Text style={styles.metaText}>{pub.date}</Text>
                      <View style={styles.metaRowInner}>
                        <View style={styles.metaDot} />
                        <Text style={styles.metaText}>{pub.readTime}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  headerFrame: ViewStyle;
  headerTextGroup: ViewStyle;
  headerTitleRow: ViewStyle;
  welcomeText: TextStyle;
  subHeaderText: TextStyle;
  headerAvatar: ImageStyle;
  searchFrame: ViewStyle;
  searchItem: ViewStyle;
  searchLabel: TextStyle;
  scrollContent: ViewStyle;
  sectionHeading: TextStyle;
  pubCard: ViewStyle;
  imageWrapper: ViewStyle;
  cardImage: ImageStyle;
  imageOverlay: ViewStyle;
  cardContentFrame: ViewStyle;
  contentInner: ViewStyle;
  badgeRow: ViewStyle;
  blueBadge: ViewStyle;
  blueBadgeText: TextStyle;
  pinkBadge: ViewStyle;
  pinkBadgeText: TextStyle;
  textGroup: ViewStyle;
  pubTitle: TextStyle;
  pubDesc: TextStyle;
  authorRow: ViewStyle;
  authorAvatar: ImageStyle;
  authorMeta: ViewStyle;
  authorName: TextStyle;
  metaFrame: ViewStyle;
  metaSubRow: ViewStyle;
  metaRowInner: ViewStyle;
  metaText: TextStyle;
  metaDot: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    width: 375,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  headerFrame: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    gap: 12,
    width: 374,
    height: 84,
    marginTop: 20,
  },
  headerTextGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 8,
    width: 302,
    height: 52,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: 4,
    width: 302,
    height: 24,
  },
  welcomeText: {
    width: 190,
    height: 24,
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: -0.48,
    color: "#242424",
  },
  subHeaderText: {
    width: 302,
    height: 20,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#4E5D69",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderWidth: 1.42857,
    borderColor: "#F6FAFD",
    borderRadius: 285.714,
  },
  searchFrame: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 16,
    gap: 10,
    width: 375,
    height: 72,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
    width: 343,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    borderRadius: 8,
  },
  searchLabel: {
    width: 130,
    height: 20,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#717680",
  },
  scrollContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 16,
    gap: 21,
    width: 375,
  },
  sectionHeading: {
    width: 257,
    height: 28,
    fontFamily: "Manrope_700Bold",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.2,
    color: "#242424",
  },
  pubCard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 14,
    width: 343,
    height: 333,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.8,
    borderColor: "#D9E5F2",
    borderRadius: 8,
  },
  imageWrapper: {
    width: 319,
    height: 169,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: 319,
    height: 169,
    borderRadius: 8,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.24)",
    borderRadius: 8,
  },
  cardContentFrame: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 12,
    width: 319,
    height: 126,
  },
  contentInner: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 10,
    width: 319,
    height: 82,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: 6,
    width: 116,
    height: 16,
  },
  blueBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: 53,
    height: 16,
    backgroundColor: "#F0F9FF",
    borderRadius: 16,
  },
  blueBadgeText: {
    width: 27,
    height: 9,
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    lineHeight: 9,
    textAlign: "center",
    color: "#026AA2",
  },
  pinkBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: 57,
    height: 16,
    backgroundColor: "#FDF2FA",
    borderRadius: 16,
  },
  pinkBadgeText: {
    width: 37,
    height: 9,
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    lineHeight: 9,
    textAlign: "center",
    color: "#C11574",
  },
  textGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 2,
    width: 319,
    height: 56,
  },
  pubTitle: {
    width: 299.16,
    height: 20,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    color: "#242424",
  },
  pubDesc: {
    width: 319,
    height: 34,
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    lineHeight: 17,
    color: "#4E5D69",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: 8,
    width: 319,
    height: 32,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 228.571,
  },
  authorMeta: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 4,
    width: 213.5,
    height: 32,
  },
  authorName: {
    width: 213.5,
    height: 16,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    lineHeight: 16,
    color: "#242424",
  },
  metaFrame: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    width: 213.5,
    height: 12,
  },
  metaSubRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 0,
    gap: 12,
    width: 213.5,
    height: 12,
  },
  metaRowInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: 4,
    width: 44,
    height: 12,
  },
  metaText: {
    width: 67,
    height: 12,
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    lineHeight: 12,
    color: "#4E5D69",
  },
  metaDot: {
    width: 6,
    height: 6,
    backgroundColor: "#4E5D69",
    borderRadius: 3,
  },
});
