import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { BACKEND_API_URL } from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';

const EnergiaZarowka = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { device } = route.params;

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

export default EnergiaZarowka;
