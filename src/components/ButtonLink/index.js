import { Pressable, Text } from "react-native";
import styles from "./styles";
import { useFonts, NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";

export default function ButtonLink({ title }) {
  const [fontLoaded] = useFonts({
    NotoSans_600SemiBold,
  });

  if (!fontLoaded) return null;

  return (
    <Pressable style={styles.link}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
