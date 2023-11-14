import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import MusicCard from "../../components/MusicCard";
import styles from "./styles";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import ArtistCard from "../../components/ArtistCard";
import { LinearGradient } from "expo-linear-gradient";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderLogo from "../../components/HeaderLogo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";

export default function HomeScreen({ navigation }) {
  const [recommendations, setRecommendations] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [newReleases, setNewReleases] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);

  const getTracks = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const spotifyApi = new SpotifyWebApi({
        accessToken: accessToken,
        clientId: "635cb84ecc27482ea1d559e98461c89f",
      });

      const data = await spotifyApi.getMyTopArtists({ limit: 3 });
      const topArtists = data.body.items.map((artist) => artist.id);

      const recommendationsData = await spotifyApi.getRecommendations({
        min_energy: 0.6,
        seed_artists: topArtists,
        min_popularity: 50,
        limit: 12,
      });

      const tracks = recommendationsData.body.tracks;
      const recommendations = tracks.map(
        ({ id, name, artists, album, duration_ms, preview_url }) => ({
          id,
          name,
          artists: artists.map((artist) => artist.name),
          albumCoverImgUrl: album.images[0].url,
          duration: duration_ms / 1000,
          preview_url,
        })
      );

      setRecommendations(recommendations);
    } catch (err) {
      console.log("Error in getTracks: ", err);
    }
  };

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 12,
      })
      .then((data) => {
        const recentlyTracks = data.body.items.map(({ track }) => {
          const { id, name, artists, album, duration_ms, preview_url } = track;
          return {
            id,
            name,
            artists: artists.map((artist) => artist.name),
            albumCoverImgUrl: album.images[0].url,
            duration: duration_ms / 1000,
            preview_url,
          };
        });
        setRecentlyPlayed(recentlyTracks);
      })
      .catch((err) => console.log(err));
  };

  const getArtists = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getMyTopArtists({ limit: 8 })
      .then((data) => {
        const artists = data.body.items;
        const topArtists = artists.map(({ id, name, images }) => ({
          id,
          name,
          imageUrl: images[0].url,
        }));
        setTopArtists(topArtists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNewReleases = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getNewReleases({ limit: 10 })
      .then((data) => {
        const newAlbums = data.body.albums.items.map(
          ({ id, name, artists, images }) => ({
            id,
            name,
            artists: artists.map((artist) => artist.name),
            albumCoverImgUrl: images[0].url,
          })
        );
        setNewReleases(newAlbums);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFeaturedPlaylists = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });
    const currentDate = new Date();
    const isoTimeStamp = currentDate.toISOString();

    spotifyApi
      .getFeaturedPlaylists({ limit: 10, timestamp: isoTimeStamp })
      .then((data) => {
        const playlists = data.body.playlists.items.map(
          ({ id, name, owner, images }) => ({
            id,
            name,
            artists: owner.display_name,
            albumCoverImgUrl: images[0].url,
          })
        );
        setFeaturedPlaylists(playlists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getTracks();
    getArtists();
    getRecentlyPlayedSongs();
    getNewReleases();
    getFeaturedPlaylists();
  }, []);

  const renderMusic = ({ item }) => (
    <MusicCard
      title={item?.name}
      artist={item?.artists}
      albumCoverImgUrl={item?.albumCoverImgUrl}
    />
  );

  const renderArtist = ({ item }) => (
    <ArtistCard artistName={item?.name} imageUrl={item?.imageUrl} />
  );

  if (
    !recommendations ||
    !topArtists ||
    !recentlyPlayed ||
    !newReleases ||
    !featuredPlaylists
  )
    return <View></View>;

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={[styles.container, { paddingBottom: 100 }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <View style={{ marginBottom: 40 }}>
          <HeaderLogo />
        </View>

        <Pressable
          onPress={() => navigation.navigate("Liked")}
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 40,
          }}
        >
          <LinearGradient
            colors={["#432bba", "#6e57e0"]}
            style={{
              padding: 12,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          >
            <MaterialIcons name="favorite" color={colors.c1} size={40} />
          </LinearGradient>
          <View style={styles.likedSongs}>
            <Text
              style={{
                fontSize: 20,
                color: colors.c1,
              }}
            >
              Músicas curtidas
            </Text>
          </View>
        </Pressable>

        <View>
          <Subtitle text="descubra novos ritmos" />
          <Title style={{ marginBottom: 16 }} text="músicas" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          style={{ marginBottom: 40 }}
        >
          <FlatList
            data={recommendations}
            renderItem={renderMusic}
            keyExtractor={(item) => item.id}
            numColumns={recommendations?.length / 2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ rowGap: 24 }}
            columnWrapperStyle={{ columnGap: 24 }}
          />
        </ScrollView>

        <View>
          <Subtitle text="reviva a melodia" />
          <Title style={{ marginBottom: 16 }} text="ouça novamente" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          style={{ marginBottom: 40 }}
        >
          <FlatList
            data={recentlyPlayed}
            renderItem={renderMusic}
            keyExtractor={(item) => item.id}
            numColumns={6}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ rowGap: 24 }}
            columnWrapperStyle={{ columnGap: 24 }}
          />
        </ScrollView>

        <View>
          <Subtitle text="os mais populares" />
          <Title style={{ marginBottom: 16 }} text="seus artistas" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          style={{ marginBottom: 40 }}
        >
          <FlatList
            data={topArtists}
            renderItem={renderArtist}
            keyExtractor={(item) => item.id}
            numColumns={8}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={{ columnGap: 24 }}
          />
        </ScrollView>

        <View style={{ marginBottom: 24 }}>
          <Subtitle text="hits novos que estão agitando o mundo" />
          <Title style={{ marginBottom: 16 }} text="lançamentos" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          style={{ marginBottom: 40 }}
        >
          <FlatList
            data={newReleases}
            renderItem={renderMusic}
            keyExtractor={(item) => item.id}
            numColumns={newReleases?.length}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ rowGap: 24 }}
            columnWrapperStyle={{ columnGap: 24 }}
          />
        </ScrollView>

        <View style={{ marginBottom: 24 }}>
          <Subtitle text="playlists compartilhadas, emoções comuns" />
          <Title style={{ marginBottom: 16 }} text="em destaque" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
          style={{ marginBottom: 40 }}
        >
          <FlatList
            data={featuredPlaylists}
            renderItem={renderMusic}
            keyExtractor={(item) => item.id}
            numColumns={newReleases?.length}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ rowGap: 24 }}
            columnWrapperStyle={{ columnGap: 24 }}
          />
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
}
