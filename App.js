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
import SignUpScreen from "./src/screens/SignUp";
import MusicCard from "./src/components/MusicCard";
import HomeScreen from "./src/screens/Home";
import SearchScreen from "./src/screens/Search";
import LibraryScreen from "./src/screens/Library";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "./src/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProfileStackScreen from "./src/stacks/ProfileStack";

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

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            const routeToIcon = {
              Início: "home",
              Buscar: "search",
              Biblioteca: "library-music",
              Perfil: "person",
            };
            const iconName = routeToIcon[route.name];

            return <MaterialIcons name={iconName} size={36} color={color} />;
          },
          tabBarActiveTintColor: "#8570EF",
          tabBarInactiveTintColor: "#595959",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "NotoSans_400Regular",
          },
          tabBarStyle: {
            position: "absolute",
            height: 84,
            paddingBottom: 12,
            paddingTop: 12,
            backgroundColor: colors.c11,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Buscar" component={SearchScreen} />
        <Tab.Screen name="Biblioteca" component={LibraryScreen} />
        <Tab.Screen name="Perfil" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
