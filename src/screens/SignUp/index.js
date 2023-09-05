import { View } from "react-native";
import { colors } from "../../styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Label from "../../components/Label";
import Button from "../../components/Button";
import styles from "./styles";

export default function SignUpScreen() {
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
        <Title text="cadastre-se" />
      </View>
      <View>
        <Label text="Nome" />
        <Input />
        <Label text="Email" />
        <Input />
        <Label text="Senha" />
        <Input isPassword style={{ marginBottom: 32 }} />
        <Button primary title="criar conta" />
      </View>
    </View>
  );
}
