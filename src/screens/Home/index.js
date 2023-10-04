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

  const getTracks = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    let topArtists = [];
    spotifyApi
      .getMyTopArtists({ limit: 3 })
      .then((data) => {
        data.body.items.forEach((artist) => topArtists.push(artist.id));

        spotifyApi
          .getRecommendations({
            min_energy: 0.4,
            seed_artists: topArtists,
            min_popularity: 50,
            limit: 12,
          })
          .then((data) => {
            const tracks = data.body.tracks;
            let recommendations = [];

            tracks.forEach((track) => {
              const id = track.id;
              const name = track.name;
              const artists = track.artists.map((artist) => artist.name);
              const albumCoverImgUrl = track.album.images[0].url;
              recommendations.push({
                id: id,
                name: name,
                artists: artists,
                albumCoverImgUrl: albumCoverImgUrl,
              });
            });
            setRecommendations(recommendations);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArtists = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken,
      clientId: "635cb84ecc27482ea1d559e98461c89f",
    });

    let topArtists = [];
    spotifyApi
      .getMyTopArtists({ limit: 8 })
      .then((data) => {
        data.body.items.forEach((artist) => {
          topArtists.push({
            id: artist.id,
            name: artist.name,
            imageUrl: artist.images[0].url,
          });
        });
        setTopArtists(topArtists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTracks();
    getArtists();
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
            numColumns={
              recommendations ? Math.ceil(recommendations.length / 2) : 2
            }
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
            numColumns={topArtists ? topArtists.length : 2}
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
