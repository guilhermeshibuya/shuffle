import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import SpotifyWebApi from "spotify-web-api-node";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MusicListItem from "../../components/MusicListItem";
import { Player } from "../../../PlayerContext";
import { BottomModal, ModalContent } from "react-native-modals";
import { Audio } from "expo-av";

export default function LikedSongsScreen({ navigation }) {
  const [likedSongs, setLikedSongs] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const value = useRef(0);

  const { currentSong, setCurrentSong } = useContext(Player);

  const truncateText = (text, maxChars) => {
    if (text?.length > maxChars) {
      return text.substring(0, maxChars) + "...";
    }
    return text;
  };

  const getLikedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getMySavedTracks({
        limit: 20,
      })
      .then((data) => {
        const tracks = data.body.items.map(({ track }) => {
          const { id, name, artists, album, duration_ms, preview_url } = track;
          return {
            id,
            name,
            artists: artists.map((artist) => artist.name),
            albumCoverImgUrl: album.images[0].url,
            duration: duration_ms / 1000,
            preview_url,
            isFavorite: true,
          };
        });
        setLikedSongs(tracks);
      })
      .catch((err) => console.error(err));
  };

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

    const songId = likedSongs.findIndex((s) => s.id === song.id);

    if (songId) {
      const updatedLikedSongs = [...likedSongs];

      updatedLikedSongs[songId] = {
        ...likedSongs[songId],
        isFavorite: !likedSongs[songId].isFavorite,
      };

      setLikedSongs(updatedLikedSongs);
    }
  };

  const renderMusic = useCallback(
    ({ item }) => (
      <MusicListItem
        title={item.name}
        artist={item.artists}
        albumCoverImgUrl={item.albumCoverImgUrl}
        duration={item.duration}
        onPress={play}
        isPlaying={item === currentSong}
        item={item}
        handleFavoritePress={handleFavoritePress}
      />
    ),
    [likedSongs, currentSound, currentSong, isPlaying]
  );

  useEffect(() => {
    getLikedSongs();
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playSong = async () => {
    value.current = 0;
    if (likedSongs.length > 0) {
      setCurrentSong(likedSongs[0]);
    }

    await play(likedSongs[0]);
  };

  const play = async (nextSong) => {
    const preview_url = nextSong?.preview_url;

    if (!preview_url) {
      Alert.alert("Erro", "Música indisponível 😥. Lamentamos pelo ocorrido", [
        {
          text: "OK",
          onPress: () => playNextSong(),
        },
      ]);
    } else {
      try {
        if (currentSong) {
          await currentSound.stopAsync();
        }
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
        });

        const { sound, status } = await Audio.Sound.createAsync(
          {
            uri: preview_url,
          },
          {
            shouldPlay: true,
            isLooping: false,
          },
          onPlaybackStatusUpdate
        );
        onPlaybackStatusUpdate(status);
        setCurrentSound(sound);
        setIsPlaying(status.isLoaded);
        await sound.playAsync();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded && status.isPlaying) {
      const progress = status.positionMillis / status.durationMillis;
      setProgress(progress);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }

    if (status.didJustFinish === true) {
      setCurrentSong(null);
      playNextSong();
    }
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextSong = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (value.current < likedSongs.length) {
      const nextSong = likedSongs[value.current];
      setCurrentSong(nextSong);

      await play(nextSong);
    } else {
      console.log("Fim da playlist");
    }
  };

  const playPreviousSong = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -= 1;
    if (value.current < 0) {
      console.log("Início da playlist");
    } else {
      const prevSong = likedSongs[value.current];
      setCurrentSong(prevSong);

      await play(prevSong);
    }
  };

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
                <MaterialIcons name="play-arrow" size={32} />
              </Pressable>
            </>
          }
        />
      </LinearGradient>

      {currentSong && (
        <Pressable
          onPress={() => setIsModalVisible(!isModalVisible)}
          style={{
            width: "90%",
            borderRadius: 16,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 16,
            position: "absolute",
            left: 20,
            bottom: 100,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: 12,
              borderRadius: 16,
            }}
            colors={[colors.p2, colors.p3, "#482ABF"]}
            locations={[0.2, 0.4, 1]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Image
                style={{ width: 48, height: 48, borderRadius: 8 }}
                source={{ uri: currentSong?.albumCoverImgUrl }}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: colors.c1,
                  fontFamily: "NotoSans_600SemiBold",
                }}
              >
                {truncateText(
                  currentSong?.name + " · " + currentSong?.artists[0],
                  30
                )}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="favorite" size={24} color={colors.p6} />
              <Pressable>
                <MaterialIcons
                  name="pause-circle-filled"
                  size={24}
                  color={colors.p6}
                />
              </Pressable>
            </View>
          </LinearGradient>
        </Pressable>
      )}

      <BottomModal
        visible={isModalVisible}
        onHardwareBackPress={() => setIsModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={100}
      >
        <LinearGradient colors={[colors.c10, colors.c11]}>
          <ModalContent style={{ height: "100%", width: "100%" }}>
            <View
              style={{
                height: "100%",
                width: "100%",
                alignContent: "center",
                paddingTop: 24,
              }}
            >
              <Pressable
                style={{ marginBottom: 32 }}
                onPress={() => setIsModalVisible(false)}
              >
                <MaterialIcons
                  name="keyboard-arrow-down"
                  color={colors.c2}
                  size={36}
                />
              </Pressable>
              <View style={{ elevation: 10 }}>
                {currentSong?.albumCoverImgUrl ? (
                  <Image
                    source={{ uri: currentSong?.albumCoverImgUrl }}
                    style={{
                      width: "100%",
                      height: Dimensions.get("window").width - 48,
                      borderRadius: Dimensions.get("window").width / 2,
                      marginBottom: 40,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.c1,
                      width: "100%",
                      height: Dimensions.get("window").width - 48,
                      borderRadius: Dimensions.get("window").width / 2,
                      marginBottom: 40,
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: "auto",
                  marginBottom: 32,
                }}
              >
                <Pressable>
                  <MaterialIcons name="more-vert" color={colors.c2} size={36} />
                </Pressable>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: colors.c1,
                      fontSize: 20,
                      fontFamily: "NotoSans_600SemiBold",
                    }}
                  >
                    {truncateText(currentSong?.name, 20)}
                  </Text>
                  <Text
                    style={{
                      color: colors.c5,
                      fontSize: 16,
                      fontFamily: "NotoSans_400Regular",
                    }}
                  >
                    {Array.isArray(currentSong?.artists)
                      ? currentSong?.artists.join(", ")
                      : currentSong?.artists}
                  </Text>
                </View>
                <Pressable>
                  <MaterialIcons name="favorite" color={colors.p2} size={36} />
                </Pressable>
              </View>
              <View style={styles.progressBarBack}>
                <View
                  style={[styles.progressBar, { width: `${progress * 100}%` }]}
                />
                <View
                  style={{
                    position: "absolute",
                    top: -4,
                    width: 11,
                    height: 11,
                    borderRadius: 11 / 2,
                    backgroundColor: colors.c1,
                    left: `${progress * 100}%`,
                    marginLeft: -11 / 2,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text style={{ color: colors.c5, fontSize: 12 }}>
                  {formatTime(currentTime)}
                </Text>
                <Text style={{ color: colors.c5, fontSize: 12 }}>
                  {formatTime(totalDuration)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Pressable>
                  <MaterialIcons name="shuffle" color={colors.c2} size={24} />
                </Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 24,
                  }}
                >
                  <Pressable onPress={playPreviousSong}>
                    <MaterialIcons
                      name="skip-previous"
                      color={colors.c1}
                      size={48}
                    />
                  </Pressable>
                  <Pressable onPress={handlePlayPause}>
                    {isPlaying ? (
                      <MaterialIcons name="pause" color={colors.c1} size={64} />
                    ) : (
                      <MaterialIcons
                        name="play-arrow"
                        color={colors.c1}
                        size={64}
                      />
                    )}
                  </Pressable>
                  <Pressable onPress={playNextSong}>
                    <MaterialIcons
                      name="skip-next"
                      color={colors.c1}
                      size={48}
                    />
                  </Pressable>
                </View>
                <Pressable>
                  <MaterialIcons name="repeat" color={colors.c2} size={24} />
                </Pressable>
              </View>
            </View>
          </ModalContent>
        </LinearGradient>
      </BottomModal>
    </>
  );
}
