import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const Frame2 = ({ style }) => {
  return (
    <View style={[styles.groupParent, style]}>
      <View style={styles.groupChildPosition}>
        <View style={[styles.groupChild, styles.groupChildPosition]} />
        <Image
          style={styles.dom2Icon}
          contentFit="cover"
          source={require("../assets/dom22.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    left: 0,
    top: 0,
    position: "absolute",
    height: 67,
    width: 95,

  },
  groupChild: {
    backgroundColor: Color.colorGainsboro_100,
  },
  dom2Icon: {
    top: 18,
    left: 31,
    width: 32,
    height: 32,
    position: "absolute",
  },
  groupParent: {
    height: 67,
    width: 95,
  },
});

export default Frame2;
