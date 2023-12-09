import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  likedSongs: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.c10,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    width: "100%",
    overflow: "hidden",
  },
});

export default styles;
