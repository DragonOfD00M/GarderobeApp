import React, { useState } from "react";
import { View, Text } from "react-native";
import SvgQRCode from "react-native-qrcode-svg";

import Button from "../components/Button";
import { styles } from "../components/styles";

export default function KundeQRScan({ navigation, route }) {
  const { Navn } = route.params;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>KundeQRScan</Text>
      </View>
      <View>
        <SvgQRCode value={Navn} size={300} />
      </View>
      <View style={{}}>
        <Button
          label="Tilbage til forside"
          OnPress={() => navigation.navigate("MainPage")}
          ContainerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
}
