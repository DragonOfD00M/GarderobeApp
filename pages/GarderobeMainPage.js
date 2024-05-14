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
  const database = dbData.find((item) => item.Kode === kode);
  const data = database
    ? Object.entries(database.Pladser).map(([key, value]) => ({ key, value }))
    : [];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Garderobe</Text>
        <Text style={styles.titleText}>Forside</Text>
      </View>
      {matchingElement ? (
        <Text>Navn: {matchingElement.Navn}</Text>
      ) : (
        <Text>No match found for kode: {kode}</Text>
      )}
      <>
        <View style={{ maxHeight: "70%" }}>
          {database ? (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Text style={{ margin: 5 }}>
                  {item.key}: {item.value}
                </Text>
              )}
              keyExtractor={(item) => item.key}
              numColumns={Math.floor(Dimensions.get("window").width / 100)} // Adjust the column width as needed
              contentContainerStyle={{ flexDirection: "column" }}
            />
          ) : (
            <Text>No match found for kode: {kode}</Text>
          )}
        </View>
        <View>
          <Button
            label="Scan QR kode"
            OnPress={() => navigation.navigate("MainPage")}
            ContainerStyle={styles.buttonContainer}
          />
        </View>
      </>
    </View>
  );
}
