import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
  password: yup
    .string()
    .required("비밀번호를 입력해주세요")
    .min(8, "8글자 이상을 입력해주세요"),
  passwordConfirm: yup
    .string()
    .required("비밀번호를 다시 입력해주세요")
    .test("password-match", "비밀번호가 동일하지 않습니다", function (value) {
      return this.parent.password == value;
    }),
  nickname: yup
    .string()
    .required("닉네임을 입력해주세요")
    .max(
      10,
      "10 글자 이하로 입력해주세요(emoji는 보다 많은 글자 수를 차지합니다)"
    ),
});

const SignUpScreen = () => {
  const { signUp } = useContext(AuthContext);

  return (
    <View style={commonStyle.screenCenter}>
      <Text style={commonStyle.welcome}>회원가입</Text>
      <View style={commonStyle.width80}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
            nickname: "",
          }}
          validationSchema={validationSchema}
          // 이메일, 비밀번호 따로가 아니라 하나의 객체로 전달
          onSubmit={(values) => signUp(values)}
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
              {/* 이메일 */}
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

              {/* 비밀번호 */}
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

              {/* 비밀번호 확인 */}
              {errors.passwordConfirm && (
                <Text style={commonStyle.warningText}>
                  {errors.passwordConfirm}
                </Text>
              )}
              <TextInput
                placeholder="비밀번호"
                value={values.passwordConfirm}
                onChangeText={handleChange("passwordConfirm")}
                secureTextEntry
                style={commonStyle.input}
              />

              {/* 닉네임 */}
              {errors.nickname && (
                <Text style={commonStyle.warningText}>{errors.nickname}</Text>
              )}
              <TextInput
                placeholder="닉네임"
                value={values.nickname}
                onChangeText={handleChange("nickname")}
                style={commonStyle.input}
              />

              {/* 제출 버튼 */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={[commonStyle.authBtn, styles.joinBtn]}
                disabled={isSubmitting || !isValid}
              >
                <Text style={commonStyle.authBtnText}>회원가입</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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
