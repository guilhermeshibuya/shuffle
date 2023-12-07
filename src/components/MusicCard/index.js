import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function MusicCard({ title, artist, albumCoverImgUrl, item }) {
  const truncateText = (text, maxChars) => {
    if (text.length > maxChars) {
      return text.substring(0, maxChars) + "...";
    }
    return text;
  };
  const navigation = useNavigation();
  const artistNames = Array.isArray(artist) ? artist.join(", ") : artist;

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Info", { item: item })}
    >
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
    </Pressable>
  );
}
