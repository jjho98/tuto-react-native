import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import React from "react";
import Main from "./Main";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
