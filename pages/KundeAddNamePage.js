import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";

import { saveToFile, loadSavedData } from "../components/FileHandler";

import Button from "../components/Button";
import { styles } from "../components/styles";

export default function KundeAddNamePage({ navigation }) {
  const [inputText, setInputText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchNameData = async () => {
      try {
        const data = await loadSavedData("name.json");
        console.log("Navn Data:", data);
        console.log("Navn:", data[0].Navn);
        setName(data[0].Navn || "");
        if (data[0].Navn !== "" && typeof data[0].Navn === "string") {
          console.log(typeof data[0].Navn);
          navigation.navigate("KundeMainPage");
        }
      } catch (error) {}
    };

    fetchNameData();
  }, []);

  const handleConfirmLogin = async () => {
    if (inputText.trim() === "") {
      Alert.alert("Error", "No input");
      return;
    }
    saveToFile("name.json", inputText.trim());
    navigation.navigate("MainPage");
  };
  return (
    <View style={{ ...styles.mainContainer, justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.titleText}>Indtast dit navn</Text>
        <Text style={styles.standardText}>Hvor beder vi om dit navn</Text>
        <View style={{ alignItems: "left" }}>
          <Text style={styles.standardText}>
            {" "}
            - Med dit navn kan vi sikre os at vi kan finde netop din jakke
          </Text>
          <Text style={styles.standardText}>
            {" "}
            - Hvis du mister din telefon, eller den løber tør for strøm kan du
            bruge ID til stadig at få din jakke tilbage
          </Text>
          <Text style={styles.standardText}>
            {" "}
            - Derfor er det også vigtigt at du bruger dit rigtige navn, både
            for- og efternavn
          </Text>
        </View>
        <>
          <>
            <TextInput
              style={styles.standardText}
              placeholder="Indtast Navn..."
              value={inputText}
              onChangeText={setInputText}
            />
            <Button
              label="Confirm"
              OnPress={handleConfirmLogin}
              ContainerStyle={styles.buttonContainer}
            />
          </>
        </>
      </View>
    </View>
  );
}
