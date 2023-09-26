import { Image, View, Text, Pressable } from "react-native";
import styles from "./styles";
import Navbar from "../../components/Navbar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import Button from "../../components/Button";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image
            style={styles.profilePicContainer}
            source={require("../../../assets/images/bg-intro.jpg")}
          />
          <Text style={styles.userName}>Guilherme Shibuya</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.optionsContainer}>
          <MaterialIcons name="person" color={colors.p2} size={32} />
          <Text style={styles.optionsText}>gerenciar conta</Text>
        </View>
        <View style={styles.separator}></View>
        <Button title={"Sair"} alert={true} />
      </View>
      <Navbar />
    </View>
  );
}
