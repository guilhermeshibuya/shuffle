import { Pressable, Text } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { useFonts, NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";

export default function Button({ primary, title }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const [fontLoaded] = useFonts({
    NotoSans_600SemiBold,
  });

  if (!fontLoaded) return null;

  const btnStyles = [
    styles.btn,
    primary ? styles.primary : styles.secondary,
    isPressed && (primary ? styles.primaryPressed : styles.secondaryPressed),
  ];

  return (
    <Pressable
      style={btnStyles}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
