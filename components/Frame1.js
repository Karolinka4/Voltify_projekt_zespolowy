import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const Frame1 = ({ style }) => {
    return (
        <View style={[styles.rectangleParent, style]}>
            <View style={styles.frameChild} />
            <Image
                style={styles.users2Icon}
                contentFit="cover"
                source={require("../assets/users22.png")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    frameChild: {
        top: 0,
        left: 0,
        backgroundColor: Color.colorDarkslategray,
        height: 67,
        position: "absolute",
        width: 95,
    },
    users2Icon: {
        top: 16,
        left: 30,
        width: 32,
        height: 32,
        position: "absolute",
    },
    rectangleParent: {
        height: 66,
        width: 95,
    },
});

export default Frame1;
