import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import { useContext } from "react";
import { Player } from "../../../PlayerContext";

export default function MusicListItem({
  title,
  artist,
  albumCoverImgUrl,
  duration,
  isPlaying,
  onPress,
  item,
  handleFavoritePress,
}) {
  const { currentSong, setCurrentSong } = useContext(Player);

  const truncateText = (text, maxChars) => {
    if (text.length > maxChars) {
      return text.substring(0, maxChars) + "...";
    }
    return text;
  };

  const handlePress = () => {
    setCurrentSong(item);
    onPress(item);
  };

  const artistNames = Array.isArray(artist) ? artist.join(", ") : artist;

  return (
    <Pressable style={styles.cardContainer} onPress={handlePress}>
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
          <Text
            style={[styles.musicName, isPlaying ? { color: colors.p1 } : ""]}
          >
            {truncateText(title, 25)}
          </Text>
          <Text style={styles.artist}>{truncateText(artistNames, 30)}</Text>
        </View>
      </View>
      <Pressable onPress={() => handleFavoritePress(item)}>
        {item?.isFavorite ? (
          <MaterialIcons name="favorite" color={colors.p2} size={32} />
        ) : (
          <MaterialIcons name="favorite-outline" color={colors.p2} size={32} />
        )}
      </Pressable>
    </Pressable>
  );
}
