import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';

import {loadSavedData, saveToFile} from '../components/FileHandler'

import Button from '../components/Button';
import {styles} from '../components/styles';

import dbData from '../data/db.json'


export default function ImportNytSetup({ navigation }) {
    const [showInput, setShowInput] = useState(false);
    const [inputText, setInputText] = useState('');
    
    /*
    // Hvis databasen ligger online kan man uncomment
    const [dbData, setDbData] = useState(null);
    const fetchData = async () => {
        try {
            const response = await fetch('https://eks.com/db.json');
            const data = await response.json();
            setDbData(data)
        }
        catch (error){
            console.error('Error fetching data:', error);
        }
    };
    */

    

    const handleConfirmLogin = async () => {
        setShowInput(false)
        if (!dbData){
            Alert.alert('Error', 'Database not loaded')
        }
        if (inputText.trim() === ''){
            Alert.alert('Error', 'No input');
            return;
        }
        const nameExists = dbData.some(item => item.Kode === inputText.trim());
        if (nameExists) {
            dbData.forEach(item => {
                if (item.Kode === inputText.trim()){
                    saveToFile(item.Navn, inputText.trim())
                    navigation.navigate('GMainPage', {kode: item.Kode})
                }
            })
        } else {}

    }
    return (
      <View style={styles.mainContainer}>
          <View style={{borderColor: "black", borderWidth:2}}>
            <>
                <Button 
                label="Indtast Kode"
                OnPress = {() => setShowInput(true)}
                ContainerStyle={styles.textShowContainer}
                />
            </>
            <>
                {showInput && (
                    <>
                      <TextInput
                        placeholder='Indtast Kode...'
                        value={inputText}
                        onChangeText={setInputText}
                      />
                      <Button
                        label="Confirm"
                        OnPress={handleConfirmLogin}
                        ContainerStyle={styles.textShowContainer}
                      />
                    </>
                )}
            </>
        </View>
      </View>
    );
}
