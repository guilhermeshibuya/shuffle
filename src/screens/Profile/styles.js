import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: colors.c11,
    gap: 24,
  },
  profilePicContainer: {
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  userName: {
    color: colors.c1,
    fontSize: 24,
    fontFamily: "NotoSans_600SemiBold",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 24,
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: colors.c10,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 12,
  },
  optionsText: {
    fontFamily: "NotoSans_400Regular",
    fontSize: 20,
    color: colors.c2,
  },
});

export default styles;
