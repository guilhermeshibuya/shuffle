import { Text } from "react-native";
import styles from "./styles";

export default function Subtitle({ text }) {
  return <Text style={styles.subtitle}>{text}</Text>;
}
