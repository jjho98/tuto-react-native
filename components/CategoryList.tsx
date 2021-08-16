import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getCategories } from "../lib/api/category";

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
          key={item._id}
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("TutorialList", { category: item.engName })
          }
        >
          <Text style={styles.emojiText}>{item.emoji}</Text>
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
    padding: 10,
    borderColor: "black",
    flex: 1,
    flexBasis: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "300",
  },
  emojiText: {
    fontSize: 50,
    fontWeight: "300",
    marginBottom: 1,
  },
});

export default CategoryList;
