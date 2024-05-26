import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const Frame = ({ style }) => {
    return (
        <View style={[styles.rectangleParent, style]}>
            <View style={styles.frameChild} />
            <Image
                style={styles.energia2Icon}
                contentFit="cover"
                source={require("../assets/energia23.png")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    frameChild: {
        top: 0,
        left: 0,
        backgroundColor: Color.colorGainsboro_100,
        width: 95,
        height: 67,
        position: "absolute",
    },
    energia2Icon: {
        top: 17,
        left: 35,
        width: 32,
        height: 32,
        position: "absolute",
    },
    rectangleParent: {
        width: 96,
        height: 66,
    },
});

export default Frame;
