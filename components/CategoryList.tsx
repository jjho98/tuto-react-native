import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getCategories } from "../lib/api/category";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CategoryList = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.listContainer}>
      {categories.map((item) => (
        <TouchableOpacity
          key={item.engName}
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("TutorialList", { category: item.engName })
          }
        >
          <MaterialCommunityIcons name={item.icon} style={styles.icon} />
          <Text style={styles.nameText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemContainer: {
    padding: 15,
    borderColor: "black",
    flex: 1,
    flexGrow: 0,
    flexBasis: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "300",
  },
  icon: {
    fontSize: 50,
    marginBottom: 10,
    color: "#c681d4",
  },
});

export default CategoryList;
