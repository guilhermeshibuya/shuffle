import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c11,
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight + 24,
    paddingBottom: 24,
  },
  titleContainer: {
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: "column",
    gap: 32,
  },
  optionsItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 12,
  },
  optionsText: {
    fontFamily: "NotoSans_400Regular",
    textTransform: "lowercase",
    fontSize: 24,
    color: colors.w,
  },
});

export default styles;
