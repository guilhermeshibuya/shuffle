import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/Home";
import SearchScreen from "../../screens/Search";
import LibraryScreen from "../../screens/Library";
import ProfileStackScreen from "../../stacks/ProfileStack";
import { colors } from "../../styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HeaderLogo from "../../components/HeaderLogo";

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="Início"
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
  );
}
