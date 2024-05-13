import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import Instrukcja1 from "./Instrukcja1";

const Logowanie = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.logowanie}>
      <ImageBackground
        style={styles.logo1Icon}
        resizeMode="cover"
        source={require("../assets/logo1.png")}
      />
      <Image
        style={[styles.logowanieChild, styles.logowanieLayout]}
        contentFit="cover"
        source={require("../assets/line-2.png")}
      />
      <Image
        style={[styles.logowanieItem, styles.logowanieLayout]}
        contentFit="cover"
        source={require("../assets/group-1.png")}
      />
      <Text style={styles.kontynuujcAkceptujeszWarunContainer}>
        <Text
          style={styles.kontynuujcAkceptujesz}
        >{`Kontynuując, akceptujesz `}</Text>
        <Text
          style={styles.warunkiKorzystaniaZ}
        >{`Warunki korzystania z serwisu, Politykę prywatności `}</Text>
        <Text style={styles.kontynuujcAkceptujesz}>{`oraz `}</Text>
        <Text style={styles.warunkiKorzystaniaZ}>
          warunki korzytsania z plików cookie
        </Text>
      </Text>
      <Text style={styles.niePosiadaszKonta}>{`Nie posiadasz konta? `}</Text>
      <Text style={styles.niePamitaszHasa}>Nie pamiętasz hasła?</Text>
      <View style={[styles.mail, styles.mailPosition]}>
        <View style={[styles.mailChild, styles.mailChildPosition]} />
        <TextInput
          style={styles.adresEMail}
          placeholder="Hasło"
          placeholderTextColor="#a8a8a8"
           secureTextEntry={true}
        />
      </View>
      <View style={[styles.mail1, styles.mailPosition]}>
        <View style={[styles.mailChild, styles.mailChildPosition]} />
        <TextInput
          style={styles.adresEMail}
          placeholder="Mail"
          placeholderTextColor="#a8a8a8"
        />
      </View>
      <View style={styles.rectangleParent}>
        <View style={[styles.frameChild, styles.frameChildPosition]} />
        <Text style={styles.lub}>LUB</Text>
      </View>
      <Pressable
        style={[styles.rectangleGroup, styles.logowanie1Layout]}
        onPress={() => navigation.navigate("Rejestracja")}
      >
        <View style={[styles.frameItem, styles.mailChildPosition]} />
        <Text style={[styles.zarejestrujSi, styles.zalogujSiTypo]}>
          Zarejestruj się
        </Text>
      </Pressable>
      <Pressable style={[styles.logowanie1, styles.logowanie1Layout]}
      onPress={() => navigation.navigate("Instrukcja1")}>
        <View style={[styles.logowanieInner, styles.frameChildPosition]} />
        <Text style={[styles.zalogujSi, styles.zalogujSiTypo]}>
          Zaloguj się
        </Text>
      </Pressable>
    </View>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
  logowanieLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  mailPosition: {
    right: "11.16%",
    height: "6.22%",
    width: "77.44%",
    left: "11.4%",
    position: "absolute",
    marginTop: -55,
  },
  mailChildPosition: {
    backgroundColor: Color.colorGainsboro_100,
    bottom: "0%",
    top: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    //position: "absolute",
    width: "100%",
  },
  frameChildPosition: {
    bottom: "0%",
    height: "100%",
    top: "0%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",

  },
  logowanie1Layout: {
    height: "5.04%",
    position: "absolute",
    marginTop: -50,
  },
  zalogujSiTypo: {
    fontFamily: FontFamily.latoBold,
    textAlign: "center",
    letterSpacing: 0,
    position: "absolute",
  },
  //logo
  logo1Icon: {
    height: "53.65%",
    top: "-9.01%",
    bottom: "55.36%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
    marginTop: 120,
  },
   //pozycja facebook, googla, appla, kreski
  logowanieChild: {
    height: "0.8%",
    width: "69.3%",
    top: "53.72%",
    right: "15.35%",
    bottom: "39.27%",
    marginTop: -2,
  },

  //pozycja facebook, googla, appla
  logowanieItem: {
    height: "6.5%",
    width: "62%",
    top: "56.77%",
    right: "26.74%",
    bottom: "29.08%",
    left: "19.58%",
  },
  kontynuujcAkceptujesz: {
    color: Color.colorGray_100,
  },
  warunkiKorzystaniaZ: {
    color: Color.colorDimgray,
  },
  kontynuujcAkceptujeszWarunContainer: {
    height: "8.8%",
    width: "76.28%",
    top: "64.36%",
    left: "13.51%",
    textAlign: "center",
    letterSpacing: 0,
    fontSize: 14,
    fontFamily: FontFamily.latoRegular,
    position: "absolute",
  },
  niePosiadaszKonta: {
    height: "3%",
    width: "43.72%",
    top: "75.19%",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.colorBlack,
    left: "11.4%",
    fontFamily: FontFamily.latoBold,
    fontWeight: "700",
    letterSpacing: 0,
    position: "absolute",
  },
  niePamitaszHasa: {
    height: "2.68%",
    top: "40%",
    width: "77.44%",
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.latoBold,
    fontWeight: "700",
    left: "11.4%",
    letterSpacing: 0,
    fontSize: FontSize.size_smi,
    position: "absolute",
  },
  mailChild: {
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
  },
  adresEMail: {
    height: "81.03%",
    width: "96.73%",
    top: "5.07%",
    left: "4.19%",
    fontSize: 16,
    fontFamily: FontFamily.latoRegular,
    position: "absolute",
  },
  mail: {
    top: "39.48%",
    bottom: "57.3%",
  },
  mail1: {
    top: "31.79%",
    bottom: "65.99%",
  },
  frameChild: {
    backgroundColor: Color.colorWhite,
    bottom: "0%",
    height: "100%",
  },
  lub: {
    height: "60.56%",
    width: "82.61%",
    left: "8.7%",
    fontSize: FontSize.size_lg,
    color: "#dadada",
    top: "10%",
    fontFamily: FontFamily.latoBold,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0,
    position: "absolute",
  },
  //napis lub
  rectangleParent: {
    height: "3.86%",
    width: "16.05%",
    top: "52.15%",
    right: "42.09%",
    bottom: "37.98%",
    left: "41.86%",
    position: "absolute",
    overflow: "hidden",
  },
  frameItem: {
    borderRadius: Border.br_mini,
  },
  zarejestrujSi: {
    height: "74.47%",
    width: "64.04%",
    top: "15.53%",
    left: "18.72%",
    fontSize: FontSize.size_xl,
    textDecorationLine: "underline",
    color: "#23c647",
    fontWeight: "700",
    fontFamily: FontFamily.latoBold,
  },
  //napis zarejestruj sie
  rectangleGroup: {
    width: "57.21%",
    top: "79.15%",
    right: "1%",
    bottom: "11.8%",
    left: "46.16%",
    overflow: "hidden",
  },
  logowanieInner: {
    borderRadius: 20,
    backgroundColor: "#39B018",
  },
  zalogujSi: {
    height: "79.36%",
    width: "96.71%",
    top: "20.64%",
    left: "1.63%",
    fontSize: 18,
    fontWeight: "600",
    color: Color.colorWhite,
  },
  logowanie1: {
    width: "77.81%",
    top: "50%", // Zmodyfikowana wartość, dostosuj zgodnie z potrzebą
    right: "17.21%",
    left: "10.98%",
    overflow: "hidden",

  },
  logowanie: {
    //flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default Logowanie;
