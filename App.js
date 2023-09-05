import SignInScreen from "./src/screens/SignIn";
import InitialScreen from "./src/screens/Initial";
import { useCallback } from "react";
import LoginOptionsScreen from "./src/screens/LoginOptions";
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
} from "@expo-google-fonts/noto-sans";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <InitialScreen />
    </View>
  );
}
