import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  input: {
    color: colors.c1,
    borderWidth: 1,
    borderColor: colors.c10,
    borderStyle: "solid",
    borderRadius: 24,
    padding: 12,
    marginBottom: 24,
    backgroundColor: colors.c9,
    fontSize: 16,
    width: "100%",
  },
  inputFocused: {
    borderColor: colors.p2,
  },
});

export default styles;
