import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import SpotifyWebApi from "spotify-web-api-node";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MusicListItem from "../../components/MusicListItem";
import { Player } from "../../../PlayerContext";

export default function LikedSongsScreen({ navigation }) {
  const [likedSongs, setLikedSongs] = useState(null);
  const { currentSong, setCurrentSong } = useContext(Player);

  const getLikedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getMySavedTracks({
        limit: 50,
      })
      .then((data) => {
        const tracks = data.body.items.map(({ track }) => {
          const { id, name, artists, album, duration_ms } = track;
          return {
            id,
            name,
            artists: artists.map((artist) => artist.name),
            albumCoverImgUrl: album.images[0].url,
            duration: duration_ms / 1000,
          };
        });
        setLikedSongs(tracks);
      })
      .catch((err) => console.error(err));
  };

  const renderMusic = ({ item }) => (
    <MusicListItem
      title={item.name}
      artist={item.artists}
      albumCoverImgUrl={item.albumCoverImgUrl}
      duration={item.duration}
    />
  );

  useEffect(() => {
    getLikedSongs();
  }, []);

  const playSong = async () => {
    if (likedSongs.length > 0) {
      setCurrentSong(likedSongs[0]);
    }

    await play(likedSongs[0]);
  };

  const play = async () => {};

  return (
    <>
      <LinearGradient
        colors={["#222222", "#111111"]}
        locations={[0.22, 1]}
        style={[styles.container, { paddingBottom: 100 }]}
      >
        <FlatList
          data={likedSongs}
          renderItem={renderMusic}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ rowGap: 24 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <MaterialIcons
                name="arrow-back"
                color={colors.c1}
                size={36}
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 16 }}
              />
              <Subtitle text="melodias que encantam você" />
              <Title text="músicas curtidas" />
              <Pressable
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.p2,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: 32,
                }}
                onPress={() => playSong()}
              >
                <MaterialIcons name="play-arrow" size={30} />
              </Pressable>
            </>
          }
        />
      </LinearGradient>

      {currentSong && (
        <Pressable>
          <View>
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: currentSong?.albumCoverImgUrl }}
            ></Image>
            <Text style={{ color: "#ffffff" }}>
              {currentSong?.name} {currentSong?.artists}
            </Text>
          </View>
        </Pressable>
      )}
    </>
  );
}
