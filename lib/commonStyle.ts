import { StyleSheet } from "react-native";
import color from "./color";

const commonStyle = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 20,
    marginTop: 3,
  },
  width80: {
    width: "80%",
  },
  screenCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalCenter: {
    flex: 1,
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
  },
  primaryBtn: {
    padding: 7,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: color.primary,
  },
  authBtn: {
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  authBtnText: {
    color: "white",
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
    margin: 15,
  },
  marginVertical10: {
    marginVertical: 10,
  },
  warningText: {
    color: "red",
    marginBottom: 5,
  },
  // 수평 아이템. 중앙 정렬
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  h1: {
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 10,
  },
  h2: {
    fontSize: 17,
    fontWeight: "500",
  },
  padding20: {
    padding: 20,
  },
  imageSelectBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  chip: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default commonStyle;
