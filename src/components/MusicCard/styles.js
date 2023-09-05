import { StyleSheet } from "react-native";
import { colors } from "../../styles/index";

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 200,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  musicName: {
    fontSize: 16,
    color: colors.w,
  },
  artist: {
    fontSize: 12,
    color: colors.c6,
  },
});

export default styles;
