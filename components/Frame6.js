import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const Frame6 = ({ style }) => {
  return (
    <View style={[styles.groupParent, style]}>
      <View style={styles.groupChildPosition}>
        <View style={[styles.groupChild, styles.groupChildPosition]} />
      </View>
      <Image
        style={styles.domIcon}
        contentFit="cover"
        source={require("../assets/dom4.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    height: 57,
    left: 0,
    top: 0,
    position: "absolute",
    width: 95,
  },
  groupChild: {
    backgroundColor: Color.colorDarkslategray,
  },
  domIcon: {
    top: 17,
    left: 31,
    width: 32,
    height: 32,
    position: "absolute",
  },
  groupParent: {
    height: 66,
    width: 95,
  },
});

export default Frame6;
