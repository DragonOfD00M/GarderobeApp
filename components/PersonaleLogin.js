import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import {styles} from './styles'
export default function PersonaleLogin({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Text>PersonaleLogin</Text>
      <Button label="Tilbage til forside" OnPress={() => navigation.navigate('MainPage')} />
    </View>
  );
}
