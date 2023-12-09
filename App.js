import InitialScreen from "./src/screens/Initial";
import { useCallback } from "react";
import LoginOptionsScreen from "./src/screens/LoginOptions";
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
} from "@expo-google-fonts/noto-sans";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "./src/Tabs/Home";
import { PlayerContext } from "./PlayerContext";
import { ModalPortal } from "react-native-modals";

const Stack = createNativeStackNavigator();

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
    <PlayerContext>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Intro" component={InitialScreen} />
          <Stack.Screen name="Login" component={LoginOptionsScreen} />
          <Stack.Screen name="HomeTab" component={HomeTab} />
        </Stack.Navigator>
      </NavigationContainer>
      <ModalPortal />
    </PlayerContext>
  );
}
