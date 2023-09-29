import { Image, ImageBackground, Text, View } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";
import ButtonLink from "../../components/ButtonLink";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { colors } from "../../styles";

export default function LoginOptionsScreen() {
  const [fontLoaded] = useFonts({
    NotoSans_400Regular,
  });

  if (!fontLoaded) return null;

  const authenticate = async () => {

  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.c12 }}>
      <View style={styles.container}>
        <Image source={require("../../../assets/images/shuffle.png")} />
        <Text style={styles.text}>conecte-se e deixe a música te levar</Text>
        <Button primary title="Inscreva-se" />
        <Button onPress={authenticate} title="Continuar com Spotify" />
        <ButtonLink title="Entrar" />
      </View>
    </View>
  );
}
