import { StyleSheet, View } from "react-native";

export const DecorativeLine = () => (
  <View style={styles.container}>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 4,
    gap: 10,
    width: 142.24,
    height: 8,
    zIndex: 2,
  },
  line: {
    width: 142.24,
    height: 0,
    borderWidth: 2.18,
    borderStyle: "solid",
  },
});
