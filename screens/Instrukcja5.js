import * as React from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Pressable,
    LinearGradient
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const Instrukcja5 = () => {
    const navigation = useNavigation();
    return (
        <View style={[styles.instrukcja1, styles.icon1Layout]}>
            <View style={styles.parent}>
                <ImageBackground
                    style={styles.icon}
                    resizeMode="cover"
                    source={require("../assets/5.png")}
                />
                <ImageBackground
                    style={styles.logo12}
                    resizeMode="cover"
                    source={require("../assets/logo12.png")}
                />
                <Text
                    style={[styles.toAplikacjaUmoliwia, styles.skipFlexBox]}
                >{`W aplikacji znajdziemy również harmonogram w którym będzie można zsynchronizować urządzenia oraz nadać im rytm działania.

`}</Text>
            </View>
            <View style={[styles.rectangleParent, styles.skipWrapperPosition]}>

                <Image
                    style={[styles.frameItem, styles.frameSpaceBlock]}
                    contentFit="cover"
                    source={require("../assets/ellipse-6.png")}
                />
                <Image
                    style={[styles.frameInner, styles.frameSpaceBlock]}
                    contentFit="cover"
                    source={require("../assets/ellipse-8.png")}
                />
                <Image
                    style={[styles.frameItem, styles.frameSpaceBlock]}
                    contentFit="cover"
                    source={require("../assets/ellipse-6.png")}
                />
                <Image
                    style={[styles.frameInner, styles.frameSpaceBlock]}
                    contentFit="cover"
                    source={require("../assets/ellipse-8.png")}
                />
                <View style={[styles.frameChild, styles.frameSpaceBlock]} />

            </View>
            <Pressable
                style={[styles.skipWrapper, styles.skipWrapperPosition]}
                onPress={() => navigation.navigate("Instrukcja4")}
            >
                <Text style={[styles.skip, styles.skipFlexBox1]}>Back</Text>
            </Pressable>
            <Pressable
                style={[styles.start]}
                onPress={() => navigation.navigate("BottomTabsRoot")}
            >
                <Image
                    style={[styles.start]}
                    contentFit="cover"
                    source={require("../assets/Gradient.png")}
                />
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    icon1Layout: {
        width: "100%",
        overflow: "hidden",
    },
    skipFlexBox: {
        textAlign: "center",
        lineHeight: 20,
        letterSpacing: 0,
    },
    skipFlexBox1: {
        textAlign: "center",
        lineHeight: 50,
        letterSpacing: 0,


    },


    start: {
        top: 85,
        left: 110,
        fontSize: 20,
        fontWeight: "600",
        color: Color.colorWhite,
        height: 64,
        width: 114,
        //position: "absolute",
    },



    skipWrapperPosition: {
        flexDirection: "row",
        top: "80%",
        position: "absolute",
        left: 120,
    },
    frameSpaceBlock: {
        marginLeft: 6,
        height: 13,
    },
    icon: {
        width: 320,
        height: 240,
    },
    logo12: {
        width: 204,
        height: 68,
        marginTop: 20,
    },
    toAplikacjaUmoliwia: {
        fontSize: 15,
        fontWeight: "600",
        fontFamily: FontFamily.latoBold,
        color: Color.colorGray,
        width: 290,
        height: 160,
        marginTop: 30,
    },
    parent: {
        top: 130,
        left: 0,
        alignItems: "center",
        //position: "absolute",
    },
    frameChild: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
        borderRadius: Border.br_11xl,
        backgroundColor: Color.colorMediumseagreen,
        width: 30,
        height: 13,
    },
    frameItem: {
        width: 14,
    },
    frameInner: {
        width: 13,
    },
    rectangleParent: {
        height: 55,
        width: 114,
        overflow: "hidden",
    },
    skip: {
        fontSize: 30,
        fontWeight: "500",
        fontFamily: FontFamily.latoLight,
        color: Color.colorDarkgray,
    },
    //back
    skipWrapper: {
        marginTop: 65,
        width: "17.91%",
        marginLeft: -80,
        backgroundColor: Color.colorGainsboro,
        justifyContent: "center",
        paddingHorizontal: Padding.p_2xs,
        paddingVertical: Padding.p_5xs,
        //alignItems: "center",
        overflow: "hidden",
    },
    icon1: {
        borderRadius: Border.br_81xl,
        height: "100%",
        overflow: "hidden",
    },
    strzakaPrawa: {
        width: 58,
        height: 53,
    },
    strzakaPrawaWrapper: {
        top: 685,
        left: 260,
        padding: Padding.p_3xs,
        position: "absolute",
    },
    instrukcja1: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        height: 932,
        overflow: "hidden",
    },
});

export default Instrukcja5;
