import { FlatList, ScrollView, View } from "react-native";
import MusicCard from "../../components/MusicCard";
import styles from "./styles";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import ArtistCard from "../../components/ArtistCard";
import { LinearGradient } from "expo-linear-gradient";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [recommendations, setRecommendations] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  const getTracks = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    spotifyApi
      .getMyTopArtists({ limit: 3 })
      .then((data) => {
        const topArtists = data.body.items.map((artist) => artist.id);

        spotifyApi
          .getRecommendations({
            min_energy: 0.4,
            seed_artists: topArtists,
            min_popularity: 50,
            limit: 12,
          })
          .then((data) => {
            const tracks = data.body.tracks;
            const recommendations = tracks.map(
              ({ id, name, artists, album }) => ({
                id,
                name,
                artists: artists.map((artist) => artist.name),
                albumCoverImgUrl: album.images[0].url,
              })
            );
            setRecommendations(recommendations);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
          const { id, name, artists, album } = track;
          return {
            id,
            name,
            artists: artists.map((artist) => artist.name),
            albumCoverImgUrl: album.images[0].url,
          };
        });
        setRecentlyPlayed(recentlyTracks);
      });
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

  useEffect(() => {
    getTracks();
    getArtists();
    getRecentlyPlayedSongs();
  }, []);

  const renderMusic = ({ item }) => (
    <MusicCard
      title={item.name}
      artist={item.artists}
      albumCoverImgUrl={item.albumCoverImgUrl}
    />
  );

  const renderArtist = ({ item }) => (
    <ArtistCard artistName={item.name} imageUrl={item.imageUrl} />
  );

  if (!recommendations) return <View></View>;

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 24 }}>
          <Subtitle text="descubra novos ritmos" />
          <Title style={{ marginBottom: 16 }} text="músicas" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
          style={{ marginBottom: 40 }}
        >
          <FlatList
            data={recommendations}
            renderItem={renderMusic}
            keyExtractor={(item) => item.id}
            numColumns={6}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ rowGap: 24 }}
            columnWrapperStyle={{ columnGap: 24 }}
          />
        </ScrollView>

        <View style={{ marginTop: 24 }}>
          <Subtitle text="reviva a melodia" />
          <Title style={{ marginBottom: 16 }} text="ouça novamente" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
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
          <Title style={{ marginBottom: 16 }} text="artistas" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
          style={{ marginBottom: 108 }}
        >
          <FlatList
            style={{ paddingBottom: 24 }}
            data={topArtists}
            renderItem={renderArtist}
            keyExtractor={(item) => item.id}
            numColumns={8}
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
