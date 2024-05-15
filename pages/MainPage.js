import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "../components/styles";
import Button from "../components/Button";
import { loadSavedData, deleteSavedFile } from "../components/FileHandler";
import useOnScreenLoad from "../components/useOnScreenLoad";

export default function MainPage({ navigation }) {
  const [Navn, setNavn] = useState("");

  const fetchNameData = async () => {
    try {
      const data = await loadSavedData("name.json");
      console.log("a Data:", data);
      console.log("Navn:", data[0].Navn);
      setNavn(data[0].Navn || "");
    } catch (error) {
      setNavn("");
      console.error("Error loading name data:", error);
    }
  };

  const fortsætSomGæst = () => {
    if (typeof Navn === "string" && Navn !== "") {
      console.log("name found");
      navigation.navigate("KundeMainPage");
    } else {
      console.log("no name found");
      navigation.navigate("KundeAddNamePage");
    }
  };
  useOnScreenLoad(fetchNameData);

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
          <View style={{ height: "50%" }}></View>
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          <Button
            label="Fortsæt som gæst"
            OnPress={fortsætSomGæst}
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
