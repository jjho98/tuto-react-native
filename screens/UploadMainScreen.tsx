import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { Button, View, Text, TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getMyTutorials } from "../lib/api/user";
import commonStyle from "../lib/commonStyle";

const UploadMainScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const page = useRef(0);
  const itemDount = useRef(100);

  // 데이터 fetch 함수
  // page 바뀔 때마다 함수 다시 생성
  const fetchMyPortfolios = useCallback(async () => {
    // 데이터 다 받아옴
    if (Math.ceil((itemDount.current - 1) / 5) < page.current) {
      return;
    }
    // 데이터 받아오기
    try {
      const result = await getMyTutorials(page.current);
      const { count, rows } = result.data;
      // 카운트 변경
      itemDount.current = count;
      // 기존 배열과 fetch 결과 합치기
      setItems(items.concat(rows));
      // 페이지 1 증가
      page.current += 1;
    } catch (err) {
      alert("예상치 못한 문제가 발생했습니다.");
    }
  }, [page]);

  // 아이템당 보여줄 리액트 엘리먼트
  const renderItem = ({ item, index }) => (
    <TouchableHighlight
      key={item.id}
      // 자세히 볼 수 있는 화면 stack으로 띄우기 혹은 모달
      onPress={() => {}}
    >
      {/* 수정 */}
      <View>{item}</View>
    </TouchableHighlight>
  );

  // 받아온 결과 비었으면
  const ListEmptyComponent = useMemo(
    () => (
      <View style={[commonStyle.screenCenter, { marginVertical: 30 }]}>
        <Text style={commonStyle.h1}>
          아직 올린 튜토리얼이 하나도 없어요 😫
        </Text>
      </View>
    ),
    []
  );

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
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
        onEndReached={fetchMyPortfolios}
        onEndReachedThreshold={1}
        // ListEmptyComponent={ListEmptyComponent}
        progressViewOffset={1}
      ></FlatList>
    </View>
  );
};

export default UploadMainScreen;
