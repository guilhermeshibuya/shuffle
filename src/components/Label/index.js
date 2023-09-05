import { Text } from "react-native";
import styles from "./styles";

export default function Label({ text }) {
  return <Text style={styles.label}>{text}</Text>;
}
