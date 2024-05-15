import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: "6%",
    paddingBottom: "6%",
    backgroundColor: "#3094DD",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000",
  },
  standardText: {
    fontSize: 20,
    color: "#000",
  },
  inputContaier: {
    backgroundColor: "#CCC",
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#00A",
    borderWidth: 3,
    borderColor: "#000",
    padding: 3,
  },
  textShowContainer: {
    width: 200,
    height: 30,
    backgroundColor: "#00A",
  },
  quickLoginContainer: {
    marginLeft: 5,
    marginBottom: 5,
    width: 50,
    height: 25,
    backgroundColor: "#00A",
  },
  tempResetContainer: {
    width: 150,
    height: 50,
    backgroundColor: "#999",
  },
});
