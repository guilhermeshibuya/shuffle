import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 24,
  },
  image: {
    flex: 1,
  },
  text: {
    color: colors.w,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "NotoSans_400Regular",
  },
});

export default styles;
