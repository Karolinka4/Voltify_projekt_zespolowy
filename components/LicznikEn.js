import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Speedometer from 'react-native-speedometer';

const zuzycieEnergiiWMiesiacu = [300, 250, 275, 225, 280, 290, 310, 320, 305, 295, 285, 275];
const cenaZaKWhUSD = 0.20; // Cena w USD
const kursUSDPLN = 0.4; // Przelicznik z USD na PLN

const LicznikEn = () => {
  const calkowiteZuzycieRoczne = zuzycieEnergiiWMiesiacu.reduce((acc, current) => acc + current, 0);
  const calkowityKosztRocznyUSD = calkowiteZuzycieRoczne * cenaZaKWhUSD;
  const calkowityKosztRocznyPLN = calkowityKosztRocznyUSD * kursUSDPLN; // Przeliczanie na złotówki

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roczne zużycie energii</Text>
      <Speedometer
        value={calkowiteZuzycieRoczne}
        totalValue={100000} // Maksymalna wartość na speedometrze, dostosuj do swoich potrzeb
        size={290} // Rozmiar speedometru
        outerColor="#d3d3d3"
        internalColor="#ff4500"
        showText
        text={calkowiteZuzycieRoczne.toString()}
        textStyle={{ color: 'green' }}
        showLabels
        labelStyle={{ color: 'blue' }}
        showPercent
        percentStyle={{ color: 'red' }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{calkowiteZuzycieRoczne} kWh</Text>
        <Text style={styles.infoText}>{calkowityKosztRocznyPLN.toFixed(2)} PLN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 900,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ustaw szerokość na 100% kontenera, aby teksty mogły być na przeciwnych stronach
    marginTop: 5,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LicznikEn;
