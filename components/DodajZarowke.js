import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Image } from 'react-native'; // Jeśli używasz expo-image, upewnij się, że jest poprawnie zainstalowane i zaimportowane
import { useNavigation, useRoute } from '@react-navigation/native';
import { BACKEND_API_URL } from '@env'; // Upewnij się, że ten plik istnieje i zawiera odpowiednią zmienną środowiskową
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';
// Zakładamy, że getDataFromStorage jest wcześniej zdefiniowaną funkcją
// Jeśli nie, musisz ją zaimplementować lub usunąć odniesienie
// import { getDataFromStorage } from 'gdzieś';

const DodajZarowke = ({ device }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [userId, setUserId] = useState(null); // Zakładamy, że userId jest potrzebne
    const navigation = useNavigation();

    useEffect(() => {
        // Przykład użycia funkcji do odczytu danych
        // getDataFromStorage('@myKey').then((data) => {
        //     setUserId(data.Key);
        // });
        // Zakomentowane, ponieważ funkcja getDataFromStorage nie jest zdefiniowana w tym przykładzie
    }, []);

    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState);
        if (!isEnabled) {
            await turnOnBulb(); // Włącz żarówkę, jeśli jest wyłączona
        } else {
            await turnOffBulb(); // Wyłącz żarówkę, jeśli jest włączona
        }
    };

    const turnOnBulb = async () => {
        const bulbId = '4'; // Upewnij się, że to jest prawidłowy identyfikator żarówki
        try {
            const response = await fetch(`${BACKEND_API_URL}/api/account/${userId}/smartbulb/${bulbId}/on/`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const turnOffBulb = async () => {
        const bulbId = '4'; // Upewnij się, że to jest prawidłowy identyfikator żarówki
        try {
            const response = await fetch(`${BACKEND_API_URL}/api/account/${userId}/smartbulb/${bulbId}/off/`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <View style={[styles.tile, { backgroundColor: isEnabled ? '#FFF' : '#000' }]}>
            <View style={styles.header}>
                <Text style={{ color: isEnabled ? '#000' : '#FFF' }}>{device.name}</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <Pressable style={styles.content} onPress={() => navigation.navigate('Zarowka', { device: device })}>
                <Image
                    style={styles.arwkaIcon}
                    resizeMode="cover"
                    source={require("../assets/arwka.png")}
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
        top: 15,

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
        //flex: 1,
        justifyContent: 'center', // Wyśrodkowanie zawartości
        alignItems: 'center', // Wyśrodkowanie zawartości
    },
});

export default DodajZarowke;
