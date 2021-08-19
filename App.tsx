import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import Main from "./navigations/MainTab";
import Auth from "./navigations/AuthStack";
import * as SecureStore from "expo-secure-store";
import { login } from "./lib/api/auth";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./modules/AuthContext";

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

  const authMethods = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        try {
          // 로그인 요청 해서 토큰 받기
          const res = await login(email, password);
          if (res.token) {
            const token = res.token;
            // 비밀 저장소에 토큰 저장
            await SecureStore.setItemAsync("access_token", token);
            // state의 토큰 변경
            dispatch({ type: "SET_TOKEN", token });
          } else {
            console.log(res);
            alert(res);
          }
        } catch (err) {
          // 토큰이 안 왔으면 = 로그인 성공 못 함
        }
      },
      signUp: async (email: string, password: string, nickname: string) => {},
    }),
    []
  );

  useEffect(() => {
    const get_saved_token = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        dispatch({ type: "SET_TOKEN", token });
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
