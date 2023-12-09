import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function ArtistCard({ imageUrl, artistName, onPress, item }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("ArtistInfo", { item: item })}
    >
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
