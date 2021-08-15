import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import CategoryList from "../components/CategoryList";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>나를 발견하세요</Text>
      <CategoryList navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
