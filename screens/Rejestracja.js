import * as React from "react";
import { Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import Instrukcja1 from "./Instrukcja1";

const Rejestracja = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.rejestracja}>
      <Text style={styles.posiadaszJuKonto}>Posiadasz już konto?</Text>
      <View style={[styles.mail, styles.mailPosition]}>
        <View style={[styles.mailChild, styles.childPosition]} />
        <TextInput
          style={styles.adresEMail}
          placeholder="Adres e-mail"
          placeholderTextColor="#a8a8a8"
        />
      </View>
      <View style={[styles.mail1, styles.mailPosition]}>
        <View style={[styles.mailChild, styles.childPosition]} />
        <TextInput
          style={styles.adresEMail}
          placeholder="Hasło"
          placeholderTextColor="#a8a8a8"
        />
      </View>
      <View style={[styles.rectangleParent, styles.mailPosition]}>
        <View style={[styles.mailChild, styles.childPosition]} />
        <TextInput
          style={styles.adresEMail}
          placeholder="Nazwisko"
          placeholderTextColor="#a8a8a8"
        />
      </View>
      <View style={[styles.rectangleGroup, styles.mailPosition]}>
        <View style={[styles.mailChild, styles.childPosition]} />
        <TextInput
          style={styles.adresEMail}
          placeholder="Imię"
          placeholderTextColor="#a8a8a8"
        />
      </View>
      <Pressable
        style={styles.rectangleContainer}
        onPress={() => navigation.navigate("Logowanie")}
      >
        <View style={[styles.frameChild, styles.childPosition]} />
        <Text style={styles.zalogujSi}>Zaloguj się</Text>
      </Pressable>
      <Text style={[styles.zarejestrujSi, styles.zalogujSi1Typo]}>
        Zarejestruj się
      </Text>
      <Pressable style={styles.logowanie}
        onPress={() => navigation.navigate("Instrukcja1")}>
        <View style={styles.logowanieChild} />
        <Text style={[styles.zalogujSi1, styles.zalogujSi1Typo]}>
          Zarejestruj się
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mailPosition: {
    right: "11.16%",
    width: "77.44%",
    height: "6.22%",
    left: "11.4%",
    position: "absolute",
  },
  childPosition: {
    backgroundColor: Color.colorGainsboro_100,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  zalogujSi1Typo: {
    fontWeight: "600",
    textAlign: "center",
    fontFamily: FontFamily.latoBold,
    letterSpacing: 0,
    position: "absolute",
  },
  posiadaszJuKonto: {
    height: "2.36%",
    width: "47.67%",
    top: "72.42%",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.latoBold,
    fontWeight: "700",
    letterSpacing: 0,
    left: "11.4%",
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
    top: "12.07%",
    left: "4.19%",
    fontFamily: FontFamily.latoRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  mail: {
    top: "42.6%",
    bottom: "51.18%",
  },
  mail1: {
    top: "51.29%",
    bottom: "42.49%",
  },
  rectangleParent: {
    top: "33.91%",
    bottom: "59.87%",
  },
  rectangleGroup: {
    top: "25.21%",
    bottom: "68.56%",
  },
  frameChild: {
    borderRadius: Border.br_mini,
  },
  zalogujSi: {
    height: "74.47%",
    width: "64.04%",
    top: "25.53%",
    left: "18.72%",
    fontSize: FontSize.size_xl,
    textDecorationLine: "underline",
    color: "#f21919",
    textAlign: "center",
    fontFamily: FontFamily.latoBold,
    fontWeight: "700",
    letterSpacing: 0,
    position: "absolute",
  },
  rectangleContainer: {
    height: "5.04%",
    width: "47.21%",
    top: "70.39%",
    right: "2.56%",
    bottom: "24.57%",
    left: "50.23%",
    position: "absolute",
    overflow: "hidden",
  },
  zarejestrujSi: {
    height: "6.97%",
    width: "68.37%",
    top: "13.77%",
    left: "15.81%",
    fontSize: 38,
    color: Color.colorBlack,
  },
  logowanieChild: {
    borderRadius: 25,
    backgroundColor: "#39B018",
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  zalogujSi1: {
    height: "79.31%",
    width: "96.72%",
    top: "20.69%",
    left: "1.62%",
    fontSize: 18,
    color: Color.colorWhite,
  },
  logowanie: {
    width: "81.63%",
    top: "60.94%",
    right: "9.3%",
    bottom: "32.83%",
    left: "9.07%",
    height: "6.22%",
    position: "absolute",
  },
  rejestracja: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Rejestracja;
