import React from 'react';
import { View, StyleSheet } from 'react-native';
import DodajZarowke from '../components/DodajZarowke';
import DodajGniazdko from '../components/DodajGniazdko';

const WszystkieUrzadzenia = () => {
  return (
    <View style={styles.ustawienie}>
      <DodajZarowke />
      <DodajGniazdko />


    </View>
  );
};

const styles = StyleSheet.create({
  ustawienie: {

    flexDirection: "row", // Ustawienie elementów w poziomie
    justifyContent: 'space-around', // Rozłożenie elementów równomiernie z zachowaniem odstępu na końcach
    alignItems: 'center', // Wyśrodkowanie elementów w pionie
  },
});

export default WszystkieUrzadzenia;
