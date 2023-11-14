import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/Home";
import LikedSongsScreen from "../../screens/LikedSongs";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Liked"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Liked" component={LikedSongsScreen} />
    </HomeStack.Navigator>
  );
}
