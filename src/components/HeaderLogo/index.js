import { Image } from "react-native";

export default function HeaderLogo() {
  return (
    <Image
      style={{ height: 20 }}
      source={require("../../../assets/images/shuffle.png")}
    />
  );
}
