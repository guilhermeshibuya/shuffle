import { Image, ImageBackground, Text, View } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";
import ButtonLink from "../../components/ButtonLink";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { colors } from "../../styles";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import * as Linking from "expo-linking";

export default function LoginOptionsScreen({ navigation }) {
  const [fontLoaded] = useFonts({
    NotoSans_400Regular,
  });

  const redirectUri = Linking.createURL("spotify-auth-callback");

  const clientId = "635cb84ecc27482ea1d559e98461c89f";
  const scopes = [
    "user-read-email",
    "user-library-read",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
  ];
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      responseType: "token",
      clientId,
      scopes,
      redirectUri,
    },
    discovery
  );

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");

      if (accessToken && expirationDate) {
        const currentDate = Date.now();

        if (currentDate < parseInt(expirationDate)) {
          navigation.replace("HomeTab");
        } else {
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    };

    checkTokenValidity();
  }, []);

  const authenticate = async () => {
    await promptAsync();

    if (response?.type === "success") {
      const { authentication } = response;

      console.log(authentication);
      let expirationDate = Date.now();
      expirationDate = expirationDate + authentication.expiresIn * 1000;
      console.log(expirationDate);
      console.log(Date.now());
      AsyncStorage.setItem("token", authentication.accessToken);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());
      navigation.replace("HomeTab");
    }
  };

  if (!fontLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.c12 }}>
      <View style={styles.container}>
        <Image source={require("../../../assets/images/shuffle.png")} />
        <Text style={styles.text}>conecte-se e deixe a música te levar</Text>
        <Button primary title="Inscreva-se" />
        <Button onPress={() => authenticate()} title="Continuar com Spotify" />
        <ButtonLink title="Entrar" />
      </View>
    </View>
  );
}
