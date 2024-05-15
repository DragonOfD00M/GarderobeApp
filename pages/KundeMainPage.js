import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { styles } from "../components/styles";
import Button from "../components/Button";

import { saveToFile, loadSavedData } from "../components/FileHandler";

export default function KundeMainPage({ navigation }) {
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const fetchNameData = async () => {
      try {
        const data = await loadSavedData("name.json");
        console.log("Name Data:", data);
        console.log("Name:", data[0].Navn);
        setName(data[0].Navn || "");
      } catch (error) {
        console.error("Error loading name data:", error);
      }
    };

    fetchNameData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>KundeMainPage</Text>
      </View>
      {typeof name === "string" && name !== "" ? (
        <View>
          {console.log("Name:", name)}
          <Text>Navn: {name}</Text>
        </View>
      ) : (
        <View>
          <Text>No name available</Text>
        </View>
      )}

      <Button
        label="Vis min QR kode"
        OnPress={() => navigation.navigate("KundeQRScan", { Navn: name })}
        ContainerStyle={styles.buttonContainer}
      />
      <Button
        label="Tilbage til forside"
        OnPress={() => navigation.navigate("MainPage")}
        ContainerStyle={styles.buttonContainer}
      />
    </View>
  );
}
