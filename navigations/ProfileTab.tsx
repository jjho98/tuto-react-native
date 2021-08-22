import * as React from "react";
import HomeScreen from "../screens/BookMarkScreen";
import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TempScreen from "../screens/TempScreen";
import SearchScreen from "../screens/SearchScreen";
import PortfolioScreen from "../screens/PortfolioScreen";

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
      }}
    >
      <Tab.Screen
        name="PortfolioTab"
        component={PortfolioScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ forcused, color }) => {
            return <AntDesign name="switcher" size={23} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="temp2"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ forcused, color }) => {
            return <AntDesign name="staro" size={23} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="temp3"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ forcused, color }) => {
            return <AntDesign name="videocamera" size={23} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default ProfileTab;
