import { ImageBackground, Image, Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "../styles/index";
import Button from "../components/Button/Button";

export default function StartScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/bg-intro.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/shuffle.png")}
          style={{ marginBottom: 12 }}
        />
        <Text style={[styles.text, { marginBottom: 40 }]}>
          Envolva-se em notas vibrantes de uma experiência sonora única.
        </Text>
        <Button />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 24,
    marginBottom: 72,
  },
  image: {
    flex: 1,
  },
  text: {
    color: colors.w,
    textAlign: "left",
    fontSize: 32,
    fontWeight: "600",
  },
});
