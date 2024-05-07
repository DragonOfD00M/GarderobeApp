import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, Button } from "react-native";

export default function App() {
  function onPressLearnMore() {
    return alert("Hello, World!");
  }
  return (
    <View style={styles.container}>
      <View style={{ height: 20 }} />
      <Text style={styles.titleStyle}>Hello</Text>
      <View style={(styles.menuButtonStyle, { alignItems: "right" })}>
        <Button
          onPress={onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "top",
  },
  titleStyle: {
    color: "#000",
    fontSize: 20,
  },
  menuButtonStyle: {
    height: 30,
    width: 30,
  },
});
