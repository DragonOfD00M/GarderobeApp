import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import { styles } from "../components/styles";
import { loadSavedData } from "../components/FileHandler";
import dbData from "../data/db.json";

export default function GMainPage({ navigation, route }) {
  const { kode } = route.params;
  const [savedData, setSavedData] = useState([]);
  const [pladsNummer, setPladsNummer] = useState(0);
  const [tempPladsNummer, setTempPladsNummer] = useState(0);

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

  const findLedigPlads = (pladser) => {
    for (const key in pladser) {
      console.log(pladser[key].value);
      if (pladser[key].value === "Ikke optaget") {
        return pladser[key].key;
      }
    }
    return "Ingen ledige pladser";
  };

  // Find the element in savedData with matching Kode value
  const matchingElement = savedData.find((item) => item.Kode === kode);
  const pladser = matchingElement
    ? Object.entries(matchingElement.Pladser).map(([key, value]) => ({
        key,
        value,
      }))
    : [];
  const ledigPlads = findLedigPlads(pladser);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Garderobe</Text>
        <Text style={styles.titleText}>Forside</Text>
      </View>
      {matchingElement ? (
        <View style={styles.titleContainer}>
          <Text style={styles.standardText}>
            Eventnavn: {matchingElement.Navn}
          </Text>
          <Text style={styles.standardText}>
            {ledigPlads} burde være den næste ledige plads
          </Text>
        </View>
      ) : (
        <Text>No match found for kode: {kode}</Text>
      )}
      <View>
        <View style={{ alignItems: "center" }}>
          {pladsNummer !== 0 ? (
            <>
              <Text style={styles.standardText}>
                Pladsnummer: {pladsNummer}
              </Text>
              <Button
                label="Placer jakke på plads"
                OnPress={() => {
                  navigation.navigate("QRPladserJakke", {
                    kode: kode,
                    ledigPlads: pladsNummer,
                  });
                }}
                ContainerStyle={styles.buttonContainer}
              />
            </>
          ) : (
            <>
              <Text style={styles.standardText}>Pladsnummer: Ikke valgt</Text>
              <TextInput
                style={styles.standardText}
                placeholder="Indtast pladsnummer..."
                value={tempPladsNummer}
                onChangeText={setTempPladsNummer}
              />
              <Button
                label="Bekræft pladsnummer"
                OnPress={() => {
                  if (tempPladsNummer.trim() === "") {
                    Alert.alert("Error", "No input");
                    return;
                  }
                  setPladsNummer(tempPladsNummer);
                }}
                ContainerStyle={styles.buttonContainer}
              />
            </>
          )}
          <Button
            label="Giv jakke tilbage"
            OnPress={() => navigation.navigate("JakkeTilbage", { kode: kode })}
            ContainerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    </View>
  );
}
