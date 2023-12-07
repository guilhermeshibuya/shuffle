import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  progressBarBack: {
    width: "100%",
    height: 3,
    backgroundColor: colors.c9,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.p2,
    borderRadius: 3,
  },
});

export default styles;
