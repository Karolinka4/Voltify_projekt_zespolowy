import * as React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Image } from "expo-image";
import { BACKEND_API_URL } from '@env';
import { RefreshControl, StyleSheet, Text, View, Pressable, FlatList, Modal, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, Padding, FontFamily, Border, FontSize } from "../GlobalStyles";
import Urzadzenia from "../components/Urzadzenia";
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';
import DodajGniazdko from '../components/DodajGniazdko';
import DodajZarowke from '../components/DodajZarowke';
import { useFetchContext } from '../FetchAllDataContext.js';



/*
##########################################################################
Wygląd po kliknieciu w zdjecie w pokój (moznosc wyboru by dodac urządzenie)
###########################################################################

*/

const Pomieszczenie = ({ deviceData }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const route = useRoute();
    const { name, image, roomId, devices } = route.params;
    const navigation = useNavigation();
    const [updatedDevices, setUpdatedDevices] = useState(devices);
    const [userId, setUserId] = useState(null);
    const { refreshData } = useFetchContext();

     useEffect(() => {
        getDataFromStorage('@myKey').then((data) => {
            setUserId(data.Key);
        });
      }, []);

    const fetchDevicesData = async () => {
             const url = `${BACKEND_API_URL}/api/account/${userId}/room/${roomId}`;
             try {
               const response = await fetch(url, {
                 method: 'GET',
                 headers: {
                   'Content-Type': 'application/json',
                 },
               });
            if (!response.ok) {
              throw new Error('Network response on DOM(fetchROoms) was not ok: ' + response);
            }

            let roomData = await response.json();
            setUpdatedDevices(roomData.devices);
          } catch (error) {
            console.error('There was a problem on DOM(fetchRooms) with the fetch operation:', error);
          }
        };

    return (

        <>
            <KeyboardAvoidingView>
                {/* tutaj dodałem nową zmienną onEdit, któa jest odpowiedzialna za wyswietlanie przycisku usun(przy false go nie ma, przy true ma być) */}
                <Urzadzenia
                    isVisible={isModalVisible}
                    onClose={() => {
                        setModalVisible(false);
                        fetchDevicesData();
                    }
                    }
                    selectedDevice={selectedDevice}
                    onEdit={false}
                    roomId={roomId}
                />
            </KeyboardAvoidingView>
            <View style={styles.pomieszczenie}>

                <View style={styles.sypialniaWrapper}>
                    <Text style={[styles.sypialnia, styles.dodaneFlexBox]}>{name}</Text>
                </View>
                <Image source={{ uri: image }} style={[styles.pomieszczenieChild, styles.childPosition]} />

                <View style={[styles.dodajUrzdzeniaWrapper1, styles.wrapperFlexBox]}>
                    <Text style={[styles.dodane, styles.arwkaTypo]}>Dodaj urządzenia:</Text>
                </View>
                <View style={[styles.dodaneWrapper, styles.wrapperFlexBox]}>
                    <Text style={[styles.dodane, styles.arwkaTypo1]}>Dodane:</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={[styles.strzakabbIcon, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/strzakabb.png")}
                    />
                </TouchableOpacity>
                {/* Tutaj są wyswietlane urzadzenia w pokoju(Kafelki) */}

                <View style={styles.pomieszczenieItem} />



                <LinearGradient
                    style={styles.wrapper}
                    locations={[0, 1]}
                    colors={["#dcdcdc", "#fff"]}
                >
                    <TouchableOpacity style={[styles.pressable, styles.pressableLayout]} />
                </LinearGradient>

                <View
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


                </View>

                <TouchableOpacity onPress={() => { setSelectedDevice('Zarowke'); setModalVisible(true); }} style={[styles.framePressable, styles.framePressablePosition]}>
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
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setSelectedDevice('Gniazdko'); setModalVisible(true); }} style={[styles.pomieszczenieInner1, styles.framePressablePosition]}>
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
                </TouchableOpacity>

                <FlatList style={[styles.lista]}
                    data={updatedDevices}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        let ComponentToRender = null;
                        if (item.device_type === 'SmartPlug') {
                            ComponentToRender = DodajGniazdko;
                        } else if (item.device_type === 'SmartBulb') {
                            ComponentToRender = DodajZarowke;
                        }

                        return ComponentToRender ? <ComponentToRender device={item} /> : null;
                    }}
                    contentContainerStyle={styles.listCon}
                />
            </View >


        </> // Zamknięcie fragmentu JSX
    );
};

