import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Speedometer from 'react-native-speedometer';
import { BACKEND_API_URL } from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';

const LicznikEn = () => {
    const [calkowiteZuzycieRoczne, setCalkowiteZuzycieRoczne] = useState(0);

    useEffect(() => {
        // Zakładam, że account_id to zmienna, którą musisz zdefiniować lub pobrać z innego miejsca
        const account_id = 1; // Przykładowe ID konta, dostosuj do swoich potrzeb
        const url = `${BACKEND_API_URL}/api/account/${account_id}/currentpower/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Zakładam, że odpowiedź z API zawiera pole "total_current_energy"
                setCalkowiteZuzycieRoczne(data.total_current_energy);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania LicznikEn danych o zużyciu energii:', error);
            });
    }, []); // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz po zamontowaniu komponentu

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Roczne zużycie energii</Text>
            <Speedometer
                value={calkowiteZuzycieRoczne}
                totalValue={1000} // Maksymalna wartość na speedometrze, dostosuj do swoich potrzeb
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
