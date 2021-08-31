import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ListEmptyComponent from "../components/ListEmptyComponent";
import PrimaryLoading from "../components/PrimaryLoaing";
import { getMyPortfolios } from "../lib/api/user";
import commonStyle from "../lib/commonStyle";

const PortfolioScreen = () => {
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
      const result = await getMyPortfolios(page.current);
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

  // 쳐음에 호출 .. 필요?
  // useEffect(() => {
  //   fetchMyPortfolios();
  // }, []);

  return !items ? (
    <PrimaryLoading />
  ) : (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id}
      onEndReached={fetchMyPortfolios}
      onEndReachedThreshold={1}
      ListEmptyComponent={() => (
        <ListEmptyComponent subject={"아직 결과물이"} />
      )}
      progressViewOffset={1}
    ></FlatList>
  );
};

export default PortfolioScreen;
