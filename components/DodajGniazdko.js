import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Image } from 'react-native'; // Zmieniłem import na 'react-native', jeśli używasz 'expo-image', dostosuj import odpowiednio
import { useNavigation, useRoute } from '@react-navigation/native';
import { BACKEND_API_URL } from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';
const DodajGniazdko = ({ device }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getDataFromStorage('@myKey').then((data) => {
      setUserId(data.Key);
    });
  }, []);

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState); // Zaktualizuj stan lokalny

    // Określ, który endpoint powinien zostać wywołany w zależności od nowego stanu
    const endpoint = newState ? 'on' : 'off';

    try {
      const response = await fetch(`${BACKEND_API_URL}/api/account/${userId}/smartplug/${device.id}/${endpoint}/`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Tutaj możesz dodać logikę obsługującą pomyślne przełączenie stanu
    } catch (error) {
      console.error('Error:', error);
      setIsEnabled(!newState); // Przywróć poprzedni stan w przypadku błędu
    }
  };

  return (
    <View style={[styles.tile, { backgroundColor: isEnabled ? '#FF8080' : '#FFC0CB' }]}>
      <View style={styles.header}>
        <Text style={{ color: isEnabled ? '#000' : '#FFF' }}>{device.name}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Pressable style={styles.content} onPress={() => navigation.navigate('Gniazdko', { device: device })}>
        <Image
          style={styles.arwkaIcon}
          resizeMode="cover"
          source={require("../assets/gniazdko.png")}
        />
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  tile: {
    width: 150, // Możesz potrzebować dostosować tę szerokość
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10, // Możesz potrzebować dostosować ten margines
    justifyContent: 'center',
    alignItems: 'center',

  },

  arwkaIcon: {
  height: 70,
  width: 70,
  top:15,
      },

  content:
  {
  justifyContent: 'center',
  alignItems: 'center',


  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,

  },
  content: {
    //flex: 1,
    justifyContent: 'center', // Wyśrodkowanie zawartości
    alignItems: 'center', // Wyśrodkowanie zawartości
  },
});

export default DodajGniazdko;
