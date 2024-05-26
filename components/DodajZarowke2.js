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

//    useEffect(() => {
//         getDataFromStorage('@myKey').then((data) => {
//             setUserId(data.Key);
//         });
//
//         if(device.power){
//            setIsEnabled(true);
//         } else {
//             setIsEnabled(false);
//         }
//    }, []);


    return (

        <View style={[styles.tile, { backgroundColor: isEnabled ? '#FFF' : '#000' }]}>
            <View style={styles.header}>
                <Text style={{ color: isEnabled ? '#000' : '#FFF' }}>{device.name}</Text>
            </View>
            <Pressable style={styles.content} onPress={() => navigation.navigate('EnergiaZarowka', { device: device })}>
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
