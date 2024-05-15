import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Alert } from "react-native";
import Button from "../components/Button";
import { styles } from "../components/styles";

import { saveToFile, loadSavedData } from "../components/FileHandler";

import dbData from "../data/db.json";

export default function QRFjernJakke({ navigation, route }) {
  const { kode } = route.params;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [result, setResult] = useState("");
  const [brugerPlads, setBrugerPlads] = useState(0);

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

  const handleScan = (result) => {
    setScanned(true);
    setResult(result);
    pladser.forEach((item) => {
      if (matchingElement.Pladser[item.key] === result) {
        setBrugerPlads(item.key);
      }
    });
  };

  const confirmScan = () => {
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

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.mainContainer}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button label="Request permission" OnPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      {scanned ? (
        <View style={styles.mainContainer}>
          <Text style={styles.standardText}>Jakkens ejer er: {result}</Text>
          {brugerPlads !== 0 ? (
            <>
              <Text style={styles.standardText}>
                {" "}
                {result} har jakker på pladserne:
              </Text>
              <Text style={styles.standardText}> {brugerPlads}</Text>
              <Button
                label="Fjern jakke"
                OnPress={confirmScan}
                ContainerStyle={styles.buttonContainer}
              />
            </>
          ) : (
            <View>
              <Text style={styles.standardText}>
                {" "}
                {result} har ingen jakker i garderoben
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
        </View>
      ) : (
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={(result) => handleScan(result.data)}
        />
      )}
    </View>
  );
}
