import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import UploadMainScreen from "../screens/UploadMainScreen";
import TutorialUploadScreen from "../screens/TutorialUploadScreen";
import LectureUploadScreen from "../screens/LectureUploadScreen";

const Stack = createStackNavigator();

const UploadStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UploadMain" component={UploadMainScreen} />
      <Stack.Screen name="TutorialUpload" component={TutorialUploadScreen} />
      {/* <Stack.Screen name="LectureEdit" component={TutorialUploadScreen} /> */}
      <Stack.Screen name="LectureUpload" component={LectureUploadScreen} />
    </Stack.Navigator>
  );
};

export default UploadStack;
