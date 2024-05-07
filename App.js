import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, Button } from "react-native";

var bgc = "#FFF";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const swichSideBar = () => {
    setIsVisible(!isVisible);
  };
  const handleButtonPress = () => {
    alert("thing");
  };
  return (
    <View style={styles.container}>
      <View style={{ height: 20 }} />
      <Text style={styles.titleStyle}>GARDEROBE</Text>
      <View style={styles.menuPopOutContainer}>
        {isVisible ? (
          <View style={styles.menuPopOutStyle}>
            <View style={styles.menuButtonStyle}>
              <Button
                onPress={swichSideBar}
                title="Learn More"
                color={bgc}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        ) : (
          <View style={styles.menuButtonStyle}>
            <Button
              onPress={swichSideBar}
              title="Learn More"
              color={bgc}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        )}
      </View>
      <View style={{ flex: 2, justifyContent: "flex-end" }}>
        <Button
          onPress={handleButtonPress}
          title="Denne Knap er sej"
          color="red"
        />
        <Text sytle={styles.textStyle}>Hey</Text>
      </View>
      <View style={{ height: 20 }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgc,
    alignItems: "center",
    justifyContent: "top",
  },
  titleStyle: {
    color: "#000",
    fontSize: 50,
  },
  textStyle: {
    color: "#000",
    fontSize: 15,
  },
  menuButtonStyle: {
    height: 30,
    width: 30,
    top: 20,
    alignSelf: "flex-end",
  },
  menuPopOutContainer: {
    position: "absolute",
    height: "100%",
    width: "45%",
    zIndex: 100,
    alignSelf: "flex-end",
  },
  menuPopOutStyle: {
    flex: 1,
    zIndex: 100,
    backgroundColor: bgc,
    borderColor: "#000",
    borderWidth: 2,
  },
});
