import { Image, ImageBackground, Text, View } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";
import ButtonLink from "../../components/ButtonLink";
import { useFonts, NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";

export default function LoginOptionsScreen() {
  const [fontLoaded] = useFonts({
    NotoSans_600SemiBold,
  });

  if (!fontLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/images/clip2.gif")}
        style={styles.image}
      >
        <View style={styles.container}>
          <Image source={require("../../../assets/images/shuffle.png")} />
          <Text style={styles.text}>
            conecte-se e deixe a música te levar
            </Text>
          <Button primary title="Inscreva-se" />
          <Button title="Continuar com google" />
          <ButtonLink title="Entrar" />
        </View>
      </ImageBackground>
    </View>
  );
}
