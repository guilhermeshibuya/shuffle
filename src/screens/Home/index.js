import { FlatList, ScrollView, View } from "react-native";
import MusicCard from "../../components/MusicCard";
import styles from "./styles";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import ArtistCard from "../../components/ArtistCard";
import { LinearGradient } from "expo-linear-gradient";

const data = [
  {
    id: "1",
    title: "IDGAF",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
  {
    id: "2",
    title: "Hotter Than Hell",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
  {
    id: "3",
    title: "Genesis",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
  {
    id: "4",
    title: "Genesis",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
  {
    id: "5",
    title: "Genesis",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
  {
    id: "6",
    title: "Genesis",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
  {
    id: "7",
    title: "Genesis",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
  {
    id: "8",
    title: "Genesis",
    artist: "Dua Lipa",
    albumCoverImgUrl:
      "https://i.scdn.co/image/ab67616d0000b273a13ac79ec7e3ac62bd4ca4e8",
  },
];

const data2 = [
  {
    id: "1",
    artistName: "The Neighbourhood",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebdf0b5ac84376a0a4b2166816",
  },
  {
    id: "2",
    artistName: "The Neighbourhood",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebdf0b5ac84376a0a4b2166816",
  },
  {
    id: "3",
    artistName: "The Neighbourhood",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebdf0b5ac84376a0a4b2166816",
  },
  {
    id: "4",
    artistName: "The Neighbourhood",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebdf0b5ac84376a0a4b2166816",
  },
];
export default function HomeScreen() {
  const renderMusic = ({ item }) => (
    <MusicCard
      title={item.title}
      artist={item.artist}
      albumCoverImgUrl={item.albumCoverImgUrl}
    />
  );

  const renderArtist = ({ item }) => (
    <ArtistCard artistName={item.artistName} imageUrl={item.imageUrl} />
  );

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

        <ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
            style={{ marginBottom: 40 }}
          >
            <FlatList
              data={data}
              renderItem={renderMusic}
              keyExtractor={(item) => item.id}
              numColumns={Math.ceil(data.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{ rowGap: 24 }}
              columnWrapperStyle={{ columnGap: 24 }}
            />
          </ScrollView>
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
            data={data2}
            renderItem={renderArtist}
            keyExtractor={(item) => item.id}
            numColumns={Math.ceil(data.length)}
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
