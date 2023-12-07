import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";

export default function ArtistInfoScreen({ navigation }) {
  const route = useRoute();
  console.log(route.params);
  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={[styles.container, { paddingBottom: 100 }]}
    >
      <ScrollView>
        <ImageBackground
          source={{ uri: route?.params?.item?.imageUrl }}
          style={{
            width: "100%",
            height: 300,
            position: "relative",
          }}
        >
          <MaterialIcons
            name="arrow-back"
            color={colors.c1}
            size={36}
            onPress={() => navigation.goBack()}
            style={{
              marginBottom: 16,
              position: "absolute",
              marginTop: 24,
              marginLeft: 24,
            }}
          />
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}></View>
        </ImageBackground>
      </ScrollView>
    </LinearGradient>
  );
}
