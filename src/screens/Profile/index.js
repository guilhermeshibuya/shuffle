import { Image, View, Text, Pressable } from "react-native";
import styles from "./styles";
import Navbar from "../../components/Navbar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpotifyWebApi from "spotify-web-api-node";
import { LinearGradient } from "expo-linear-gradient";

const accessToken = AsyncStorage.getItem("token");

const spotifyApi = new SpotifyWebApi({
  accessToken: accessToken,
  clientId: "635cb84ecc27482ea1d559e98461c89f",
});

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState();

  const getProfile = async () => {
    const accessToken = AsyncStorage.getItem("token");
    try {
      spotifyApi
        .searchTracks("artist:BTS")
        .then((data) => console.log(data.body))
        .catch((err) => console.log(err));
      // const response = await fetch("https://api.spotify.com/v1/me", {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
      // const data = await response.json();
      // setUserProfile(data);
      // console.log(data);
      // return data;
    } catch (err) {
      console.log(err);
    }
    // spotifyApi
    //   .getMe()
    //   .then((data) => console.log(data.body))
    //   .catch((err) => console.log("DEU RUIM", err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={styles.container}
    >
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.profilePicContainer}
          source={require("../../../assets/images/bg-intro.jpg")}
        />
        <Text style={styles.userName}>Guilherme Shibuya</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.optionsContainer}>
        <MaterialIcons name="person" color={colors.p2} size={32} />
        <Text
          style={styles.optionsText}
          onPress={() => navigation.navigate("Manage Account")}
        >
          gerenciar conta
        </Text>
      </View>
      <View style={styles.separator}></View>
      <Button title={"Sair"} alert={true} />
    </LinearGradient>
  );
}
