import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Image, FlatList } from 'react-native';
// Note: Make sure the import path for Image is correct. If you're using expo-image, adjust accordingly.
// import { Image } from "expo-image";
import DodajZarowke from '../components/DodajZarowke';
import DodajGniazdko from '../components/DodajGniazdko';
import { BACKEND_API_URL } from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';

const WszystkieUrzadzenia = ({ accountId }) => {
    const navigation = useNavigation();
    const [devices, setDevices] = useState([]);
    const [userId, setUserId] = useState(null);



    useEffect(() => {
        getDataFromStorage('@myKey').then((data) => {
            setUserId(data.Key);
        });

        if (userId) {
            fetch(`${BACKEND_API_URL}/api/account/${userId}/device/`)//### Ten użytkownik nr 1 jest na sztywno
                .then(response => response.json())
                .then(data => {
                    setDevices(data); // Assuming the server response is the array of devices
                })
                .catch(error => {
                    console.error('Error fetching data on WszystkieUrzadzenia: ', error);
                });
        }
    }, [userId]);


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
            <FlatList style={[styles.lista]}
                data={devices}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    let ComponentToRender = null;
                    if (item.device_type === 'SmartPlug') {
                        ComponentToRender = DodajGniazdko;
                    } else if (item.device_type === 'SmartBulb') {
                        ComponentToRender = DodajZarowke;
                    }

                    return ComponentToRender ? <ComponentToRender device={item} /> : null;
                }}
                contentContainerStyle={styles.listCon}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    listCon: {
        paddingHorizontal: 10,

    },
    lista: {
        marginTop: 35,
    },

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
