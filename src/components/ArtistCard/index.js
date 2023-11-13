import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function ArtistCard({ imageUrl, artistName, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
      </View>
      <Text style={styles.text}>{artistName}</Text>
    </Pressable>
  );
}
