import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import Button from './Button';

export default function MainPage({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Garderobe</Text>
      </View>
      <View style={{alignSelf: "center"}}>
        <Text style={{fontSize: 25}}>Velkommen</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={{justifyContent: "flex-start"}}>
          <Button label="Login som personale" OnPress={() => navigation.navigate('PersonaleLogin')} />
        <View style={{height: "60%"}}></View>
        </View>
        <View style={{justifyContent: "flex-end"}}>
            <Button label="Placer din jakke" OnPress={() => navigation.navigate('PersonaleLogin')} />
        </View>

      </View>
    </View>
  );
}
