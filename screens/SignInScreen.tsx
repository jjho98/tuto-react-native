import React, { useState, useContext } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import color from "../lib/color";
import commonStyle from "../lib/commonStyle";
import AuthContext from "../modules/AuthContext";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("정확한 이메일을 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요"),
});

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  return (
    <View style={commonStyle.screenCenter}>
      <Text style={commonStyle.welcome}>튜토에 오신 걸 환영합니다</Text>
      <View style={commonStyle.width80}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          // 이메일, 비밀번호 따로가 아니라 하나의 객체로 전달
          onSubmit={(values) => signIn(values)}
        >
          {({
            values,
            errors,
            handleSubmit,
            handleChange,
            isValid,
            isSubmitting,
          }) => (
            <>
              {errors.email && (
                <Text style={commonStyle.warningText}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="이메일"
                value={values.email}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                style={commonStyle.input}
              />

              {errors.password && (
                <Text style={commonStyle.warningText}>{errors.password}</Text>
              )}
              <TextInput
                placeholder="비밀번호"
                value={values.password}
                onChangeText={handleChange("password")}
                secureTextEntry
                style={commonStyle.input}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={[commonStyle.authBtn, styles.loginBtn]}
                disabled={!isValid || isSubmitting}
              >
                <Text style={commonStyle.authBtnText}>로그인</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={[commonStyle.authBtn, styles.joinBtn]}
        >
          <Text>회원가입</Text>
        </TouchableOpacity>
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
    marginBottom: 15,
  },
  joinBtn: {
    borderColor: color.primary,
    borderWidth: 1,
  },
});

export default SignInScreen;
