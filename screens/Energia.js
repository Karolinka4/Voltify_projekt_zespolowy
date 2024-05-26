import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable, View } from 'react-native';
// Import Image z expo-image został usunięty, ponieważ nie był używany w podanym kodzie.
import { Border, Color, FontFamily, FontSize } from '../GlobalStyles';
import LicznikEn from '../components/LicznikEn';
import { useNavigation } from "@react-navigation/native";
import Wykres from '../components/Wykres';
import PojedynczeUrzadzenia from './WszystkieUrzadzenia';

const Energia = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.energiab} contentContainerStyle={styles.contentContainer}>
           <ScrollView>
            <View style={[styles.przycisk2bbWrapper, styles.wrapperPosition]}>
                <Text style={styles.monitorowanieEnergii}>Monitorowanie energii</Text>
                <Pressable style={styles.przycisk2bb}>
                    <View style={[styles.przycisk2bbChild, styles.childShadowBox]} />
                    <Text style={[styles.wszystkieUrzdzenia, styles.urzdzeniaTypo]}>
                        Wszystkie urządzenia
                    </Text>
                </Pressable>
            </View>
            <View style={[styles.przycisk3bbWrapper, styles.wrapperPosition]}>
                <Pressable style={styles.przycisk2bb} onPress={() => navigation.navigate("PojedynczeUrzadzenia")}>
                    <View style={[styles.przycisk3bbChild, styles.childShadowBox]} />
                    <Text style={[styles.pojedynczeUrzdzenia, styles.urzdzeniaTypo]}>
                        Pojedyncze urządzenia
                    </Text>
                </Pressable>
            </View>
            <View style={styles.licznikEn}>
                              <LicznikEn />
                               </View>
            <View style={styles.wykres}>
                <Wykres />
            </View>

 </ScrollView>
 </View>
    );
};


const styles = StyleSheet.create({
    contentContainer: {
        //flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    wrapperPosition: {
        left: 35,
        position: "absolute",
    },
    monitorowanieEnergii: {
        color: Color.czcionka,
        fontFamily: FontFamily.latoBold,
        fontWeight: "bold",
        fontSize: 25,
        width: "100%",
        height: "88.85%",
        textAlign: "center",
    },
    wykres: {
        width: "100%",
        height: "100%",
        top: -1375,

    },
    licznikEn: {
        width: "100%",
        height: "100%",
        top: -630,

    },
    childShadowBox: {
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: Border.br_11xl,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        left: "0%",
        bottom: "0%",
        right: "0%",
        top: "0%",
        height: "100%",
        position: "absolute",
        width: "100%",
    },
    urzdzeniaTypo: {
        color: Color.czcionka,
        fontFamily: FontFamily.latoBold,
        fontWeight: "600",
        fontSize: 17,
        left: "16%",
        width: "68.03%",
        height: "68.85%",
        textAlign: "center",
        letterSpacing: 0,
        position: "absolute",
    },

    przycisk2bbChild: {
        backgroundColor: "#64AD1B",
        borderColor: "#64AD1B",
    },
    wszystkieUrzdzenia: {
        top: "25%",
    },
    przycisk2bb: {
        width: 290,
        height: 52,

    },
    przycisk2bbWrapper: {
        top: 80,
    },
    przycisk3bbChild: {
        backgroundColor: Color.colorYellowgreen_300,
        borderColor: "#92C721",
    },
    pojedynczeUrzdzenia: {
        top: "27.12%",
    },
    przycisk3bbWrapper: {
        top: 224,
    },
    energiab: {
        backgroundColor: Color.colorWhite,
        overflow: "hidden",
        width: "100%",

    },
});

export default Energia;
