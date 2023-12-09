import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/Home";
import LikedSongsScreen from "../../screens/LikedSongs";
import SongInfoScreen from "../../screens/SongInfo";
import ArtistInfoScreen from "../../screens/ArtistInfo";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Liked" component={LikedSongsScreen} />
      <HomeStack.Screen name="Info" component={SongInfoScreen} />
      <HomeStack.Screen name="ArtistInfo" component={ArtistInfoScreen} />
    </HomeStack.Navigator>
  );
}
