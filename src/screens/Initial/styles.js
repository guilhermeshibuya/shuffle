import { colors } from "../../styles/index";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 24,
    marginBottom: 72,
  },
  image: {
    flex: 1,
  },
  text: {
    color: colors.w,
    maxWidth: "75%",
    textAlign: "left",
    fontSize: 32,
    fontFamily: "NotoSans_600SemiBold",
  },
});

export default styles;
