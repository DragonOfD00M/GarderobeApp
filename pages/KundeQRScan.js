import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import SvgQRCode from "react-native-qrcode-svg";

import Button from "../components/Button";
import { styles } from "../components/styles";
import { saveToFile } from "../components/FileHandler";

export default function KundeQRScan({ navigation, route }) {
  const { Navn } = route.params;
  const [pladsnummer, setPladsnummer] = useState(0);

  const handleSave = (text) => {
    navigation.navigate("KundeMainPage");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>KundeQRScan</Text>
      </View>
      <View>
        <SvgQRCode value={Navn} size={300} />
      </View>
      <View style={{ ...styles.inputContaier, alignContents: "center" }}>
        <TextInput
          style={styles.standardText}
          placeholder="Pladsnummer... "
          value={pladsnummer}
          onChangeText={(text) => setPladsnummer(text)}
        />
        {pladsnummer !== 0 && (
          <Button
            label="Gem pladsnummer"
            OnPress={() => handleSave(pladsnummer)}
            ContainerStyle={styles.buttonContainer}
          />
        )}
      </View>
      <Button
        label="Tilbage til forside"
        OnPress={() => navigation.navigate("MainPage")}
        ContainerStyle={styles.buttonContainer}
      />
    </View>
  );
}
