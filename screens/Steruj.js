import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { Dimensions } from 'react-native';

// Pobierz wymiary ekranu
const window = Dimensions.get('window');
const screenWidth = window.width;
const screenHeight = window.height;
/*
##########################################################################
Wygląd Sterowania wieloma urządzeniami
###########################################################################

*/
const Steruj = () => {
 const navigation = useNavigation();

   return (
     <View style={styles.harmonogramb}>
       <View
         style={[styles.dodajAutomatyzacjRcznUsWrapper, styles.wrapperFlexBox]}
       >
         <Text style={styles.dodajAutomatyzacjRczn}>{` Steruj wieloma urządzeniami jednocześnie jednym kliknięciem`}</Text>
       </View>
       <Pressable style={styles.rectangleParent}
       onPress={() => navigation.navigate("Harmonogram")}>
         <View style={[styles.frameChild, styles.frameChildBg]} />
         <Text style={[styles.automatyzacja, styles.sterujTypo]}>
           Automatyzacja
         </Text>
       </Pressable>
       <Pressable
         style={[styles.sterujWrapper, styles.frameChildBg]}

       >
         <Text style={[styles.steruj, styles.sterujTypo]}>Steruj</Text>
       </Pressable>
       <Pressable style={styles.dodawaniebbWrapper}
       onPress={() => navigation.navigate('Urzadzenia')}>
         <Image
           style={styles.dodawaniebbIcon}
           resizeMode="cover"
           source={require("../assets/dodawaniebb.png")}
         />
       </Pressable>
     </View>
   );
 };

 const styles = StyleSheet.create({
   wrapperFlexBox: {
     justifyContent: "center",
     alignItems: "center",
     top: screenHeight * 0.55,
     flexDirection: "row",
   },
   frameChildBg: {
     backgroundColor: Color.colorGainsboro_100,
     position: "absolute",
   },
   sterujTypo: {
     transform: [
       {
         rotate: "-0.2deg",
       },
     ],
     fontSize: FontSize.size_lgi,
     textAlign: "center",
     fontFamily: FontFamily.interMedium,
     fontWeight: "500",
     letterSpacing: 0,
   },
   dodajAutomatyzacjRczn: {
     fontSize: FontSize.size_mini,
     color: Color.colorDimgray,
     width: screenWidth * 0.7,
     textAlign: "center",
     fontFamily: FontFamily.interMedium,
     fontWeight: "500",
     letterSpacing: 0,
   },
   dodajAutomatyzacjRcznUsWrapper: {
     marginTop: -19.5,
     width: "64.19%",
     right: "17.91%",
     left: "17.91%",
     position: "absolute",
   },
   frameChild: {
     top: 1,
     left: 3,
     borderRadius: Border.br_11xl,
     width: 163,
     height: 58,

   },
   automatyzacja: {
     marginLeft: -85.05,
     top: 20,
     left: "50%",
     color: Color.colorDarkgray,
     width: 170,
     height: 31,
     position: "absolute",

   },
   rectangleParent: {
     height: "6.22%",
     width: "39.56%",
     top: "10.62%",
     right: "55.79%",
     bottom: "83.15%",
     left: "4.65%",
     position: "absolute",
   },
   steruj: {
     color: Color.colorLimegreen,


   },
   sterujWrapper: {
     marginTop: screenHeight * -0.40,
     width: screenWidth * 0.2,
     right: "37.07%",
     left: "50.35%",
     paddingHorizontal: Padding.p_12xs,
     paddingVertical: Padding.p_6xs,
     justifyContent: "center",
     alignItems: "center",
     top: "50%",
     flexDirection: "row",
     overflow: "hidden",

   },
   dodawaniebbIcon: {
     width: 85,
     height: 81,
     resizeMode: 'contain',
   },
   dodawaniebbWrapper: {
     top: 275,
     left: 133,
     position: "absolute",
   },
   harmonogramb: {
     backgroundColor: Color.colorWhite,
     flex: 1,
     width: "100%",
     height: 932,
     overflow: "hidden",
   },
 });

export default Steruj;
