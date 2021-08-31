import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { Button, View, Text, TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListEmptyComponent from "../components/ListEmptyComponent";
import TutorialItem from "../components/TutorialItem";
import { getMyTutorials } from "../lib/api/user";
import commonStyle from "../lib/commonStyle";

const UploadMainScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const page = useRef(0);
  const isFetchedAll = useRef(false);

  // 데이터 fetch 함수
  // page 바뀔 때마다 함수 다시 생성
  const fetchMore = useCallback(async () => {
    // 데이터 받아오기
    try {
      // 더 가져올 데이터가 없으면
      if (isFetchedAll.current) {
        return;
      }

      const result = await getMyTutorials(page.current);
      setItems((prev) => [...prev, ...result.data.rows]);
      page.current += 1;
      // 마지막 데이터면
      if (result.data.rows.length < 10) {
        isFetchedAll.current = true;
      }
    } catch (err) {
      alert("예상치 못한 문제가 발생했습니다.");
    }
  }, [page]);

  // 처음 fetch
  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <View style={commonStyle.marginVertical10}>
      <Button
        title="튜토리얼 업로드"
        onPress={() => {
          navigation.navigate("TutorialUpload");
        }}
      />
      <FlatList
        data={items}
        renderItem={({ item }) => <TutorialItem tutorial={item} />}
        keyExtractor={(item, index) => item.id}
        onEndReached={() => fetchMore()}
        onEndReachedThreshold={1}
        ListEmptyComponent={() => (
          <ListEmptyComponent subject={"아직 올린 튜토리얼이"} />
        )}
        progressViewOffset={1}
      ></FlatList>
    </View>
  );
};

export default UploadMainScreen;
