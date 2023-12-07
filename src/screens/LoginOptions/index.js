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

  function generateRandomState(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let state = "";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      state += characters[index];
    }
    return state;
  }

  const redirectUri = Linking.createURL("spotify-auth-callback");
  const clientId = "635cb84ecc27482ea1d559e98461c89f";
  const scopes = [
    "user-read-email",
    "user-library-read",
    "user-library-modify",
    "user-read-private",
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

  const responseType = "token";
  const state = generateRandomState(16);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      responseType: responseType,
      clientId: clientId,
      scopes: scopes,
      redirectUri: redirectUri,
      state: state,
    },
    discovery
  );

  const authenticate = async () => {
    await promptAsync();

    if (response?.type === "success") {
      const { authentication } = response;
      let expirationDate = Date.now();

      expirationDate = expirationDate + authentication.expiresIn * 1000;

      try {
        await AsyncStorage.setItem("token", authentication.accessToken);
        await AsyncStorage.setItem("expirationDate", expirationDate.toString());

        navigation.replace("HomeTab");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!fontLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.c12,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <View style={styles.container}>
        <Image source={require("../../../assets/images/shuffle.png")} />
        <Text style={styles.text}>conecte-se e deixe a música te levar</Text>
        <Button
          primary
          onPress={() => authenticate()}
          title="Continuar com Spotify"
        />
      </View>
    </View>
  );
}
