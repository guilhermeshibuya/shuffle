import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight + 24,
  },
  input: {
    color: colors.c1,
    borderWidth: 1,
    borderColor: colors.c10,
    borderStyle: "solid",
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
    backgroundColor: colors.c9,
    fontSize: 16,
    width: "100%",
  },
  inputFocused: {
    borderColor: colors.p2,
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
