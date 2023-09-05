import { Image, Text, View } from "react-native";
import styles from "./styles";

export default function MusicCard({ musicName, artist, albumCoverImgUrl }) {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.image}
        source={{
          uri: albumCoverImgUrl,
        }}
      />
      <View>
        <Text style={styles.musicName}>{musicName}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </View>
  );
}
