import { StyleSheet } from "react-native";
import { colors } from "../../styles/index";

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    padding: 12,
    borderRadius: 24,
    // backgroundColor: colors.p4,
  },
  text: {
    color: colors.w,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
