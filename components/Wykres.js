import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Wykres = () => {
    const chartConfig = {
        backgroundGradientFrom: "#ffffff", // Ustawienie na biały
        backgroundGradientTo: "#ffffff", // Ustawienie na biały
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Zmiana koloru linii na ciemniejszy
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Zmiana koloru etykiet na ciemniejszy
        strokeWidth: 2, // Grubość linii
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        fillShadowGradientOpacity: 1,
        decimalPlaces: 0, // Usunięcie miejsc po przecinku dla wartości
    };

    const dataMiesieczny = {
        labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
        datasets: [
            {
                data: [300, 450, 500, 700, 600, 800, 900, 850, 750, 650, 400, 500],
            },
        ],
    };

    const dataTygodniowy = {
        labels: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
        datasets: [
            {
                data: new Array(7).fill(null).map(() => Math.random() * 90 + 10),
                color: (opacity = 1) => `rgba(144, 238, 144, ${opacity})`, // Zmiana koloru słupków na jasny zielony
            },
        ],
    };


    return (
        <>
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
        </>
    );
};

const styles = StyleSheet.create({
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
});

export default Wykres;
