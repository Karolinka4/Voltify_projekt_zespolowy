import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const FrameImage = ({ style }) => {
  return (
    <Image
      style={[styles.frameIcon, style]}
      contentFit="cover"
      source={require("../assets/frame-61.png")}
    />
  );
};

const styles = StyleSheet.create({
  frameIcon: {
    width: 95,
    height: 67,
  },
});

export default FrameImage;
