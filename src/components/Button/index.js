import { Pressable, Text } from "react-native";
import styles from "./styles";
import { colors } from "../../styles";

export default function Button({ title }) {
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
