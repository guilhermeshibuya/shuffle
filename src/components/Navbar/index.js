import { Text, View } from "react-native";
import { colors } from "../../styles/index";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./styles";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <MaterialIcons name="home-filled" color={colors.p2} size={36} />
        <Text style={(styles.description, styles.active)}>Início</Text>
      </View>
      <View style={styles.itemContainer}>
        <MaterialIcons name="search" color={colors.c7} size={36} />
        <Text style={styles.description}>Buscar</Text>
      </View>
      <View style={styles.itemContainer}>
        <MaterialIcons name="library-music" color={colors.c7} size={36} />
        <Text style={styles.description}>Biblioteca</Text>
      </View>
      <View style={styles.itemContainer}>
        <MaterialIcons name="person" color={colors.c7} size={36} />
        <Text style={styles.description}>Perfil</Text>
      </View>
    </View>
  );
}
