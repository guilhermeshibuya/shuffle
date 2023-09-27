import { Text, View } from "react-native";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import styles from "./styles";

export default function ManageAccountScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Subtitle text="modificar informações da conta" />
        <Title text="gerenciar conta" />
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsItemContainer}>
          <MaterialIcons name="mail" size={32} color={colors.p2} />
          <Text style={styles.optionsText}>alterar email</Text>
        </View>
        <View style={styles.optionsItemContainer}>
          <MaterialIcons name="person" size={32} color={colors.p2} />
          <Text style={styles.optionsText}>alterar usuário</Text>
        </View>
        <View style={styles.optionsItemContainer}>
          <MaterialIcons name="lock" size={32} color={colors.p2} />
          <Text style={styles.optionsText}>alterar senha</Text>
        </View>
      </View>
    </View>
  );
}
