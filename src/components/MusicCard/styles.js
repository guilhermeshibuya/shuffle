import { StyleSheet } from "react-native";
import { colors } from "../../styles/index";

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 130,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 16,
    resizeMode: "cover",
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
