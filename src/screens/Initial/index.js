import { ImageBackground, Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";
import styles from "./styles";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InitialScreen({ navigation }) {
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");

      if (accessToken && expirationDate) {
        const currentDate = Date.now();

        if (currentDate < expirationDate) {
          navigation.replace("HomeTab");
        } else {
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-intro.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/shuffle.png")}
          style={{ marginBottom: 12 }}
        />
        <Text style={[styles.text, { marginBottom: 40 }]}>
          envolva-se em notas vibrantes de uma experiência sonora única
        </Text>
        <Button
          title={"Começar"}
          primary
          onPress={() => navigation.navigate("Login")}
        />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
