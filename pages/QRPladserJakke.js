import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Alert } from "react-native";
import Button from "../components/Button";
import { styles } from "../components/styles";

import { saveToFile, loadSavedData } from "../components/FileHandler";

import dbData from "../data/db.json";

export default function QRPladserJakke({ navigation, route }) {
  const { kode, ledigPlads } = route.params;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
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

  const matchingElement = savedData.find((item) => item.Kode === kode);
  const pladser = matchingElement
    ? Object.entries(matchingElement.Pladser).map(([key, value]) => ({
        key,
        value,
      }))
    : [];

  const handeScan = (result) => {
    setScanned(true);
    matchingElement.Pladser[ledigPlads] = result;
    saveToFile(
      "saved.json",
      matchingElement.Navn,
      kode,
      matchingElement.Pladser
    );
    console.log(ledigPlads, matchingElement.Pladser[ledigPlads]);
    console.log(matchingElement);
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
        <></>
      ) : (
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={(result) => handeScan(result.data)}
        />
      )}
    </View>
  );
}
