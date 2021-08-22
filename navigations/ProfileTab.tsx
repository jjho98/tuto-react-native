import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Button,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap } from "react-native-tab-view";
import PagerView from "react-native-pager-view";
import HomeScreen from "../screens/BookMarkScreen";

const FirstRoute = () => (
  <>
    <View style={{ backgroundColor: "blue", height: 500, width: 300 }}></View>
    <Text>하이요 </Text>
    <Text style={{ height: 100 }}>샤라라라</Text>
  </>
);

const SecondRoute = () => (
  <View
    style={[
      styles.scene,
      { backgroundColor: "#673ab7", height: 500, width: 300 },
    ]}
  />
);

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  first: HomeScreen,
  second: SecondRoute,
});

export default function ProfileTab() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      lazy={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
  },
  scene: {
    flex: 1,
  },
});
