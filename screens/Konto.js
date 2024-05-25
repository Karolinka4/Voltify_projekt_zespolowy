import React from "react";
import { Image, StyleSheet, View, Pressable, Text } from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';


/*
##########################################################################
Wygląd Konta urzytkownika
###########################################################################

*/

// Zakładam, że masz plik GlobalStyles.js z eksportowanymi wartościami dla Color, Border, itd.
// Jeśli nie, zastąp te wartości bezpośrednio w kodzie poniżej.
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const Konto = () => {
    return (
        <View style={styles.kontob}>
            <View style={styles.kontobInner}>
                <Image
                    style={styles.frameChild}
                    resizeMode="cover"
                    source={require("../assets/frame-125.png")}
                />
            </View>
            <View style={styles.frameParent}>
                <Pressable style={styles.frameWrapper}>
                    <View style={styles.rectangleParent}>
                        <View style={[styles.frameItem, styles.frameChildPosition]} />
                        <Text style={[styles.mojeKonto, styles.mojeKontoTypo]}>
                            Moje konto
                        </Text>
                    </View>
                </Pressable>
                <View style={styles.frameShadowBox}>
                    <View style={styles.rectangleParent}>
                        <View style={[styles.frameItem, styles.frameChildPosition]} />
                        <Text style={[styles.mojeKonto, styles.mojeKontoTypo]}>
                            Zarządzanie domem
                        </Text>
                        <Image
                            style={[styles.houseIcon, styles.iconLayout]}
                            resizeMode="cover"
                            source={require("../assets/house.png")}
                        />
                    </View>
                </View>
                <View style={styles.frameShadowBox}>
                    <View style={styles.rectangleParent}>
                        <View style={[styles.frameItem, styles.frameChildPosition]} />
                        <Text style={[styles.faqIOpinie, styles.mojeKontoTypo]}>
                            FAQ i opinie
                        </Text>
                        <Image
                            style={[styles.informacjaIcon, styles.iconLayout]}
                            resizeMode="cover"
                            source={require("../assets/informacja.png")}
                        />
                    </View>
                </View>
                <View style={styles.frameShadowBox}>
                    <View style={styles.rectangleParent}>
                        <View style={[styles.frameItem, styles.frameChildPosition]} />
                        <Text style={styles.centrumWiadomoci}>
                            Centrum wiadomości
                        </Text>
                        <Image
                            style={[styles.notatnikIcon, styles.iconLayout]}
                            resizeMode="cover"
                            source={require("../assets/notatnik.png")}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.kontobChild, styles.kontobPosition]}>
                <Pressable style={styles.framePressable}>
                    <View style={[styles.frameChild2, styles.frameChildPosition]} />
                    <Text style={[styles.zmieTo, styles.zmieToTypo]}>Zmień tło</Text>
                </Pressable>
            </View>
            <View style={[styles.kontobInner1, styles.kontobPosition1]}>
                <Pressable style={styles.framePressable}>
                    <View style={[styles.frameChild3, styles.frameChildPosition]} />
                    <Text style={[styles.wylogujSi, styles.zmieToTypo]}>Wyloguj się</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    kontob: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        height: responsiveHeight(100),
        overflow: "hidden",
        width: responsiveWidth(100),
    },
    kontobInner: {
        height: responsiveHeight(9.44),
        marginLeft: responsiveWidth(-50),
        top: responsiveHeight(12.03),
        bottom: responsiveHeight(83.53
        ),
        left: "50%",
        paddingHorizontal: responsiveWidth(2.6),
        paddingVertical: responsiveHeight(1),
        position: "absolute",
    },
    frameChild: {
        width: responsiveWidth(20),
        height: responsiveHeight(10),
        resizeMode: 'contain',
    },
    frameParent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(100),
        marginTop: responsiveHeight(30),
    },
    frameWrapper: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        marginBottom: responsiveHeight(2),
    },
    rectangleParent: {
        width: responsiveWidth(90),
        height: responsiveHeight(7),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    frameItem: {
        backgroundColor: Color.colorGainsboro_200,
        borderRadius: Border.br_3xs,
        height: "100%",
        position: "absolute",
        width: "100%",
    },
    frameChildPosition: {
        left: "0%",
        bottom: "0%",
        right: "0%",
        top: "0%",
        position: "absolute",
    },
    mojeKontoTypo: {
        textAlign: "center",
        color: Color.czcionka,
        fontFamily: FontFamily.interMedium,
        fontWeight: "500",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.2),
        position: "absolute",
    },
    iconLayout: {
        maxHeight: responsiveHeight(5),
        maxWidth: responsiveWidth(10),
        position: "absolute",
    },
    houseIcon: {
        right: responsiveWidth(70),
        height: responsiveHeight(5),
        width: responsiveWidth(10),
    },
    informacjaIcon: {
        right: responsiveWidth(70),
        height: responsiveHeight(5),
        width: responsiveWidth(10),
    },
    notatnikIcon: {
        right: responsiveWidth(70),
        height: responsiveHeight(5),
        width: responsiveWidth(10),
    },
    frameShadowBox: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: responsiveWidth(90),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: responsiveHeight(2),
    },
    kontobChild: {
        position: "absolute",
        bottom: responsiveHeight(10),
        width: responsiveWidth(80),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: responsiveWidth(49),
    },
    kontobPosition: {
        top: responsiveHeight(70),
        backgroundColor: "#000000",
        width: responsiveWidth(44),
        height: responsiveHeight(6),
        borderRadius: 10,

    },
    kontobPosition1: {
        top: responsiveHeight(70),
        backgroundColor: "#FF4444",
        width: responsiveWidth(44),
        height: responsiveHeight(6),
        borderRadius: 10,

    },
    framePressable: {
        width: responsiveWidth(100),
        height: responsiveHeight(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorPrimary,
        borderRadius: Border.br_3xs,
        color: "#234543",

    },

    zmieToTypo: {
        color: Color.colorWhite,
        fontFamily: FontFamily.interMedium,
        fontSize: responsiveFontSize(2),

    },
    wylogujSi: {
        color: Color.colorWhite,
        fontFamily: FontFamily.interMedium,
        fontSize: responsiveFontSize(2),


    },
    kontobInner1: {
        position: "absolute",
        bottom: responsiveHeight(5),
        width: responsiveWidth(100),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: responsiveWidth(4),

    },
});

export default Konto;
