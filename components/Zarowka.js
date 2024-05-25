import * as React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import Slider from '@react-native-community/slider';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';
import { BACKEND_API_URL } from '@env';
import EnergiaZarowka from '../screens/EnergiaZarowka';
/*
##########################################################################
Wygląd Żarówki
##########################################################################
*/

const Zarowka = () => {
    const navigation = useNavigation();
    const [brightness, setBrightness] = useState(1); // Zakładamy, że 1 to pełna jasność
    const [isPressed, setIsPressed] = useState(false);
    const [userId, setUserId] = useState(null);
    const [brightnessOff, setBrightnessOff] = useState(0); //Jest potrzebne, żeby Ci nie skakało, rozwiązanie zrobione na kolanie
    const route = useRoute();
    const { device } = route.params;


    useEffect(() => {
        // Przykład użycia funkcji do odczytu danych
        getDataFromStorage('@myKey').then((data) => {
            setUserId(data.Key);
        });
    }, []);

    const togglePress = async () => {
        setIsPressed(!isPressed); // Zaktualizuj stan
        if (!isPressed) {
            await turnOnBulb(); // Włącz żarówkę, jeśli jest wyłączona
        } else {
            await turnOffBulb(); // Wyłącz żarówkę, jeśli jest włączona
        }
    };


    const setBulbBrightness = async (brightnessValue) => {
        const bulbId = '4'; // Przykładowe ID żarówki, które powinno być dostosowane do Twojego przypadku
        try {
            const response = await fetch(`${BACKEND_API_URL}/api/account/${userId}/smartbulb/${bulbId}/brightness/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: bulbId,
                    brightness: brightnessValue * 10,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Tutaj możesz dodać kod do obsługi odpowiedzi, np. aktualizacji stanu UI
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const turnOnBulb = async () => {
        const bulbId = '4';
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
        const bulbId = '4';
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
        <View style={styles.zarowka}>
            <View style={styles.zarowkaChild} />
            <View style={styles.arwka1Wrapper}>
                <Text style={styles.arwka1}>{device.name}</Text>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.strzakabbIcon, styles.frameIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/strzakabb1.png")}
                    />
                </Pressable>

            </View>

            <View style={styles.ellipseParent}>
                <Image
                    style={[styles.frameChild, styles.frameIconLayout]}
                    resizeMode="cover"
                    source={require("../assets/ellipse-1801.png")}
                />
                <Image
                    style={[styles.frameItem, styles.frameIconLayout]}
                    resizeMode="cover"
                    source={require("../assets/ellipse-1802.png")}
                />
                <Image
                    style={[styles.arwkaIcon, styles.frameIconLayout, { opacity: brightness }]}
                    resizeMode="cover"
                    source={require("../assets/arwka.png")}
                />
            </View>

            <View style={styles.sliderContainer}>
                {isPressed ? <Slider
                    style={styles.slider}
                    minimumValue={0.3}
                    maximumValue={1}
                    minimumTrackTintColor="#C1C1C0"
                    maximumTrackTintColor="#E2E2E2"
                    value={brightness}
                    onValueChange={(value) => {
                        setBrightness(value); // Aktualizacja lokalnego stanu jasności
                        setBulbBrightness(value); // Wysłanie żądania do serwera w celu zmiany jasności żarówki
                    }}

                /> : <Slider
                    style={styles.sliderOff}
                    minimumValue={0.2}
                    maximumValue={0.2}
                    minimumTrackTintColor="#C1C1C0"
                    maximumTrackTintColor="#E2E2E2"
                    value={brightnessOff}
                    onValueChange={setBrightnessOff}
                />
                }
            </View>
            <View style={styles.neonizeGroup}>
                <LinearGradient
                    style={[styles.spread, styles.spreadPosition]}
                    locations={[0, 1]}
                    colors={["#232423", "#0f0f0f"]}
                />
                <View style={styles.intensity} />
                <LinearGradient
                    style={styles.spreadPosition}
                    locations={[0, 1]}
                    colors={["#060805", "#060805"]}
                />

                <Pressable style={[styles.rectangleParent, styles.rectanglePosition]}>
                    <View style={[styles.frameInner, styles.frameChildPosition]} />
                    <Image
                        style={[styles.paletaColorwIcon, styles.iconPosition]}
                        resizeMode="cover"
                        source={require("../assets/paletacolorw.png")}
                    />
                    <Text style={[styles.color, styles.colorTypo]}>Color</Text>
                </Pressable>
                <Pressable style={[styles.rectangleGroup, styles.rectanglePosition]}>
                    <View style={[styles.frameInner, styles.frameChildPosition]} />
                    <Image
                        style={[styles.harmonogramIcon, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/harmonogramm.png")}
                    />
                    <Text style={[styles.color, styles.colorTypo]}>Action</Text>
                </Pressable>
                <Pressable style={[styles.rectangleContainer, styles.onoff1bbPosition]} onPress={() => navigation.navigate('EnergiaZarowka', { device: device })}>

                    <View style={[styles.frameInner, styles.frameChildPosition]} />
                    <Image
                        style={[styles.energyIcon, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/energy.png")}
                    />
                    <Text style={[styles.color, styles.colorTypo]}>Energy</Text>
                </Pressable>
                <Pressable style={[styles.onoff1bb, styles.onoff1bbPosition]} onPress={togglePress}>
                    <View style={[styles.onoff1bbChild, styles.frameChildPosition]} />
                    <Image
                        style={[styles.onoffIcon, styles.frameIconLayout]}
                        resizeMode="cover"
                        source={isPressed ? require("../assets/onoffon.png") : require("../assets/onoff.png")}
                    />
                    <Text style={[styles.turnOff, styles.colorTypo]}>
                        {isPressed ? 'TURN ON' : 'TURN OFF'}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.frameView}>
                <View style={[styles.frameChild2, styles.frameChildPosition]} />
                <Image
                    style={[styles.edit02Icon, styles.frameIconLayout]}
                    resizeMode="cover"
                    source={require("../assets/edit021.png")}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    frameIconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",

        // position: "absolute",
        overflow: "hidden",
    },


    rectanglePosition: {
        bottom: "12.77%",
        top: "12.62%",
        width: "19.24%",
        height: "74.62%",
        position: "absolute",
    },
    frameChildPosition: {
        backgroundColor: Color.colorGainsboro,
        left: "0%",
        right: "0%",
        position: "absolute",
        width: "100%",
    },
    sliderContainer: {
        paddingHorizontal: 20, // Dodaje odstępy po bokach, aby slider nie rozciągał się na całą szerokość ekranu
        marginTop: 435, // Dodaje odstęp na górze, aby oddzielić slider od obrazu
    },

    slider: {
        width: '100%', // Zapewnia, że slider będzie miał szerokość zgodną z kontenerem
        height: 40, // Określa wysokość slidera, aby był łatwy w obsłudze
    },

    sliderOff: {
        width: '100%', // Zapewnia, że slider będzie miał szerokość zgodną z kontenerem
        height: 40, // Określa wysokość slidera, aby był łatwy w obsłudze
        opacity: 0, // Ustawia przezroczystość slidera

    },

    colorTypo: {
        color: Color.czcionka,
        fontSize: FontSize.size_4xs,
        left: "0%",
        textAlign: "center",
        fontFamily: FontFamily.latoBold,
        fontWeight: "700",
        letterSpacing: 0,
        position: "absolute",
        width: "100%",
    },
    iconLayout: {
        left: "25.4%",
        right: "26.72%",
        width: "47.88%",
        height: "60.41%",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    onoff1bbPosition: {
        top: "15%",
        position: "absolute",
    },
    zarowkaChild: {
        width: "87.69%",
        right: "4.62%",
        left: "7.69%",
        borderRadius: 60,
        backgroundColor: "rgba(165, 165, 165, 0.13)",
        bottom: "15.52%",
        top: "76.78%",
        height: "9.7%",
        position: "absolute",
    },
    //napis zarowka
    arwka1: {
        width: "109.93%",
        left: "5%",
        fontSize: 20,
        color: Color.colorGray_100,
        textAlign: "center",
        fontFamily: FontFamily.latoBold,
        fontWeight: "700",
        letterSpacing: 0,
        top: "2%",
        height: "100%",
        position: "absolute",
    },

    arwka1Wrapper: {
        height: "80.27%",
        width: "35.38%",
        top: "9%",
        right: "32.05%",
        bottom: "86.73%",
        left: "32.56%",
        position: "absolute",
    },
    frameChild: {
        left: "0%",
        right: "0%",
        maxWidth: "100%",
        bottom: "0%",
        top: "0%",
        height: "100%",
        width: "100%",
    },

    frameItem: {
        height: "76.9%",
        width: "79.08%",
        top: "-88%",
        right: "10.46%",
        bottom: "11.53%",
        left: "10.46%",
    },
    //zarowka
    arwkaIcon: {
        height: "42.48%",
        width: "32.5%",
        top: "-150%",
        right: "33.92%",
        bottom: "33.6%",
        left: "33.58%",
    },
    ellipseParent: {
        height: "28.67%",
        width: "66.67%",
        top: "26.07%",
        right: "14.87%",
        bottom: "45.26%",
        left: "18.46%",
        position: "absolute",
    },


    paletaColorwIcon: {
        width: "43.5%",
        right: "26.86%",
        left: "29.64%",
        height: "60.41%",
        top: "7.63%",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    color: {
        height: "80.39%",
        top: "70.61%",
    },
    rectangleParent: {
        right: "51.77%",
        left: "28.99%",
    },
    harmonogramIcon: {
        top: "5.57%",
        bottom: "34.02%",
    },
    rectangleGroup: {
        right: "28.17%",
        left: "52.58%",
    },
    energyIcon: {
        bottom: "31.96%",
        top: "11%",
    },
    rectangleContainer: {
        right: "4.61%",
        bottom: "15.54%",
        left: "76.15%",
        width: "19.24%",
        height: "74.62%",
        top: "9.85%",
    },
    onoff1bbChild: {
        height: "96.24%",
        top: "3.76%",
        bottom: "0%",
        backgroundColor: Color.colorGainsboro,
    },
    onoffIcon: {
        height: "73.66%",
        width: "57.74%",
        right: "21.13%",
        bottom: "26.34%",
        left: "21.13%",
        top: "0%",
    },
    turnOff: {
        height: "90.82%",
        top: "67.66%",
    },
    onoff1bb: {
        height: "85.85%",
        width: "20.87%",
        right: "73.43%",
        bottom: "4.31%",
        left: "5.7%",
    },
    neonizeGroup: {
        width: "91.28%",
        right: "2.56%",
        left: "6.15%",
        borderRadius: Border.br_31xl,
        bottom: "15.52%",
        top: "76.78%",
        height: "7.7%",
        position: "absolute",
        overflow: "hidden",
    },

    //edytowanie
    edit02Icon: {
        height: "82.05%",
        width: "62.86%",
        top: -450,
        right: "22.68%",
        bottom: "13.86%",
        left: "14.46%",

    },

    frameView: {
        height: "5.45%",
        width: "13.85%",
        top: "8.18%",
        right: "7.95%",
        bottom: "86.37%",
        left: "78.21%",
        //position: "absolute",
    },
    //strzałka lewa
    strzakabbIcon: {
        height: "30%",
        width: "45%",
        right: "79.49%",
        left: -87,
        top: "0%",
    },

    zarowka: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        height: 844,
        overflow: "hidden",
        width: "100%",
    },
    spread: {
        shadowColor: "#2e2e2e",
        shadowRadius: 0,
        elevation: 0,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        backgroundColor: Color.kolorStrzaki,
    },
    intensity: {
        shadowColor: "rgba(64, 63, 63, 0.1)",
        shadowRadius: 8.5,
        elevation: 8.5,
        display: "none",
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 0,
        }
    },

});

export default Zarowka;
