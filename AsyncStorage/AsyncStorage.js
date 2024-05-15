import AsyncStorage from '@react-native-async-storage/async-storage';

// Funkcja odczytująca dane z AsyncStorage
export const getDataFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Błąd podczas odczytywania danych:', error);
    return null;
  }
};

// Funkcja zapisująca dane do AsyncStorage
export const storeDataFromStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Dane zostały pomyślnie zapisane do AsyncStorage.');
  } catch (error) {
    console.error('Błąd podczas zapisywania danych:', error);
  }
};
