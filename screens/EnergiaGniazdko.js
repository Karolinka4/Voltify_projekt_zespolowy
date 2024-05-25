import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Image, Dimensions } from 'react-native';  //Dimentions dopisałam
import { BACKEND_API_URL } from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';

//import { LineChart, BarChart } from 'react-native-chart-kit';
//import axios from 'axios';

const EnergiaGniazdko = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { device } = route.params;

    //  const [chartData, setChartData] = useState({
    //     labels: [],
    //     datasets: [
    //       {
    //         data: [],
    //       },
    //     ],
    //   });

    //  const fetchData = async () => {
    //      try {
    //
    //        const response = await axios.get(`${BACKEND_API_URL}/device/${device.id}/hourly/`);
    //        const data = response.data;
    //        const labels = data.map(item => item.hour.toString());
    //        const consumptionData = data.map(item => item.average_consumption);
    //
    //        setChartData({
    //          labels,
    //          datasets: [
    //            {
    //              data: consumptionData,
    //            },
    //          ],
    //        });
    //      } catch (error) {
    //        console.error('Error fetching data: ', error);
    //      }
    //    };
    //     useEffect(() => {
    //        fetchData();
    //      }, []);



    return (
        <View style={styles.pomieszczenie}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image
                        style={styles.strzakabbIcon}
                        resizeMode="cover"
                        source={require("../assets/strzakabb.png")}
                    />
                </Pressable>
                <Text style={styles.headerText}>{device.name}</Text>
            </View>
            <Image style={styles.Licz}
                source={require("../assets/LiczGnZa.png")}
            />

//     {/* Wykres */}
//      <LineChart
//        data={chartData}
//        width={Dimensions.get('window').width - 16}
//        height={220}
//        yAxisLabel=""
//        yAxisSuffix=" kWh"
//        chartConfig={{
//          backgroundColor: "#e26a00",
//          backgroundGradientFrom: "#fb8c00",
//          backgroundGradientTo: "#ffa726",
//          decimalPlaces: 2,
//          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//          style: {
//            borderRadius: 16
//          },
//          propsForDots: {
//            r: "6",
//            strokeWidth: "2",
//            stroke: "#ffa726"
//          }
//        }}
//        bezier
//        style={{
//          marginVertical: 8,
//          borderRadius: 16
//        }}
//      />



    </View>
    );
};

const styles = StyleSheet.create({

    Licz: {
        marginTop: 25,
        left: 10,
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
});

export default EnergiaGniazdko;
