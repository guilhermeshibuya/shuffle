import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  link: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: colors.c8,
  },
  text: {
    color: colors.w,
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "NotoSans_600SemiBold",
  },
});

export default styles;
