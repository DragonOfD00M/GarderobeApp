import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import {styles} from '../components/styles'
export default function KundeQRScan({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Text>KundeQRScan</Text>
      <Button label="Tilbage til forside" OnPress={() => navigation.navigate('MainPage')} />
    </View>
  );
}
