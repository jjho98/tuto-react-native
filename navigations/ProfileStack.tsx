import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      {/* 비밀번호 찾기 화면 */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
