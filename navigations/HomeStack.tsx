import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryList from "../components/CategoryList";
import TutorialList from "../components/TutorialList";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="TutorialList" component={TutorialList} />
    </Stack.Navigator>
  );
};

export default HomeStack;
