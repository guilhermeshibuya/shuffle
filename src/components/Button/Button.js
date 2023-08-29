import { Pressable, Text } from "react-native";
import styles from "./Styles";
import { colors } from "../../styles";

export default function Button() {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: pressed ? "#432bbad9" : colors.p4,
        },
      ]}
    >
      <Text style={styles.text}>Começar</Text>
    </Pressable>
  );
}
