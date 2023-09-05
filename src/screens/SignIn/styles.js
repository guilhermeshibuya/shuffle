import { colors } from "../../styles";
import { StatusBar } from "react-native";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c11,
    paddingTop: StatusBar.currentHeight + 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});

export default styles;
