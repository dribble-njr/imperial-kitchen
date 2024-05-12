import { StyleSheet } from "react-native";

import { HelloWave } from "../HelloWave";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const Header = () => {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome To 独家御膳房！</ThemedText>
        <HelloWave />
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Header;
