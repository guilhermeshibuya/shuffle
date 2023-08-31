import { ImageBackground, Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import styles from "./styles";

export default function InitialScreen() {
  const [fontLoaded] = useFonts({
    NotoSans_400Regular,
  });

  if (!fontLoaded) return null;

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-intro.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/shuffle.png")}
          style={{ marginBottom: 12 }}
        />
        <Text style={[styles.text, { marginBottom: 40 }]}>
          Envolva-se em notas vibrantes de uma experiência sonora única
        </Text>
        <Button title={"Começar"} />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
