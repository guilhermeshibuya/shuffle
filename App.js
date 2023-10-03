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

import HomeScreen from "./src/screens/Home";
import SearchScreen from "./src/screens/Search";
import LibraryScreen from "./src/screens/Library";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "./src/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProfileStackScreen from "./src/stacks/ProfileStack";
import HeaderLogo from "./src/components/HeaderLogo";
import Player from "./src/components/Player";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

  // const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginOptionsScreen} />
        <Stack.Screen name="Início" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

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
            backgroundColor: "#202020",
            borderTopWidth: 0,
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitleContainerStyle: { paddingLeft: 12 },
          headerStyle: {
            backgroundColor: colors.c11,
          },
        })}
      >
        <Tab.Screen
          name="Início"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTitle: (props) => <HeaderLogo {...props} />,
          }}
        />
        <Tab.Screen name="Buscar" component={SearchScreen} />
        <Tab.Screen name="Biblioteca" component={LibraryScreen} />
        <Tab.Screen name="Perfil" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
