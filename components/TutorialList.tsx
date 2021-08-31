import React, { useCallback, useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getTutorials } from "../lib/api/tutorial";
import commonStyle from "../lib/commonStyle";
import ListEmptyComponent from "./ListEmptyComponent";
import TutorialItem from "./TutorialItem";

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
      // 마지막 데이터면
      if (result.data.rows.length < 10) {
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
      renderItem={({ item }) => <TutorialItem tutorial={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => (
        <ListEmptyComponent subject={"아직 올린 튜토리얼이"} />
      )}
    />
  );
};

export default TutorialList;
