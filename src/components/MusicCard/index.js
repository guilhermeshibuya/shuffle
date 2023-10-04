import { Image, Text, View } from "react-native";
import styles from "./styles";

export default function MusicCard({ title, artist, albumCoverImgUrl }) {
  const truncateText = (text, maxChars) => {
    if (text.length > maxChars) {
      return text.substring(0, maxChars) + "...";
    }
    return text;
  };

  const artistNames = Array.isArray(artist) ? artist.join(", ") : artist;
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
        <Text style={styles.musicName}>{truncateText(title, 28)}</Text>
        <Text style={styles.artist}>{truncateText(artistNames, 30)}</Text>
      </View>
    </View>
  );
}
