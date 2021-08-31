import React, { useMemo } from "react";
import { View, Text } from "react-native";
import commonStyle from "../lib/commonStyle";

// 받아온 결과 비었으면
const ListEmptyComponent = ({ subject }) => {
  return (
    <View style={[commonStyle.screenCenter, { marginVertical: 30 }]}>
      <Text style={commonStyle.h1}>{subject} 하나도 없어요 😫</Text>
    </View>
  );
};
export default ListEmptyComponent;
