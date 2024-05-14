import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "../components/styles";
import Button from "../components/Button";
import { deleteSavedFile } from "../components/FileHandler";

export default function MainPage({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Garderobe</Text>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text style={{ fontSize: 25 }}>Velkommen</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={{ justifyContent: "flex-start" }}>
          <Button
            label="Login som personale"
            OnPress={() => navigation.navigate("PersonaleLogin")}
            ContainerStyle={styles.buttonContainer}
          />
          <View style={{ height: "60%" }}></View>
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          <Button
            label="Fortsæt som gæst"
            OnPress={() => navigation.navigate("KundeMainPage")}
            ContainerStyle={styles.buttonContainer}
          />
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Button
              label="Reset saved data"
              OnPress={() => {
                deleteSavedFile("saved.json");
                Alert.alert("Data reset", "Saved data has been reset");
              }}
              ContainerStyle={{ ...styles.tempResetContainer, marginTop: 10 }}
            />
            <Button
              label="Reset name data"
              OnPress={() => {
                deleteSavedFile("name.json");
                Alert.alert("Data reset", "Name data has been reset");
              }}
              ContainerStyle={{
                ...styles.tempResetContainer,
                marginTop: 10,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
