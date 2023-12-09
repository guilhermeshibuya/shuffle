import { Image, View, Text, Pressable } from "react-native";
import styles from "./styles";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpotifyWebApi from "spotify-web-api-node";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("expirationDate");

    navigation.replace("Login");
  };

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getMe()
      .then((data) => {
        setUserProfile(data.body);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!userProfile)
    return (
      <View style={{ paddingTop: 24, paddingHorizontal: 24 }}>
        <Button onPress={() => handleLogout()} title={"Sair"} alert={true} />
      </View>
    );

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={styles.container}
    >
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.profilePicContainer}
          source={{ uri: userProfile?.images[0].url }}
        />
        <Text style={styles.userName}>{userProfile?.display_name}</Text>
      </View>
      <View style={styles.separator}></View>
      <Button onPress={() => handleLogout()} title={"Sair"} alert={true} />
    </LinearGradient>
  );
}
