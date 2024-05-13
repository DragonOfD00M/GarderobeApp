/*FileHandler.js indeholder brugerdefinerede funktioner til at gemme, loade og slette filer.
Det fungerer med expo's FileSystem, så filen bliver gemt lokalt i appen.*/

import * as FileSystem from 'expo-file-system';


export const loadSavedData = async () => {
  /*loadSavedData tager et filnavn som en parameter og læser den data der ligger i filen
  Den bliver brugt til json filer.*/
  try {
      const filePath = FileSystem.documentDirectory + 'saved.json';
      const savedData = await FileSystem.readAsStringAsync(filePath);
      console.log("Found file and loaded data")
      return JSON.parse(savedData);
  }catch (error) {
      console.log("No file found, returning empty array");
      return [];
  }
};

export const saveToFile = async ( Navn, Kode ) => {
  try {
      const savedData = { Navn, Kode };
      const filePath = FileSystem.documentDirectory + 'saved.json';
      
      // Først checkes om filen allerede eksistere:
      let existingData = [];
      try {
          const existingDataText = await FileSystem.readAsStringAsync(filePath);
          existingData = JSON.parse(existingDataText);
          // Check om existingData er et array
          if (!Array.isArray(existingData)) {
              existingData = [];
          }
      } catch (error) {
          // Fejlen sker hvis filen ikke er der.
          console.error('Error reading existing data:', error);
      }
      // Dernest checkes om der allerede er en fil med den kode:
      const existingDataIndex = existingData.findIndex(item => item.Kode === Kode);
      if (existingDataIndex !== -1) {
          // Her opdateres navnet for den eksisterende kode.
          existingData[existingDataIndex].Navn = Navn;
      } else {
          // Hvis der ikke er en garderobe med den kode, så lav en ny
          existingData.push(savedData);
      }
      
      // Til sidst skrives til filen.
      await FileSystem.writeAsStringAsync(
          filePath,
          JSON.stringify(existingData)
      );
      console.log(`Path: ${filePath}`)
      console.log(`Data appended to saved.json`);
  } catch (error) {
      console.error(`Error saving to saved.json:`, error);
  }
};

export const deleteSavedFile = async () => {
  try {
    const filePath = FileSystem.documentDirectory + 'saved.json';
    await FileSystem.writeAsStringAsync(filePath, '[]');
    console.log(`saved.json cleared successfully`);
  } catch (error) {
    console.error(`Error deleting saved.json:`, error);
  }
};
