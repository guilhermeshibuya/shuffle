import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artistNameTitle: {
    fontSize: 32,
    color: colors.c1,
    fontFamily: "NotoSans_600SemiBold",
  },
  musicName: {
    fontSize: 16,
    color: colors.w,
    fontFamily: "NotoSans_400Regular",
  },
  artist: {
    fontSize: 12,
    color: colors.c6,
    fontFamily: "NotoSans_400Regular",
  },
});

export default styles;
