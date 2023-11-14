import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";

export default function MusicListItem({
  title,
  artist,
  albumCoverImgUrl,
  duration,
  onPress,
}) {
  const truncateText = (text, maxChars) => {
    if (text.length > maxChars) {
      return text.substring(0, maxChars) + "...";
    }
    return text;
  };

  const artistNames = Array.isArray(artist) ? artist.join(", ") : artist;

  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: albumCoverImgUrl,
            }}
          />
        </View>
        <View>
          <Text style={styles.musicName}>{truncateText(title, 25)}</Text>
          <Text style={styles.artist}>{truncateText(artistNames, 30)}</Text>
        </View>
      </View>
      <Pressable>
        <MaterialIcons name="favorite" color={colors.p2} size={32} />
      </Pressable>
    </Pressable>
  );
}
