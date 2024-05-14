import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";

import Button from "../components/Button";
import { styles } from "../components/styles";
import { loadSavedData } from "../components/FileHandler";

export default function PersonaleLogin({ navigation }) {
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const data = await loadSavedData("saved.json");
        console.log("Data:", data);
        setSavedData(data);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };

    fetchSavedData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <>
        {savedData.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text>Saved Data:</Text>
            <Text />
            {savedData.map((item, index) => (
              <View style={{ flexDirection: "row" }} key={index}>
                <Text>Name: {item.Navn}</Text>
                <Button
                  label="Login"
                  OnPress={() =>
                    navigation.navigate("GMainPage", { kode: item.Kode })
                  }
                  ContainerStyle={styles.quickLoginContainer}
                />
              </View>
            ))}
          </View>
        )}
      </>

      <View style={{ paddingTop: "20%" }}>
        <Button
          label="Import nyt setup"
          OnPress={() => navigation.navigate("ImportNytSetup")}
          ContainerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
}
