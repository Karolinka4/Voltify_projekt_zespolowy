import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Color, FontFamily, Border, FontSize } from '../GlobalStyles';
import { BACKEND_API_URL } from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';

/*
##########################################################################
Wygląd edycji,dodawania i usuwania urządzenia (to nie jest wygląd dodania urządzenia)
###########################################################################
*/
{/* tutaj dodałem nową zmienną onEdit, któa jest odpowiedzialna za wyswietlanie przycisku usun  */ }
const Urzadzenia = ({ isVisible, onClose, selectedDevice, onEdit, onSave, onDelete, roomId }) => {
    const [nazwa, setNazwa] = useState('');
    const [ip, setIp] = useState('');
    const [userId, setUserId] = useState(null);
    const [cost, setCost] = useState('');

    useEffect(() => {
        // Przykład użycia funkcji odczytu danych
        getDataFromStorage('@myKey').then((data) => {
            setUserId(data.Key);
        });
    }, []);


    const handleSave = () => {
        const data = { name: nazwa, ip, room: roomId, energy_cost: cost };
        if (selectedDevice === "Zarowke") {
            addSmartBulb(data).then(() => {
                onCloseModal();
            });
        }
        else {
            addSmartPlug(data).then(() => {
                onCloseModal();
            });
        }

    };

    const onCloseModal = () => {
        setCost('');
        setIp('');
        setNazwa('');
        onClose();
    }

    const handleDelete = () => {
        fetch(`${BACKEND_API_URL}/delete-device/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Device deleted successfully:', data);
                onCloseModal();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const addSmartBulb = async (deviceData) => {
        const url = `${BACKEND_API_URL}/api/account/${userId}/smartbulb/`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceData),
            });
            if (!response.ok) {
                throw new Error('Network response on Urządzenia(addSmartBulb) was not ok: ' + response);
            }
            const responseData = await response.json();
            console.log('Success:', responseData);
            onCloseModal();
        } catch (error) {
            console.error('There was a problem on Urządzenia(addSmartBulb) with the fetch operation:', error);

        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Dodaj {selectedDevice}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNazwa}
                        value={nazwa}
                        placeholder="Nazwa"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setIp}
                        value={ip}
                        placeholder="IP"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setCost}
                        value={cost}
                        placeholder="Taryfa"
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={handleSave} // Poprawione na handleSave
                        >
                            <Text style={styles.textStyle}>Zapisz</Text>
                        </TouchableOpacity>
                        {onEdit && (<TouchableOpacity
                            style={[styles.button, styles.buttonDelete]}
                            onPress={handleDelete}
                        >
                            <Text style={styles.textStyle}>Usuń</Text>
                        </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={onCloseModal}
                        >
                            <Text style={styles.textStyle}>Anuluj</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};



const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%', // Zwiększ szerokość modalView, aby pomieścić szersze pola tekstowe
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: FontFamily.latoBold,
        fontSize: FontSize.size_lg,
        color: '#333',
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        width: '100%', // Zwiększ szerokość inputów do 100% modalView
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    buttonsContainer: {
        flexDirection: 'row', // Ustaw przyciski w poziomie
        justifyContent: 'space-between', // Rozłóż przyciski równomiernie
        width: '100%', // Dopasuj szerokość kontenera przycisków do szerokości modalView
        marginTop: 10,
    },
    button: {
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20, // Możesz zwiększyć padding, jeśli tekst jest dłuższy
        elevation: 2,
        width: '33%', // Zwiększ szerokość każdego przycisku, aby lepiej pasowały do tekstu
        alignItems: 'center',
        justifyContent: 'center', // Dodane, aby zapewnić wyśrodkowanie tekstu w przycisku
        marginHorizontal: 2, // Dodane, aby zapewnić odstępy między przyciskami
    },
    buttonSave: {
        backgroundColor: "#32CD32",
    },
    buttonDelete: {
        backgroundColor: "#FF0000",
    },
    buttonClose: {
        backgroundColor: "#FFD700",
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: FontSize.size_md, // Możesz dostosować rozmiar czcionki, jeśli jest to konieczne
        textAlign: 'center', // Upewnij się, że tekst jest wyśrodkowany
    },
});


export default Urzadzenia;