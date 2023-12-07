import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpotifyWebApi from "spotify-web-api-node";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";

export default function SongInfoScreen({ navigation }) {
  const route = useRoute();
  const albumUrl = route?.params?.item?.albumUrl;
  const artists = route?.params?.item?.artists;
  const isPlaylist = route?.params?.item?.isPlaylist;
  const artistNames = Array.isArray(artists) ? artists.join(", ") : artists;
  const albumId = albumUrl.split(":")[2];
  const [tracks, setTracks] = useState([]);

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

    const songIndex = tracks.findIndex((s) => s.id === song.id);

    if (songIndex) {
      const updatedList = [...tracks];

      updatedList[songIndex] = {
        ...tracks[songIndex],
        isFavorite: !tracks[songIndex].isFavorite,
      };
      setTracks(updatedList);
    }
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");
        const spotifyApi = new SpotifyWebApi({
          accessToken: accessToken,
          clientId: "635cb84ecc27482ea1d559e98461c89f",
        });

        const albumTracks = await spotifyApi
          .getAlbumTracks(albumId)
          .then((data) => {
            return data.body.items;
          });

        const albumTracksId = albumTracks.map((track) => track.id);

        const albumTracksInFavorite = await spotifyApi.containsMySavedTracks(
          albumTracksId
        );

        const updatedList = albumTracks.map((track, index) => ({
          ...track,
          isFavorite: albumTracksInFavorite.body[index],
        }));

        setTracks(updatedList);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPlaylistSongs = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${albumId}/tracks?limit=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao obter as músicas");
        }

        const data = await response.json();
        const tracks = data.items.map((item) => item.track);
        setTracks(tracks);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isPlaylist) {
      fetchSongs();
    } else {
      fetchPlaylistSongs();
    }
  }, []);

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={[styles.container, { paddingBottom: 100 }]}
    >
      <MaterialIcons
        name="arrow-back"
        color={colors.c1}
        size={36}
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 16 }}
      />

      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            borderRadius: 16,
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <Image
            style={{
              width: 300,
              height: 300,
              borderRadius: 16,
              marginBottom: 16,
            }}
            source={{ uri: route?.params?.item?.albumCoverImgUrl }}
          />

          <Text style={[styles.musicName, { fontSize: 18 }]}>
            {route?.params?.item?.name}
          </Text>
          <Text style={styles.artist}>{artistNames}</Text>
        </View>
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
          <MaterialIcons name="play-arrow" size={32} />
        </Pressable>

        <View>
          <View>
            {tracks?.map((track, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    marginBottom: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ maxWidth: "85%" }}>
                    <Text style={styles.musicName}>{track?.name}</Text>
                    <Text style={styles.artist}>
                      {Array.isArray(track?.artists)
                        ? track?.artists?.map((item) => item.name).join(", ")
                        : track?.artists?.name}
                    </Text>
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
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
