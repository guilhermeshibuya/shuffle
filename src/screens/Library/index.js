import { Image, Pressable, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";

export default function LibraryScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);

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

  const getPlaylists = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getUserPlaylists(userProfile?.id)
      .then((data) => {
        setPlaylists(data.body.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
    getPlaylists();
  }, []);

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={[styles.container, { paddingBottom: 100 }]}
    >
      <ScrollView>
        <Title text="biblioteca" />
        {playlists?.map((playlist, index) => {
          return (
            <Pressable
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
              onPress={() => {
                navigation.navigate("Info", {
                  item: {
                    id: playlist?.id,
                    name: playlist?.name,
                    artists: playlist?.owner?.display_name,
                    albumCoverImgUrl: playlist?.images[0]?.url,
                    albumUrl: playlist?.uri,
                    isPlaylist: true,
                  },
                });
              }}
            >
              <View style={{ borderRadius: 8 }}>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                  source={{ uri: playlist?.images[0]?.url }}
                ></Image>
              </View>
              <View>
                <Text style={styles.playlistName}>{playlist?.name}</Text>
                <Text style={styles.owner}>
                  {playlist?.owner?.display_name}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}
