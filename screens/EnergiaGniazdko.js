import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Image, Dimensions, ScrollView } from 'react-native';  //Dimentions dopisałam
import { BACKEND_API_URL } from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';

//Wykres dla gniazdka

import { LineChart, BarChart } from 'react-native-chart-kit';
//import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const EnergiaGniazdko = () => {

     const navigation = useNavigation();
     const chartConfig = {
           backgroundGradientFrom: "#ffffff", // Ustawienie na biały
            backgroundGradientTo: "#ffffff", // Ustawienie na biały
            fillShadowGradientFrom: '#FF69B4',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Zmiana koloru linii na ciemniejszy
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Zmiana koloru etykiet na ciemniejszy
            strokeWidth: 2, // Grubość linii
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            fillShadowGradientOpacity: 1,
            decimalPlaces: 0, // Usunięcie miejsc po przecinku dla wartości
        };

        const [rawDataWeek, setRawDataWeek] = useState([{"day":1,"average_consumption":10},{"day":2,"average_consumption":15},{"day":3,"average_consumption":20},{"day":4,"average_consumption":30},{"day":5,"average_consumption":20},{"day":6,"average_consumption":15},{"day":7,"average_consumption": 10}]);
        const [rawDataMonth, setRawDataMonth] = useState([ { "month": 1, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 2, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 3, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 4, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 5, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 6, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 7, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 8, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 9, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 10, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 11, "consumption": 0, "total_consumption_kwh": 0 }, { "month": 12, "consumption": 0, "total_consumption_kwh": 0 } ]);
        const [rawDataHour, setRawDataHour] = useState([ { "hour": 0, "average_consumption": 0 }, { "hour": 1, "average_consumption": 0 }, { "hour": 2, "average_consumption": 0 }, { "hour": 3, "average_consumption": 0 }, { "hour": 4, "average_consumption": 0 }, { "hour": 5, "average_consumption": 0 }, { "hour": 6, "average_consumption": 0 }, { "hour": 7, "average_consumption": 0 }, { "hour": 8, "average_consumption": 0 }, { "hour": 9, "average_consumption": 0 }, { "hour": 10, "average_consumption": 0 }, { "hour": 11, "average_consumption": 0 }, { "hour": 12, "average_consumption": 0 }, { "hour": 13, "average_consumption": 0 }, { "hour": 14, "average_consumption": 0 }, { "hour": 15, "average_consumption": 0 }, { "hour": 16, "average_consumption": 0 }, { "hour": 17, "average_consumption": 0 }, { "hour": 18, "average_consumption": 0 }, { "hour": 19, "average_consumption": 0 }, { "hour": 20, "average_consumption": 0 }, { "hour": 21, "average_consumption": 0 }, { "hour": 22, "average_consumption": 0 }, { "hour": 23, "average_consumption": 0 } ]);
        const [userId, setUserId] = useState(null);
        const route = useRoute();
        const { device } = route.params;

        const dataMiesieczny = {
            labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
            datasets: [
                {
                    data: rawDataMonth.map(x => x.total_consumption_kwh),
                },
            ],
        };

        const dataTygodniowy = {
            labels: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
            datasets: [
                    {
                        data: rawDataWeek.map(x => x.average_consumption),
                        //color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    },
            ],
        };
        const dataGodzinny = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
            datasets: [
                    {
                        data: rawDataHour.map(x => x.average_consumption),
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    },
            ],
        };
        useEffect(() => {
            getDataFromStorage('@myKey').then((data) => {
                setUserId(data.Key);
            });
                if (userId) {
                  fetchRawDataMonth();
                  fetchRawDataWeek();
                  fetchRawDataHour();
                }

        }, [userId]);

        const fetchRawDataWeek = async () => {
                     const url = `${BACKEND_API_URL}/api/account/${userId}/daily`;
                     try {
                       const response = await fetch(url, {
                         method: 'GET',
                         headers: {
                           'Content-Type': 'application/json',
                         },
                       });
                    if (!response.ok) {
                      throw new Error('Network response on Wykres(fetchRawDataWeek) was not ok: ' + response);
                    }

                    const rawDataWeekResponse = await response.json();
                    setRawDataWeek(rawDataWeekResponse);
                  } catch (error) {
                    console.error('There was a problem on Wykres(fetchRawDataWeek) with the fetch operation:', error);
                  }
               };

           const fetchRawDataMonth = async () => {
                         const url = `${BACKEND_API_URL}/api/account/${userId}/total/month`;
                         try {
                           const response = await fetch(url, {
                             method: 'GET',
                             headers: {
                               'Content-Type': 'application/json',
                             },
                           });
                        if (!response.ok) {
                          throw new Error('Network response on Wykres(fetchRawDataMonth) was not ok: ' + response);
                        }

                        const rawDataMonthResponse = await response.json();
                        setRawDataMonth(rawDataMonthResponse);
                      } catch (error) {
                        console.error('There was a problem on Wykres(fetchRawDataMonth) with the fetch operation:', error);
                      }
                   };

           const fetchRawDataHour = async () => {
                                const url = `${BACKEND_API_URL}/api/account/${userId}/hourly`;
                                try {
                                  const response = await fetch(url, {
                                    method: 'GET',
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                  });
                               if (!response.ok) {
                                 throw new Error('Network response on Wykres(fetchRawDataHour) was not ok: ' + response);
                               }

                               const rawDataHourResponse = await response.json();
                               setRawDataHour(rawDataHourResponse);
                             } catch (error) {
                               console.error('There was a problem on Wykres(fetchRawDataHour) with the fetch operation:', error);
                             }
                          };


    return (
        <ScrollView style={styles.pomieszczenie}>
            <View style={styles.header}>
                <Pressable  style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.strzakabbIcon}
                        resizeMode="cover"
                        source={require("../assets/strzakabb.png")}
                    />
                </Pressable>
                <Text style={[styles.gniazdko1, styles.actionTypo]}>{device.name}</Text>
            </View>
            <Image style={styles.Licz}
                source={require("../assets/LiczGnZa.png")}
            />
   <View style={styles.Wykres}>
                   <Text style={styles.labelText1}>Wykres</Text>
               </View>
               <View style={styles.Mies}>
                              <Text style={styles.labelText}>Dzienny</Text>
                        </View>
               <View style={styles.chartContainer}>
                              <LineChart
                                  data={dataGodzinny}
                                  width={screenWidth - 40} // Zmniejszenie szerokości
                                  height={200} // Z
                                  // Zmniejszenie wysokości
                                  chartConfig={chartConfig}
                                  fromZero
                                  style={styles.chartStyle}
                              />
                          </View>
               <View style={styles.Mies}>
                        <Text style={styles.labelText}>Tygodniowy</Text>
               </View>
               <View style={styles.chartContainer}>
                   <BarChart
                       data={dataTygodniowy}
                       width={screenWidth - 40} // Zmniejszenie szerokości
                       height={200} // Z
                       // Zmniejszenie wysokości
                       chartConfig={chartConfig}
                       fromZero
                       style={styles.chartStyle}
                   />
               </View>
               <View style={styles.Mies}>
                               <Text style={styles.labelText}>Miesięczny</Text>
                           </View>
                           <View style={styles.chartContainer}>
                               <LineChart
                                   data={dataMiesieczny}
                                   width={screenWidth - 40} // Zmniejszenie szerokości
                                   height={200} // Zmniejszenie wysokości
                                   chartConfig={chartConfig}
                                   bezier
                                   style={styles.chartStyle}
                               />
                           </View>
        </ScrollView>
            );
        };





