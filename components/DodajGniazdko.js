import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
const DodajGniazdko = () => {
  const [isEnabled, setIsEnabled] = useState(false);
    const navigation = useNavigation();
  // Funkcja zmieniająca stan przełącznika
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[styles.tile, { backgroundColor: isEnabled ? '#FF8080' : '#FFC0CB' }]}>
      <View style={styles.header}>
        <Text style={{ color: isEnabled ? '#000' : '#FFF' }}>Gniazdko</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
       <Pressable style={styles.content} onPress={() => navigation.navigate('Gniazdko')}>
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
    width: 165, // Ustawienie szerokości kafelka
    height: 165, // Ustawienie wysokości kafelka, aby był kwadratem
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10, // Dodano margines dla lepszego wyświetlania
    justifyContent: 'center', // Centrowanie zawartości
    alignItems: 'center', // Centrowanie zawartości
    marginTop: 70,
  },
  arwkaIcon: {
  height: 70,
  width: 70,
   top: "6.93%",
    right: "33.92%",
     bottom: "33.6%",
      left: "1%",
      },

  content:
  { // flex: 1,
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
    flex: 1,
    justifyContent: 'center', // Wyśrodkowanie zawartości
    alignItems: 'center', // Wyśrodkowanie zawartości
  },
});

export default DodajGniazdko;
