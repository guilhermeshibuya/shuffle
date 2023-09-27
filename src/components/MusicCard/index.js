import { Image, Text, View } from "react-native";
import styles from "./styles";

export default function MusicCard({ title, artist, albumCoverImgUrl }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: albumCoverImgUrl,
          }}
        />
      </View>
      <View>
        <Text style={styles.musicName}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </View>
  );
}
