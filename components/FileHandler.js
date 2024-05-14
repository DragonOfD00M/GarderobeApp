/*FileHandler.js indeholder brugerdefinerede funktioner til at gemme, loade og slette filer.
Det fungerer med expo's FileSystem, så filen bliver gemt lokalt i appen.*/

import * as FileSystem from "expo-file-system";

export const loadSavedData = async (fileName) => {
  /*loadSavedData tager et filnavn som en parameter og læser den data der ligger i filen
  Den bliver brugt til json filer.*/
  try {
    const filePath = FileSystem.documentDirectory + fileName;
    const savedData = await FileSystem.readAsStringAsync(filePath);
    console.log("Found file and loaded data");
    return JSON.parse(savedData);
  } catch (error) {
    return [];
  }
};

export const saveToFile = async (fileName, Navn, Kode, Pladser) => {
  try {
    const savedData = { Navn, Kode, Pladser };
    const filePath = FileSystem.documentDirectory + fileName;

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
      // Fejlen sker hvis filen ikke er der. Så laves en ny fil.
    }
    // Dernest checkes om der allerede er en fil med den kode:
    const existingDataIndex = existingData.findIndex(
      (item) => item.Kode === Kode
    );
    if (existingDataIndex !== -1) {
      // Her opdateres navnet for den eksisterende kode.
      existingData[existingDataIndex].Navn = Navn;
      existingData[existingDataIndex].Pladser = Pladser;
    } else {
      // Hvis der ikke er en garderobe med den kode, så lav en ny
      existingData.push(savedData);
    }

    // Til sidst skrives til filen.
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(existingData));
    console.log(`Path: ${filePath}`);
    console.log(`Data appended to ${fileName}`);
  } catch (error) {}
};

export const deleteSavedFile = async (fileName) => {
  try {
    const filePath = FileSystem.documentDirectory + fileName;
    await FileSystem.writeAsStringAsync(filePath, "[]");
    console.log(`saved.json cleared successfully`);
  } catch (error) {
    console.error(`Error deleting ${fileName}:`, error);
  }
};
