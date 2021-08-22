import React, { useCallback, useEffect, useReducer, useState } from "react";
import { View, Image, Button, TextInput } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import commonStyle from "../lib/commonStyle";
import * as ImagePicker from "expo-image-picker";
import { changeMyInfo } from "../lib/api/user";
import PrimaryLoading from "../components/PrimaryLoaing";

const ProfileEditScreen = ({ navigation, route }) => {
  // myInfo 관리
  const [myInfo, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "SET_INFO":
        return action.me;
      case "SET_THUMBNAIL":
        return {
          ...prevState,
          thumbnail: action.thumbnail,
        };
      case "SET_NICKNAME":
        return {
          ...prevState,
          nickname: action.nickname,
        };
      case "SET_MESSAGE":
        return {
          ...prevState,
          message: action.message,
        };
      default:
        return prevState;
    }
  }, null);

  // uploading 중이거나 처음 useEffect 완료 전이면 로딩 표시
  const [loading, setLoading] = useState(true);

  // 제출 시
  // myInfo 바뀔 때 함수 다시 생성
  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await changeMyInfo(myInfo);
      navigation.goBack();
    } catch (err) {
      alert("예상치 못한 문제가 발생했습니다");
    }
  }, [myInfo]);

  // 렌더링 시 myInfo 동기화
  useEffect(() => {
    dispatch({ type: "SET_INFO", me: route.params.myInfo });
    setLoading(false);
  }, []);

  // 이미지 선택
  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      // file에 담아놨다가 post 요청에 url이 아닌 이미지 전송
      dispatch({ type: "SET_THUMBNAIL", thumbnail: result.uri });
    }
  }, []);

  // 권한 요청 후 이미지 선택 함수 호출
  const checkPermissionThenPick = useCallback(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status != "granted") {
        return alert("이미지 파일 접근 권한을 허용해주세요");
      }
      await pickImage();
    })();
  }, []);

  return loading ? (
    // 로딩 화면
    <PrimaryLoading />
  ) : (
    // 데이터는 params로 받아오지만 useEffect 호출된 후에 렌더링 필요
    <ScrollView>
      <View>
        <View style={commonStyle.horizontalCenter}>
          <Image
            source={{ uri: myInfo.thumbnail }}
            style={[commonStyle.avatar]}
          />
          <Button
            onPress={() => {
              checkPermissionThenPick();
            }}
            title="이미지 변경"
          ></Button>
        </View>

        <View style={{ margin: 10 }}>
          {/* 닉네임 */}
          <Text>닉네임</Text>
          <TextInput
            value={myInfo.nickname}
            onChangeText={(val) =>
              dispatch({ type: "SET_NICKNAME", nickname: val })
            }
            style={commonStyle.input}
          />
          {/* 전하는 메시지 */}
          <Text>소개</Text>
          <TextInput
            value={myInfo.message}
            onChangeText={(val) =>
              dispatch({ type: "SET_MESSAGE", message: val })
            }
            style={commonStyle.input}
            multiline
          />
          {/* 수정 버튼 */}
          <Button title="수정 완료" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileEditScreen;
