import React, { useCallback, useRef } from "react";
import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import { getTutorials } from "../lib/api/tutorial";
import { Ionicons } from "@expo/vector-icons";
import { convertNumber } from "../lib/convertNumber";

// item을 tutorial 변수로 받기
const TutorialItem = ({ item: tutorial }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: tutorial.thumbnail }}
        style={{ width: 100, height: "100%", resizeMode: "cover" }}
      />

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.title}>{tutorial.title}</Text>
        </View>

        <View style={[styles.rowContainer]}>
          <Image
            source={{ uri: tutorial.user.thumbnail }}
            style={{ width: 30, height: 30 }}
          />
          <Text>{tutorial.user.nickname}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.rowContainer, styles.chip]}>
            <Ionicons name="play-circle-outline" size={24} color="black" />
            <Text>{tutorial.lectureCount}</Text>
          </View>

          <View style={[styles.rowContainer, styles.chip]}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text>{convertNumber(tutorial.takingCount)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TutorialList = ({ navigation, route }) => {
  const [tutorials, setTutorials] = useState([]);
  const page = useRef(0);
  const isFetchedAll = useRef(false);

  const fetchMore = useCallback(async () => {
    try {
      // 더 가져올 데이터가 없으면
      if (isFetchedAll.current) {
        return;
      }

      const result = await getTutorials(route.params.category, page.current);
      setTutorials((prev) => [...prev, ...result.data.rows]);
      page.current += 1;
      // 마지막에 가져온 데이터가 없으면
      if (result.data.rows.length == 0) {
        isFetchedAll.current = true;
      }
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  // 처음 fetch
  useEffect(() => {
    fetchMore();
  }, [route]);

  return (
    // <></>
    <FlatList
      data={tutorials}
      renderItem={TutorialItem}
      keyExtractor={(item) => item._id}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  contentContainer: {
    marginHorizontal: 10,
    padding: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.5,
  },
  chip: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    flexGrow: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
  },
});

export default TutorialList;
