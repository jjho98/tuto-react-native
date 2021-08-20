import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useReducer, useMemo, useCallback } from "react";
import Main from "./navigations/MainTab";
import Auth from "./navigations/AuthStack";
import * as SecureStore from "expo-secure-store";
import { login, register } from "./lib/api/auth";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./modules/AuthContext";
import { Alert } from "react-native";
import client from "./lib/api/client";

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SET_TOKEN":
          return {
            ...prevState,
            token: action.token,
          };
      }
    },
    {
      // isLoading: true,
      token: null,
      loginFailed: false,
    }
  );

  const changeTokenStateAndHeader = useCallback((token) => {
    // axios의 header authorization에 토큰 첨부
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // state의 토큰 변경
    dispatch({ type: "SET_TOKEN", token });
  }, []);

  const authMethods = useMemo(
    () => ({
      signIn: async (formData: { email: string; password: string }) => {
        try {
          // 로그인 요청 해서 토큰 받기
          const res = await login(formData);
          const token = res.data.token;
          // 비밀 저장소에 토큰 저장
          await SecureStore.setItemAsync("access_token", token);
          // 토큰 반영
          changeTokenStateAndHeader(token);
        } catch (err) {
          // 로그인 실패 시
          // console.log(err);
          if (err.response.status != 500) {
            Alert.alert(null, err.response.data.message);
          } else {
            Alert.alert(
              null,
              "예상치 못한 문제가 발생했습니다. 다음에 다시 시도해주세요"
            );
          }
        }
      },
      signUp: async (formData: {
        email: string;
        password: string;
        nickname: string;
      }) => {
        try {
          const res = await register(formData);
          const token = res.data.token;
          // 비밀 저장소에 토큰 저장
          await SecureStore.setItemAsync("access_token", token);
          // 토큰 반영
          changeTokenStateAndHeader(token);
        } catch (err) {
          console.log(err);
          // 회원가입 실패 시
          if (err.response.status != 500) {
            Alert.alert(null, err.response.data.message);
          } else {
            Alert.alert(
              null,
              "예상치 못한 문제가 발생했습니다. 다음에 다시 시도해주세요"
            );
          }
        }
      },
    }),
    []
  );

  // 앱 시작 시 secure store에 토큰 있는 지 확인
  useEffect(() => {
    const get_saved_token = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        // 토큰 반영
        changeTokenStateAndHeader(token);
      } catch (e) {
        // 저장된 토큰이 없을 시
      }
    };
    get_saved_token();
    return () => {
      // 앱 종료 시 state에서 토큰 제거
      dispatch({ type: "SET_TOKEN", token: null });
    };
  }, []);

  return (
    <AuthContext.Provider value={authMethods}>
      <NavigationContainer>
        {state.token == null ? <Auth /> : <Main />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
