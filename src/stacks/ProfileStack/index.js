import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/Profile";
import ManageAccountScreen from "../../screens/ManageAccount";

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="Manage Account"
        component={ManageAccountScreen}
      />
    </ProfileStack.Navigator>
  );
}
