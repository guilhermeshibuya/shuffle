import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import SpotifyWebApi from "spotify-web-api-node";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export default function ArtistInfoScreen({ navigation }) {
  const route = useRoute();
  const imageUrl = route?.params?.item?.imageUrl;
  const name = route?.params?.item?.name;
  const id = route?.params?.item?.id;

  const [artistTopTracks, setArtistTopTracks] = useState();

  const handleFavoritePress = async (song) => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    if (song.isFavorite) {
      spotifyApi
        .removeFromMySavedTracks([song.id])
        .then(() => {
          console.log("Removido dos favoritos");
        })
        .catch((err) => console.log(err));
    } else {
      spotifyApi
        .addToMySavedTracks([song.id])
        .then(() => {
          console.log("Adicionado aos favoritos");
        })
        .catch((err) => console.log(err));
    }

    const songIndex = artistTopTracks.findIndex((s) => s.id === song.id);

    if (songIndex) {
      const updatedList = [...artistTopTracks];

      updatedList[songIndex] = {
        ...artistTopTracks[songIndex],
        isFavorite: !artistTopTracks[songIndex].isFavorite,
      };
      setArtistTopTracks(updatedList);
    }
  };

  const getTopTracks = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    const topTracks = await spotifyApi
      .getArtistTopTracks(id, "br")
      .then((data) => {
        return data.body.tracks;
      })
      .catch((err) => console.log(err));

    const tracksId = topTracks.map((track) => track.id);

    const tracksInFavorite = await spotifyApi.containsMySavedTracks(tracksId);

    const updatedList = topTracks.map((track, index) => ({
      ...track,
      isFavorite: tracksInFavorite.body[index],
    }));

    setArtistTopTracks(updatedList);
  };

  useEffect(() => {
    getTopTracks();
  }, []);

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={[styles.container, { paddingBottom: 100 }]}
    >
      <ScrollView>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: 300,
            position: "relative",
            marginBottom: 24,
          }}
        >
          <MaterialIcons
            name="arrow-back"
            color={colors.c1}
            size={36}
            onPress={() => navigation.goBack()}
            style={{
              marginBottom: 16,
              position: "absolute",
              marginTop: StatusBar.currentHeight + 24,
              marginLeft: 24,
            }}
          />
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}></View>
        </ImageBackground>
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Text style={styles.artistNameTitle}>{name}</Text>
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.c1,
              fontFamily: "NotoSans_600SemiBold",
              marginBottom: 24,
            }}
          >
            Top Músicas
          </Text>
          {artistTopTracks?.map((track, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  marginBottom: 24,
                  flexDirection: "row",
                  gap: 12,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <View style={{ borderRadius: 8 }}>
                    <Image
                      style={{ borderRadius: 8, width: 64, height: 64 }}
                      source={{ uri: track?.album?.images[2]?.url }}
                    />
                  </View>
                  <View style={{ maxWidth: "65%" }}>
                    <Text style={styles.musicName}>{track?.name}</Text>
                    <Text style={styles.artist}>
                      {Array.isArray(track?.artists)
                        ? track?.artists?.map((item) => item.name).join(", ")
                        : track?.artists?.name}
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => handleFavoritePress(track)}>
                  {track?.isFavorite ? (
                    <MaterialIcons
                      name="favorite"
                      color={colors.p2}
                      size={32}
                    />
                  ) : (
                    <MaterialIcons
                      name="favorite-outline"
                      color={colors.p2}
                      size={32}
                    />
                  )}
                </Pressable>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
