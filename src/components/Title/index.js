import { Text } from "react-native";
import styles from "./styles";

export default function Title({ text, style }) {
  const titleStyle = [styles.title, style];
  return (
    <Text style={titleStyle}>
      {text}
      <Text style={styles.purple}>.</Text>
    </Text>
  );
}
