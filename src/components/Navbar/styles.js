import { StyleSheet } from "react-native";
import { colors } from "../../styles/index";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 36,
    backgroundColor: colors.c10,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  description: {
    fontSize: 12,
    color: colors.c7,
  },
  active: {
    color: colors.p2,
  },
});

export default styles;
