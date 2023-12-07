import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight + 24,
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
