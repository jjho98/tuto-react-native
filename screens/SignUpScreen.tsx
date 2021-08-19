import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import color from "../lib/color";
import commonStyle from "../lib/commonStyle";
import AuthContext from "../modules/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.cancelled) {
      setThumbnail(result.uri);
    }
  };

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

  const { signUp } = useContext(AuthContext);

  return (
    <View style={commonStyle.screenCenter}>
      <Text style={commonStyle.welcome}>회원가입</Text>
      <View style={commonStyle.width80}>
        <TextInput
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          style={commonStyle.input}
        />
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={commonStyle.input}
        />
        <TextInput
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
          style={commonStyle.input}
        />
        <View style={commonStyle.marginVertical10}>
          <Text>썸네일을 선택해주세요</Text>
          {!thumbnail && (
            <TouchableOpacity
              style={[styles.imageSelectBox, commonStyle.marginVertical10]}
              onPress={() => {
                checkPermissionThenPick();
              }}
            >
              <AntDesign name="picture" size={24} color="black" />
            </TouchableOpacity>
          )}
          {thumbnail && (
            <TouchableOpacity
              onPress={() => {
                checkPermissionThenPick();
              }}
            >
              <Image
                source={{ uri: thumbnail }}
                style={[styles.thumbnail, commonStyle.marginVertical10]}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => signUp(email, password)}
          style={[commonStyle.authBtn, styles.joinBtn]}
        >
          <Text style={commonStyle.authBtnText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joinBtn: {
    backgroundColor: color.primary,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  imageSelectBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
