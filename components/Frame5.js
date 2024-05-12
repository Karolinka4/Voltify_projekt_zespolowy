import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const Frame5 = ({ style }) => {
  return (
    <View style={[styles.frameChildLayout, style]}>
      <View style={[styles.frameChild, styles.frameChildLayout]} />
      <Image
        style={styles.usersIcon}
        contentFit="cover"
        source={require("../assets/users4.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameChildLayout: {
    height: 67,
    width: 95,
  },
  frameChild: {
    top: 0,
    left: 0,
    backgroundColor: Color.colorGainsboro_100,
    position: "absolute",
  },
  usersIcon: {
    top: 16,
    left: 31,
    width: 32,
    height: 32,
    position: "absolute",
  },
});

export default Frame5;
