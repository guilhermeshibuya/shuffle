import { Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./styles";
import { colors } from "../../styles";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Label from "../../components/Label";

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="arrow-back"
          size={32}
          color={colors.w}
          style={{ marginBottom: 16 }}
        />
        <Subtitle text="ouça músicas em alta qualidade" />
        <Title text="conecte-se" />
      </View>
      <View>
        <Label text="email" />
        <Input />
        <Label text="senha" />
        <Input isPassword />
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}
