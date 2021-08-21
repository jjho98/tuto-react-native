import React from "react";
import { ActivityIndicator, View } from "react-native";
import color from "../lib/color";
import commonStyle from "../lib/commonStyle";

const PrimaryLoading = () => {
  return (
    <View style={commonStyle.screenCenter}>
      <ActivityIndicator size="large" color={color.primary} />
    </View>
  );
};

export default PrimaryLoading;
