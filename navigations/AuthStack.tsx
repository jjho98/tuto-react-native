import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, createContext } from "react";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* 비밀번호 찾기 화면 */}
    </Stack.Navigator>
  );
};

export default Auth;
