import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur'; // Upewnij się, że masz zainstalowany expo-blur

const { width } = Dimensions.get('window');

const Pokoj = ({ rooms, onDelete, onEdit }) => {
    const navigation = useNavigation();
    return (
        <FlatList
            data={rooms}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Pomieszczenie', {
                        name: item.name,
                        image: item.photo,
                        roomId: item.id,
                        devices: item.devices
                    })}>
                        <Image source={{ uri: item.photo }} style={styles.fullWidthImage} />
                    </TouchableOpacity>

                    {/* Umieszczamy BlurView tylko pod tekstem i przyciskami */}
                    <View style={styles.textAndButtonsContainer}>
                        <BlurView intensity={140} style={styles.blurContainer}>
                            <Text style={styles.roomName}>{item.name}</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => onEdit(item)}>
                                    <Text style={[styles.buttonText, styles.editButton]}>Edytuj</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
                                    <Text style={[styles.buttonText, styles.deleteButton]}>Usuń</Text>
                                </TouchableOpacity>

                            </View>
                        </BlurView>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        width: width - 25,
        alignSelf: 'center',
        position: 'relative',
    },
    fullWidthImage: {
        width: '100%',
        height: 200,
    },
    textAndButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',

    },
    blurContainer: {
        padding: 0,
        width: '100%',



    },
    nameAndButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roomName: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#000000', // Możesz dostosować kolor tekstu
        marginLeft: 10,


    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: -7,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,

    },
    buttonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',

    },
    editButton: {
        // backgroundColor: '#FFD700',
        color: '#008000',
        textDecorationLine: 'underline',

    },
    deleteButton: {
        //backgroundColor: '#FF6347',
        color: '#FF0000',
        //borderWidth: 1,
        //borderRadius: 20,
        //borderColor: '#FF0000',
        textDecorationLine: 'underline',
    },
});

export default Pokoj;