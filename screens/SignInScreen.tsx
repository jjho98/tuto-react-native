import React, { useState, useContext } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import color from "../lib/color";
import commonStyle from "../lib/commonStyle";
import AuthContext from "../modules/AuthContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  return (
    <View style={commonStyle.screenCenter}>
      <Text style={commonStyle.welcome}>튜토에 오신 걸 환영합니다</Text>
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
        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => signIn(email, password)}
            style={[commonStyle.authBtn, styles.loginBtn]}
          >
            <Text style={commonStyle.authBtnText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[commonStyle.authBtn, styles.joinBtn]}
          >
            <Text>회원가입</Text>
          </TouchableOpacity>
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
  loginBtn: {
    backgroundColor: color.primary,
  },
  joinBtn: {
    borderColor: color.primary,
    borderWidth: 1,
  },
});

export default SignInScreen;
