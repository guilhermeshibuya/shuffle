import { Image, Text, View } from "react-native";
import styles from "./styles";

export default function ArtistCard({ imageUrl, artistName }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
      </View>
      <Text style={styles.text}>{artistName}</Text>
    </View>
  );
}
