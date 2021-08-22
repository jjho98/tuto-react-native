import * as React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileTab from "../navigations/ProfileTab";

export default function TabViewExample() {
  return (
    <>
      <View>
        <Text>balalls</Text>
      </View>
      <ProfileTab />
    </>
  );
}
