import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
// Note: Make sure the import path for Image is correct. If you're using expo-image, adjust accordingly.
// import { Image } from "expo-image";
import DodajZarowke from '../components/DodajZarowke';
import DodajGniazdko from '../components/DodajGniazdko';

const WszystkieUrzadzenia = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.pomieszczenie}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            style={styles.strzakabbIcon}
            resizeMode="cover"
            source={require("../assets/strzakabb.png")}
          />
        </Pressable>
        <Text style={styles.headerText}>Urządzenia</Text>
      </View>

      <View style={styles.ustawienie}>
        <DodajZarowke />
        <DodajGniazdko />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ustawienie: {
    flexDirection: "row", // Ustawienie elementów w poziomie
    justifyContent: 'space-around', // Rozłożenie elementów równomiernie z zachowaniem odstępu na końcach
    alignItems: 'center', // Wyśrodkowanie elementów w pionie
    marginTop: -20, // Ustawienie odległości od góry
  },
  header: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically in the container
    justifyContent: 'center', // Center items horizontally in the container
    width: '100%', // Take full width to utilize the space for centering
    marginTop: 80, // Add some space between the header and the content
  },
  strzakabbIcon: {
    height: 50, // Adjust the height as needed
    width: 50, // Adjust the width as needed
    marginRight: 10, // Add some space between the icon and the text
  },
  headerText: {
    fontSize: 25, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold
  },
  pomieszczenie: {
    flex: 1,
    overflow: "hidden",
  },
  backButton: {
    position: 'absolute',
    left: 20, // Adjust the position as needed
    top: -10, // Adjust the position as needed
  },
});

export default WszystkieUrzadzenia;
