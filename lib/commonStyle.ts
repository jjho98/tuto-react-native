import { StyleSheet } from "react-native";

const commonStyle = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 20,
  },
  width80: {
    width: "80%",
  },
  screenCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
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
  horizaontal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  h1: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default commonStyle;
