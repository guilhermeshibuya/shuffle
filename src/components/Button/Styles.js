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
    fontFamily: "NotoSans_600SemiBold",
  },
  primary: {
    backgroundColor: colors.p4,
  },
  secondary: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.c8,
    backgroundColor: "transparent",
  },
  alert: {
    backgroundColor: "#C82333",
  },
  primaryPressed: {
    backgroundColor: "#432bbad9",
  },
  secondaryPressed: {
    backgroundColor: "#59595980",
  },
  alertPressed: {
    backgroundColor: "#EC4B5A",
  },
});

export default styles;