const styles = StyleSheet.create({
    frameScrollViewContent: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },

    listCon: {
        paddingHorizontal: 10,

    },
    lista: {
        marginTop: -140,
    },
    childPosition: {
        width: '100%',
        height: 200, // Ustaw wysokość według potrzeb
    },

    iconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        overflow: "hidden",
    },
    dodaneFlexBox: {
        textAlign: "left",
        color: Color.colorGray_100,
    },
    //pozycja obrazu
    ///////////////////////////////////////////////////////////////
    //oba napisy pozycja
    wrapperFlexBox: {
        padding: Padding.p_6xs,
        justifyContent: 'center',
        alignItems: 'center',
    }, //style obu napisów

    arwkaTypo1: {
        fontWeight: "600",
        fontFamily: FontFamily.latoBold,
        letterSpacing: 0,
        left: -113,
    },
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
        left: "5%",
        marginTop: "17%",
    },
    sypialniaWrapper: {
        alignItems: 'center',
        marginTop: 20,
    },

    //wielkosc zdjecia
    pomieszczenieChild: {
        maxHeight: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        bottom: "60.99%",
        top: 20,
        height: "30.34%",
        right: "0%",
        width: "100%",
    },//napis dodane
    dodane: {
        fontSize: FontSize.size_lg,
        color: Color.colorGray_100,
        marginVertical: 10, // Dodaj margines wokół tekstu

    },

    //ustawienie napisu dodane
    dodaneWrapper: {
        //alignItems: 'flex-start',
        width: '100%', // Ustaw szerokość na 100%, aby tekst był wyrównany do lewej
        paddingHorizontal: 10, // Dodaj padding, aby tekst nie dotykał krawędzi ekranu
        left: -15,
        top: 165,

    },
    //ustawienie napisu dodaj urzadzenia
    dodajUrzdzeniaWrapper: {
        marginTop: -52,
        width: "45.12%",
        right: "59.77%",
        left: "5.12%",
    },
    dodajUrzdzeniaWrapper1: {
        marginTop: -48,
        width: "45.12%",
        right: "59.77%",
        left: "2.12%",
        top: 60,
    },
    //wymiary stzrałki lewej
    strzakabbIcon: {
        height: "25.4%",
        width: "14%",
        top: -300,
        right: "80%",
        left: "6.98%",
        //position: "absolute",
    },
    //wielkosc duzego kafla na ktory sa małe
    pomieszczenieItem: {
        height: "15.23%",
        width: "106.51%",
        right: "1.86%",
        bottom: "35.6%",
        left: 1,
        backgroundColor: "#f7f7f7",
        marginTop: 30,
        position: "absolute",
    },
    pressable: {
        height: "100%",
    }, //pusty kafelek z urzadzeniami
    wrapper: {
        left: "63%",
        top: -177,
        right: "7.21%",
        width: 101,
        height: 94,
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
        fontSize: 16,
        color: Color.colorBlack,
        textAlign: "center",
        height: 27,
        width: 101,
        //position: "absolute",
    },
    //wielkosc tła na żarowce i gniazdku
    rectangleParent: {
        height: 94,
        width: 101,
    }, //ustawnienie okienka z żarówką wraz z żarówką
    framePressable: {
        left: 120,
        marginTop: -162,
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
        marginTop: -162,
    },
    pomieszczenie: {
        backgroundColor: Color.colorWhite,
        flex: 1,
    },
});

export default Pomieszczenie;