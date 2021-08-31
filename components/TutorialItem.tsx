import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { convertNumber } from "../lib/convertNumber";
import commonStyle from "../lib/commonStyle";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";

const TutorialItem = ({ tutorial }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: tutorial.thumbnail }}
        style={{ width: 100, height: "100%", resizeMode: "cover" }}
      />

      <View style={styles.contentContainer}>
        <View>
          <Text style={commonStyle.h2}>{tutorial.title}</Text>
        </View>

        <View style={[styles.rowContainer]}>
          <Image
            source={{ uri: tutorial.user.thumbnail }}
            style={{ width: 30, height: 30 }}
          />
          <Text>{tutorial.user.nickname}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={commonStyle.chip}>
            <Ionicons name="play-circle-outline" size={24} color="black" />
            <Text>{tutorial.lectureCount}</Text>
          </View>

          <View style={commonStyle.chip}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text>{convertNumber(tutorial.takingCount)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  contentContainer: {
    // marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
  },
});

export default TutorialItem;