const styles = StyleSheet.create({

    Licz: {
        marginTop: 65,
        left: 10,
    },
       actionTypo: {
            textAlign: "center",
            fontWeight: "700",
            letterSpacing: 0,
            position: "absolute",
        },
         gniazdko1: {
                top: 0,
                left: 130,
                fontSize: 20,
                width: 125,
                height: 45,
            },

    header: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically in the container
        justifyContent: 'center', // Center items horizontally in the container
        width: '100%', // Take full width to utilize the space for centering
        marginTop: 80, // Add some space between the header and the content
    },
    strzakabbIcon: {
        height: 50, // Adjust the height as needed
        width: 50, // Adjust the width as needed
        marginRight: 10, // Add some space between the icon and the text
    },
    headerText: {
        fontSize: 25, // Adjust the font size as needed
        fontWeight: 'bold', // Make the text bold
    },
    pomieszczenie: {
        flex: 1,
        overflow: "hidden",
    },
    backButton: {
        position: 'absolute',
        left: 20, // Adjust the position as needed
        top: -10, // Adjust the position as needed
    },
    chartContainer: {
            borderRadius: 16, // Zaokrąglenie rogów kontenera
            backgroundColor: '#ffffff', // Tło kontenera
            marginVertical: 8, // Margines pionowy dla oddzielenia wykresów
            shadowColor: "#000", // Cień dla kontenera
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Podniesienie kontenera, aby cień był widoczny
            overflow: 'hidden', // Zapobiega wyświetlaniu się linii wykresu poza zaokrąglonymi rogami
        },
        chartStyle: {
            borderRadius: 16, // Zaokrąglenie rogów wykresu (dla efektu wizualnego, jeśli wykres wyjdzie poza kontener)
            marginVertical: 8, // Margines pionowy dla wykresu wewnątrz kontenera
        },
        Wykres: {
                    marginTop: 23,
                    left: 10,
                    justifyContent: 'center',
                    alignItems: 'center',


                },
                Mies: {
                    marginTop: 25,
                    left: 15,
                    marginBottom: 15,


                },
                labelText1: {
                fontSize: 22, // Ustaw większą wartość, aby zwiększyć wielkość napisu
                fontWeight: 'bold',
                },
                labelText: {
                    fontSize: 18,
                    fontWeight: 'bold',

                },
});

export default EnergiaGniazdko;
