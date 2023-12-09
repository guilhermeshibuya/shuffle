import { StyleSheet } from "react-native";
import { colors } from "../../styles/index";

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
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
