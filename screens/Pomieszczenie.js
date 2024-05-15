import * as React from'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {useState, useEffect} from'react';
import { Image } from "expo-image";
import {BACKEND_API_URL} from '@env';
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, Padding, FontFamily, Border, FontSize } from "../GlobalStyles";
import Urzadzenia from "../components/Urzadzenia";


/*
##########################################################################
Wygląd po kliknieciu w zdjecie w pokój (moznosc wyboru by dodac urządzenie)
###########################################################################

*/

const Pomieszczenie = ({deviceData}) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const [devices, setDevices] = useState([]);
    const route = useRoute();
    const { name, image, roomId } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
//        fetch(`${BACKEND_API_URL}/devices/1/${roomId}`)//### Ten użytkownik nr 1 jest na sztywno
//              .then(response => response.json())
//              .then(data => {
//                setDevices(data); // Assuming the server response is the array of devices
//              })
//              .catch(error => {
//                console.error('Error fetching data: ', error);
//              });
    }, []);


  return (



    <>
     <View>
              {devices.map(device => (
                <Text key={device.id}>{device.nazwa}</Text>
              ))}
            </View>
       <Urzadzenia
              isVisible={isModalVisible}
              onClose={() => setModalVisible(false)}
              selectedDevice={selectedDevice}
            />

      <View style={styles.pomieszczenie}>
        <View style={styles.sypialniaWrapper}>
          <Text style={[styles.sypialnia, styles.dodaneFlexBox]}>{name}</Text>
        </View>
        <Image source={{ uri: image }} style={[styles.pomieszczenieChild, styles.childPosition]} />
        <View style={[styles.dodaneWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.dodane, styles.arwkaTypo]}>Dodane:</Text>
         {/* Tutaj są wyswietlane urzadzenia w pokoju(Kafelki) */}
         {devices?.map((device, index) => (
           <Text key={index}>{device.nazwa} - Klasa: {device.name}, Taryfa: {device.taryfa}, ID: {device.id}</Text>
         ))}
        </View>
        <View style={[styles.dodajUrzdzeniaWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.dodane, styles.arwkaTypo]}>Dodaj urządzenia:</Text>
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={[styles.strzakabbIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/strzakabb.png")}
          />
        </Pressable>
        <View style={styles.pomieszczenieItem} />
        <LinearGradient
          style={styles.wrapper}
          locations={[0, 1]}
          colors={["#dcdcdc", "#fff"]}
        >
          <Pressable style={[styles.pressable, styles.pressableLayout]} />
        </LinearGradient>

        <ScrollView
          style={styles.pomieszczenieInner}
          horizontal={true}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.frameScrollViewContent}
        >
          <Image
            style={styles.frameChild}
            resizeMode="cover"
            source={require("../assets/group-16.png")}
          />
        </ScrollView>
        <Pressable onPress={() => { setSelectedDevice('Żarowkę'); setModalVisible(true); }} style={[styles.framePressable, styles.framePressablePosition]}>
          <View style={styles.rectangleParent}>
            <LinearGradient
              style={[styles.groupChild, styles.pressableLayout]}
              locations={[0, 1]}
              colors={["#dcdcdc", "#fff"]}
                       />
                       <Image
                         style={styles.arwkaIcon}
                         resizeMode="cover"
                         source={require("../assets/arwka.png")}
                       />
                       <Text style={[styles.arwka, styles.arwkaTypo]}>Żarówka</Text>
                     </View>
                   </Pressable>

                   <Pressable onPress={() => { setSelectedDevice('Gniazdko'); setModalVisible(true); }} style={[styles.pomieszczenieInner1, styles.framePressablePosition]}>
                     <View style={styles.rectangleParent}>
                       <LinearGradient
                         style={[styles.groupChild, styles.pressableLayout]}
                         locations={[0, 1]}
                         colors={["#dcdcdc", "#fff"]}
                       />
                       <Image
                         style={styles.gniazdkoIcon}
                         resizeMode="cover"
                         source={require("../assets/gniazdko.png")}
                       />
                       <Text style={[styles.arwka, styles.arwkaTypo]}>Gniazdko</Text>
                     </View>
                   </Pressable>
                 </View>
               </> // Zamknięcie fragmentu JSX
             );
           };

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  dodaneFlexBox: {
    textAlign: "left",
    color: Color.colorGray_100,
  }, //pozycja obrazu
  childPosition: {
    left: "0%",
    right: "0%",
    position: "absolute",
  }, //oba napisy pozycja
  wrapperFlexBox: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: "50%",
    position: "absolute",
  }, //style obu napisów
  arwkaTypo: {
    fontWeight: "600",
    fontFamily: FontFamily.latoBold,
    letterSpacing: 0,
  }, //zaokraglenia kwadracików
  pressableLayout: {
    backgroundColor: Color.kolorStrzaki,
    borderRadius: Border.br_3xs,
    width: "100%",
  },//ustawienie kwadracików
  framePressablePosition: {
    top: 558,
    position: "absolute",
  }, //to nic nie robi
  image2Icon: {
    width: "186.05%",
    right: "-68.14%",
    left: "-17.91%",
    borderRadius: Border.br_3xs,
    maxWidth: "100%",
    bottom: "60.99%",
    top: "11.67%",
    height: "27.34%",

  }, //napis sypialnia
  sypialnia: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: FontFamily.latoBold,
    letterSpacing: 0,
    color: Color.colorGray_100,
    left: "40%",
    marginTop: "17%",
  },

  //wielkosc zdjecia
  pomieszczenieChild: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    bottom: "60.99%",
    top: "16.67%",
    height: "27.34%",
    right: "0%",
    width: "100%",
  },//napis dodane
  dodane: {
    fontSize: FontSize.size_lg,
    textAlign: "left",
    color: Color.colorGray_100,

  },//ustawienie napisu dodane
  dodaneWrapper: {
    marginTop: 127,
    width: "23%",
    right: "75.35%",
    left: "6.05%",
  },//ustawienie napisu dodaj urzadzenia
  dodajUrzdzeniaWrapper: {
    marginTop: -30,
    width: "45.12%",
    right: "59.77%",
    left: "5.12%",
  },//wymiary stzrałki lewej
  strzakabbIcon: {
    height: "25.4%",
    width: "14%",
    top: "-20%",
    right: "80%",
    bottom: "90.01%",
    left: "6.98%",
   // position: "absolute",
  },
  //wielkosc duzego kafla na ktory sa małe
  pomieszczenieItem: {
    height: "15.23%",
    width: "106.51%",
    top: "12%",
    right: "1.86%",
    bottom: "46.6%",
    left: "1.63%",
    backgroundColor: "#f7f7f7",
    //position: "absolute",
  },
  pressable: {
    height: "100%",
  }, //pusty kafelek z urzadzeniami
  wrapper: {
    left: "63%",
    top: "-1.8%",
    right: "7.21%",
    bottom: "47.96%",
    width: 101,
    height:94,
    borderRadius: Border.br_3xs,
  }, //wielkosc strzalki prawej
  frameChild: {
    width: 39,
    height: 40,
  }, //strzalkaprawa
  pomieszczenieInner: {
    marginTop: 37,
    right: "0.74%",
    left: "90%",
    top: "50%",
    position: "absolute",
    width: "100%",
  }, //zarówka
  groupChild: {
    height: "98.94%",
    top: "0%",
    bottom: "1.06%",
    left: "0%",
    right: "0%",
    position: "absolute",
  },
  //napis zarowka
  arwkaIcon: {
    top: 15,
    left: 26,
    width: 49,
    height: 50,
    position: "absolute",
    overflow: "hidden",
  },
  //napis gniazdko
  arwka: {
    top: 67,
    left: 0,
    fontSize: FontSize.size_mini,
    color: Color.colorBlack,
    textAlign: "center",
    height: 27,
    width: 101,
    position: "absolute",
  },
  //wielkosc tła na żarowce i gniazdku
  rectangleParent: {
    height: 94,
    width: 101,
  }, //ustawnienie okienka z żarówką wraz z żarówką
  framePressable: {
    left: 120,
    marginTop: -160,
  },
  //gniazdkoi ikona
  gniazdkoIcon: {
    top: 9,
    left: 15,
    width: 64,
    height: 58,
    position: "absolute",
    overflow: "hidden",
  }, //ustawienia całego okienka gniazdka
  pomieszczenieInner1: {
    left: 12,
     marginTop: -160,
  },
  pomieszczenie: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    overflow: "hidden",

  },
});

export default Pomieszczenie;

