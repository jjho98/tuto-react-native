import React, { useState, useEffect, useContext } from "react";
import { View, Button, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import commonStyle from "../lib/commonStyle";
import AuthContext from "../modules/aurthContext";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const { signUp } = useContext(AuthContext);

  return (
    <View style={commonStyle.screenCenter}>
      <Text style={commonStyle.welcome}>회원가입</Text>
      <View style={commonStyle.width90}>
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
        <Button title="회원가입" onPress={() => signUp(email, password)} />
      </View>
    </View>
  );
};

export default SignUpScreen;
