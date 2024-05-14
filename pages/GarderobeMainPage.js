import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, Alert } from "react-native";
import Button from "../components/Button";
import { styles } from "../components/styles";
import { loadSavedData } from "../components/FileHandler";
import dbData from "../data/db.json";

export default function GMainPage({ navigation, route }) {
  const { kode } = route.params;
  const [savedData, setSavedData] = useState([]);

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
        <View>
          <Text>Navn: {matchingElement.Navn}</Text>
          <Text>Ledig plads: {ledigPlads}</Text>
        </View>
      ) : (
        <Text>No match found for kode: {kode}</Text>
      )}
      <>
        <View style={{ maxHeight: "70%" }}>
          {matchingElement ? (
            <></>
          ) : (
            <Text>No match found for kode: {kode}</Text>
          )}
        </View>
        <View>
          <Button
            label="Scan QR kode"
            OnPress={() =>
              navigation.navigate("QRPladserJakke", {
                kode: kode,
                ledigPlads: ledigPlads,
              })
            }
            ContainerStyle={styles.buttonContainer}
          />
        </View>
      </>
    </View>
  );
}
