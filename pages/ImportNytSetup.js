import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";

import { saveToFile } from "../components/FileHandler";

import Button from "../components/Button";
import { styles } from "../components/styles";

import dbData from "../data/db.json";

export default function ImportNytSetup({ navigation }) {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleConfirmLogin = async () => {
    setShowInput(false);
    if (!dbData) {
      Alert.alert("Error", "Database not loaded");
    }
    if (inputText.trim() === "") {
      Alert.alert("Error", "No input");
      return;
    }
    const nameExists = dbData.some((item) => item.Kode === inputText.trim());
    if (nameExists) {
      dbData.forEach((item) => {
        if (item.Kode === inputText.trim()) {
          saveToFile("saved.json", item.Navn, inputText.trim(), item.Pladser);
          navigation.navigate("GMainPage", { kode: item.Kode });
        }
      });
    } else {
    }
  };
  return (
    <View style={{ ...styles.mainContainer, justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <>
          <Button
            label="Indtast Kode"
            OnPress={() => setShowInput(true)}
            ContainerStyle={styles.buttonContainer}
          />
        </>
        <>
          {showInput && (
            <>
              <Text style={styles.standardText}>Indtast din fests kode</Text>
              <TextInput
                style={styles.standardText}
                placeholder="Indtast Kode..."
                value={inputText}
                onChangeText={setInputText}
              />
              <Button
                label="Confirm"
                OnPress={handleConfirmLogin}
                ContainerStyle={styles.buttonContainer}
              />
            </>
          )}
        </>
      </View>
    </View>
  );
}
