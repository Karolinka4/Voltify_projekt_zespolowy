import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const Frame4 = ({ style }) => {
  return (
    <View style={[styles.rectangleParent, style]}>
      <View style={styles.frameChild} />
      <Image
        style={styles.energiaIcon}
        contentFit="cover"
        source={require("../assets/energia3.png")}
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
  energiaIcon: {
    top: 18,
    left: 33,
    width: 32,
    height: 33,
    position: "absolute",
  },
  rectangleParent: {
    height: 66,
    width: 95,
  },
});

export default Frame4;
