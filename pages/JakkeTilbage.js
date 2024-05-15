import React, { useState, useEffect } from "react";
import { View, Text, Alert, TextInput } from "react-native";
import Button from "../components/Button";
import { styles } from "../components/styles";
import { loadSavedData, saveToFile } from "../components/FileHandler";

export default function JakkeTilbage({ navigation, route }) {
  const { kode } = route.params;
  const [navn, setNavn] = useState("");
  const [brugerPlads, setBrugerPlads] = useState(0);
  const [savedData, setSavedData] = useState([]);
  const [usesText, setUsesText] = useState(false);

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const data = await loadSavedData("saved.json");
        console.log("Data:", data);
        setSavedData(data || []);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };

    fetchSavedData();
  }, []);

  const matchingElement = savedData.find((item) => item.Kode === kode);
  const pladser = matchingElement
    ? Object.entries(matchingElement.Pladser).map(([key, value]) => ({
        key,
        value,
      }))
    : [];

  const handlePress = () => {
    matchingElement.Pladser[brugerPlads] = "Ikke optaget";
    saveToFile(
      "saved.json",
      matchingElement.Navn,
      kode,
      matchingElement.Pladser
    );
    console.log(matchingElement);
    navigation.navigate("PersonaleLogin");
  };

  const handleNavn = () => {
    setUsesText(true);
    pladser.forEach((item) => {
      if (matchingElement.Pladser[item.key] === navn) {
        setBrugerPlads(item.key);
        console.log(item.key);
      }
    });
  };
  return (
    <View style={styles.mainContainer}>
      {usesText ? (
        <>
          <Text style={styles.standardText}>Jakkens ejer er: {navn}</Text>
          {brugerPlads !== 0 ? (
            <>
              <Text style={styles.standardText}>
                {" "}
                {navn} har jakker på pladserne:
              </Text>
              <Text style={styles.standardText}> {brugerPlads}</Text>
              <Button
                label="Fjern jakke"
                OnPress={handlePress}
                ContainerStyle={styles.buttonContainer}
              />
            </>
          ) : (
            <View>
              <Text style={styles.standardText}>
                {" "}
                {navn} har ingen jakker i garderoben
              </Text>
              <Button
                label="Tilbage"
                OnPress={() => {
                  navigation.navigate("PersonaleLogin");
                }}
                ContainerStyle={styles.buttonContainer}
              />
            </View>
          )}
        </>
      ) : (
        <>
          <Button
            label="Brug QR kode"
            OnPress={() => navigation.navigate("QRFjernJakke", { kode: kode })}
            ContainerStyle={styles.buttonContainer}
          />
          <View style={{ height: "10%" }} />
          <View style={{ backgroundColor: "#EEE" }}>
            <TextInput
              style={styles.standardText}
              placeholder="Indtast navn..."
              value={navn}
              onChangeText={setNavn}
            />
          </View>
          <Button
            label="Tjek navn"
            OnPress={handleNavn}
            ContainerStyle={styles.buttonContainer}
          />
        </>
      )}
    </View>
  );
}
