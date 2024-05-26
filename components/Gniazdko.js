import * as React from "react";
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import { BACKEND_API_URL } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';
import EnergiaGniazdko from '../screens/EnergiaGniazdko';

/*
##########################################################################
Wygląd Gniazdka
###########################################################################
*/


const Gniazdko = () => {
    const navigation = useNavigation();
    // Stan do śledzenia, czy przycisk jest wciśnięty
    const [isPressed, setIsPressed] = useState(false);
    const [userId, setUserId] = useState(null);
    const route = useRoute();
    const { device } = route.params;

    useEffect(() => {
        // Przykład użycia funkcji do odczytu danych
        getDataFromStorage('@myKey').then((data) => {
            setUserId(data.Key);
        });
     if(device.power){
        setIsPressed(true);
     } else {
        setIsPressed(false);
     }

    }, []);

    // Funkcja zmieniająca stan
    const togglePress = () => {
        if (isPressed) {
            turnOffPlug(); // Wyłącz gniazdko, jeśli jest włączone
        } else {
            turnOnPlug(); // Włącz gniazdko, jeśli jest wyłączone
        }
        setIsPressed(!isPressed); // Zaktualizuj stan
    };

    const turnOnPlug = async () => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/api/account/${userId}/smartplug/${device.id}/on/`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const turnOffPlug = async () => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/api/account/${userId}/smartplug/${device.id}/off/`, {
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
        <View style={styles.gniazdko}>
            <Pressable style={styles.rectangleParent}>
                <View style={[styles.frameChild, styles.framePosition]} />
                <Image
                    style={[styles.edit02Icon, styles.iconLayout1]}
                    resizeMode="cover"
                    source={require("../assets/edit021.png")}
                />
            </Pressable>
            <View style={styles.gniazdkoChild} />
            <Pressable style={[styles.rectangleGroup, styles.rectanglePosition]}>
                <View style={[styles.frameItem, styles.framePosition]} />
                <Image
                    style={[styles.harmonogramIcon, styles.iconLayout]}
                    resizeMode="cover"
                    source={require("../assets/harmonogram2.png")}
                />
                <Text style={[styles.action, styles.actionTypo]}>Action</Text>
            </Pressable>
            <Pressable style={[styles.rectangleContainer, styles.rectanglePosition]} onPress={() => navigation.navigate('EnergiaGniazdko', { device: device })}>
                <View style={[styles.frameItem, styles.framePosition]} />
                <Image
                    style={[styles.energyIcon, styles.iconLayout]}
                    resizeMode="cover"
                    source={require("../assets/energy1.png")}
                />
                <Text style={[styles.action, styles.actionTypo]}>Energy</Text>
            </Pressable>
            <Pressable onPress={() => navigation.goBack()}>
                <Image
                    style={[styles.strzakabbIcon, styles.iconLayout1]}
                    resizeMode="cover"
                    source={require("../assets/strzakabb2.png")}
                />
            </Pressable>
            <View style={[styles.przyciskOnbb, styles.rectanglePosition]}>
                <Pressable style={[styles.przyciskOnoff, styles.przyciskPosition]} onPress={togglePress}>
                    <Image
                        style={[styles.przyciskOnoffChild, styles.przyciskPosition]}
                        resizeMode="cover"
                        source={require("../assets/ellipse-331.png")}
                    />

                    <Image
                        style={[styles.przyciskOnoffItem, styles.iconLayout1]}
                        resizeMode="cover"
                        source={isPressed ? require("../assets/on.png") : require("../assets/off.png")}
                    />
                </Pressable>
            </View>
            <Text style={[styles.gniazdko1, styles.actionTypo]}>{device.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    framePosition: {
        backgroundColor: Color.colorGainsboro,
        right: "0%",
        left: "0%",
        top: "0%",
        width: "100%",
    },
    // wielkosc przycisku do wyłączania
    iconLayout1: {
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",

    },
    rectanglePosition: {
        bottom: "12.44%",
        position: "absolute",
    },
    //wielkosc ikon harmonogram i energia
    iconLayout: {
        height: "70.43%",
        maxHeight: "100%",
        maxWidth: "60%",
        position: "absolute",
        overflow: "hidden",
    },
    // pozycja napisów energy i harmonogram
    actionTypo: {
        textAlign: "center",
        fontFamily: FontFamily.latoBold,
        fontWeight: "700",
        letterSpacing: 0,
        position: "absolute",
    },
    //przycisk wyłaczania
    przyciskPosition: {
        width: 162,
        marginLeft: -81,
        left: "50%",
        height: "100%",
        position: "absolute",
        top: 20,
    }, //wysokosc do edycji
    frameChild: {
        bottom: "0%",
        height: "100%",
        right: "0%",
    },
    //edytowanie
    edit02Icon: {
        height: "72.05%",
        width: "62.86%",
        top: "-9%",
        right: "22.68%",
        bottom: "13.86%",
        left: "14.46%",
        maxHeight: "100%",
    },
    //pole edycji
    rectangleParent: {
        height: "5.21%",
        width: "14.36%",
        top: "5.92%",
        right: "7.18%",
        bottom: "88.86%",
        left: "78.46%",
        position: "absolute",
    },
    //pozycja szarego pola
    gniazdkoChild: {
        height: "10.9%",
        marginLeft: -181,
        top: "82%",
        bottom: "9.72%",
        borderRadius: 70,
        backgroundColor: "#e6e6e6",
        borderStyle: "solid",
        borderColor: "rgba(184, 184, 184, 0.01)",
        borderWidth: 1,
        width: 335,
        left: "53.5%",
        position: "absolute",
    },
    frameItem: {
        height: "96.17%",
        bottom: "3.83%",
    },
    //wielkosc ikonki harmonogram
    harmonogramIcon: {
        width: "80.97%",
        top: "2%",
        right: "26.61%",
        bottom: "33.83%",
        left: "25.42%",
    },
    //napisy
    action: {
        height: "60.38%",
        top: "73.62%",
        fontSize: FontSize.size_4xs,
        color: Color.czcionka,
        left: "1%",
        textAlign: "center",
        fontFamily: FontFamily.latoBold,
        fontWeight: "700",
        letterSpacing: 0,
        width: "100%",
    },
    rectangleGroup: {
        width: "20.13%",
        right: "74.62%",
        left: "7.26%",
        top: "84%",
        height: "5.57%",
        bottom: "12.44%",
    },
    //wielkosc ikonki energia
    energyIcon: {
        width: "60%",
        top: "3%",
        right: "26.83%",
        bottom: "32.13%",
        left: "35%",

    },
    rectangleContainer: {
        width: "20",
        right: "9.74%",
        left: "72%",
        top: "84%",
        height: "6%",
        bottom: "12.44%",
    },

    strzakabbIcon: {
        height: "26%",
        width: "15%",
        top: "35%",
        right: "79.49%",
        bottom: "88.63%",
        left: "9%",
        // maxHeight: "100%",
    },
    przyciskOnoffChild: {
        maxHeight: "100%",
        bottom: "0%",
        top: "1%",
        width: 162,
        marginLeft: -81,
    },
    przyciskOnoffItem: {
        height: "90%",
        width: "90.33%",
        top: "15.48%",
        right: "8.64%",
        bottom: "12.48%",
        left: "5%",
        maxHeight: "100%",
    },
    przyciskOnoff: {
        top: "3.73%",
        bottom: "-3.73%",
    },
    przyciskOnbb: {
        height: "20%",
        width: "36.41%",
        top: "65%",
        right: "31.79%",
        left: "31.79%",
    },
    //napis gniazdko
    gniazdko1: {
        top: 81,
        left: 130,
        fontSize: 20,
        color: Color.colorBlack,
        width: 125,
        height: 45,
    },
    gniazdko: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        height: 844,
        overflow: "hidden",
        width: "100%",
    },
});

export default Gniazdko;
