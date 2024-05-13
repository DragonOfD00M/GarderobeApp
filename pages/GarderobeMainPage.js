import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";

import Button from "../components/Button";
import { styles } from "../components/styles";
import { loadSavedData } from "../components/FileHandler";

export default function GMainPage({ navigation, route }) {
  const { kode } = route.params;
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const data = await loadSavedData();
        setSavedData(data || []);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };

    fetchSavedData();
  }, []);

  // Find the element in savedData with matching Kode value
  const matchingElement = savedData.find((item) => item.Kode === kode);

  return (
    <View style={styles.mainContainer}>
      <Text>GarderobemainPage</Text>
      {matchingElement ? (
        <Text>Navn: {matchingElement.Navn}</Text>
      ) : (
        <Text>No match found for kode: {kode}</Text>
      )}
      <Button
        label="Tilbage til forside"
        OnPress={() => navigation.navigate("MainPage")}
        ContainerStyle={styles.buttonContainer}
      />
    </View>
  );
}
