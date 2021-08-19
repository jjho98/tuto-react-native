import React, { useState, useContext } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import color from "../lib/color";
import commonStyle from "../lib/commonStyle";
import AuthContext from "../modules/aurthContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  return (
    <View style={commonStyle.screenCenter}>
      <Text style={commonStyle.welcome}>튜토에 오신 걸 환영합니다</Text>
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
        <View style={styles.btnGroup}>
          <Button
            title="로그인"
            onPress={() => signIn(email, password)}
            color={color.primary}
          />
          <Button
            title="회원가입"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnGroup: {
    justifyContent: "space-between",
    height: 90,
  },
});

export default SignInScreen;
