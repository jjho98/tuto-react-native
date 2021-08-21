import React, { useEffect, useState } from "react";
import { View, Image, Button, ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getMyInfo } from "../lib/api/user";
import commonStyle from "../lib/commonStyle";

const ProfileScreen = ({ navigation }) => {
  const [myInfo, setMyInfo] = useState(null);

  // 시작할 때, 프로필 편집 화면에서 뒤로 왔을 때 fetch
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const result = await getMyInfo();
        setMyInfo(result.data);
      } catch (err) {
        alert("예상치 못한 문제가 발생했습니다.");
      }
    };
    fetchMyInfo();
  });

  return (
    <ScrollView>
      {/* 데이터 가져오기 전에 로딩 표시 */}
      {!myInfo ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={commonStyle.horizaontal}>
            {/* 썸네일 */}
            {/* 썸네일 없으면 기본 icon 표시 */}
            <Image
              style={commonStyle.avatar}
              source={{
                uri: myInfo.thumbnail,
              }}
            />

            {/* 닉네임 */}
            <Text style={commonStyle.h1}>{myInfo.nickname}</Text>
          </View>
          {/* 전하는 메시지 */}
          <Text style={{ margin: 10 }}>{myInfo.message}</Text>
          <Button
            title="프로필 수정"
            onPress={() => {
              // params에 myInfo 전달
              navigation.navigate("ProfileEdit", { myInfo });
            }}
          />

          <View>
            {/* 수강 중인 강좌 개수 */}
            <Text>수강중</Text>
            <Text>작품</Text>
            <Text>강좌</Text>
          </View>
        </View>
      )}

      {/* 로딩 완료 후 */}
    </ScrollView>
  );
};

export default ProfileScreen;
