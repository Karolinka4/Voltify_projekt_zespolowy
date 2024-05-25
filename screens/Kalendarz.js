import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const Kalendarz = ({ navigation }) => {
    const [selectedWeekDay, setSelectedWeekDay] = useState(null);
    const [selectedDay, setSelectedDay] = useState({});
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({});
    const [markedDatesCyclic, setMarkedDatesCyclic] = useState({});
    const [showPicker, setShowPicker] = useState(false);
    const [isCyclic, setIsCyclic] = useState(false); // Stan do śledzenia trybu cyklicznego

    const today = new Date().toISOString().split('T')[0];

    const handleDayPress = (day) => {
        const { dateString } = day;
        setSelectedDay(day);
        if (markedDates[dateString]) {
            const newMarkedDates = { ...markedDates };
            delete newMarkedDates[dateString]; // Usuń zaznaczenie dnia
            setMarkedDates(newMarkedDates);
            setShowPicker(false); // Ukryj picker, jeśli istnieje
        } else {
            setShowPicker(true); // Pokaż DateTimePicker, jeśli dzień nie był wcześniej zaznaczony
        }
    };

    const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

    const handleWeekDayPress = (dayIndex) => {
        // Sprawdź, czy już zaznaczono ten dzień tygodnia
        if (selectedWeekDay === dayIndex) {
            // Usuń zaznaczenie
            setSelectedWeekDay(null);
            setMarkedDates({});
        } else {
            setSelectedWeekDay(dayIndex);
            setShowPicker(false);
        }
    };


    const onChangeTime = (event, selectedDate) => {
        setShowPicker(false); // Ukrywa DateTimePicker po wybraniu godziny
        if (selectedDate && selectedWeekDay !== null) {
            setSelectedTime(selectedDate);
            const timeString = selectedDate.toTimeString().substring(0, 5);
            const newMarkedDates = {};

            // Przejdź przez wszystkie daty w zakresie kalendarza i zaznacz wybrane dni tygodnia
            let currentDate = new Date(today);
            const endDate = new Date('2025-12-31');
            while (currentDate <= endDate) {
                if (currentDate.getDay() === selectedWeekDay) {
                    const dateString = currentDate.toISOString().split('T')[0];
                    newMarkedDates[dateString] = {
                        selected: true,
                        marked: true,
                        selectedColor: 'blue',
                        dotColor: 'red',
                        time: timeString,
                    };
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            setMarkedDates(newMarkedDates);
            setSelectedWeekDay(null); // Resetuj wybrany dzień tygodnia po zaznaczeniu
        }
    };






    const toggleCyclicMode = () => {
        setIsCyclic(!isCyclic);

        if (!isCyclic) {
            // Przechodzimy do trybu cyklicznego
            const newMarkedDatesCyclic = {};
            Object.keys(markedDates).forEach((date) => {
                const [year, month, day] = date.split('-').map(Number);
                const selectedDate = new Date(year, month - 1, day + 1);
                const dayOfWeek = selectedDate.getDay(); // Dzień tygodnia, 0 - niedziela, 1 - poniedziałek, ...

                // Znajdź, który to wtorek (lub inny dzień tygodnia) w miesiącu
                let whichWeek = Math.ceil(day / 7);

                for (let i = 0; i < 12; i++) { // Dla każdego miesiąca w roku
                    let monthDays = new Date(year, i + 1, 0).getDate(); // Liczba dni w miesiącu
                    let count = 0; // Licznik dni tygodnia w miesiącu

                    for (let day = 1; day <= monthDays; day++) {
                        let futureDate = new Date(year, i, day);
                        if (futureDate.getDay() === dayOfWeek) {
                            count++;
                            if (count === whichWeek) {
                                let futureDateString = futureDate.toISOString().split('T')[0];
                                newMarkedDatesCyclic[futureDateString] = {
                                    selected: true,
                                    marked: true,
                                    selectedColor: 'blue',
                                    dotColor: 'red',
                                };
                                break; // Przejdź do następnego miesiąca
                            }
                        }
                    }
                }
            });

            setMarkedDatesCyclic(newMarkedDatesCyclic);
        } else {
            // Przechodzimy do trybu niecyklicznego, usuwamy wszystkie cykliczne daty
            setMarkedDatesCyclic({});
        }
    };






    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.iconContainer}>
                        <Image
                            style={styles.strzakabbIcon}
                            resizeMode="cover"
                            source={require("../assets/strzakabb.png")}
                        />
                    </Pressable>
                    <Text style={styles.title}>Harmonogram</Text>
                </View>
                <Button title={isCyclic ? "Cykliczne" : "Normalne"} onPress={toggleCyclicMode} />
                <Calendar
                    current={today}
                    minDate={today}
                    maxDate={'2025-12-31'}
                    onDayPress={handleDayPress}
                    monthFormat={'yyyy-MM-dd'}
                    hideExtraDays={true}
                    firstDay={1}
                    showWeekNumbers={true}
                    hideDayNames={false}
                    markedDates={isCyclic ? markedDatesCyclic : markedDates}
                />
                {showPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedTime}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                        minimumDate={new Date()}
                        maximumDate={new Date(2025, 11, 31)}
                    />
                )}
            </View>
            <Text style={styles.Wdzien}> W każdy: </Text>
            <View style={styles.weekDaysContainer}>
                {weekDays.map((day, index) => (
                    <Pressable key={index} onPress={() => handleWeekDayPress(index)} style={styles.weekDayButton}>
                        <Text style={styles.weekDayText}>{day}</Text>
                    </Pressable>
                ))}


            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => console.log('Zapisz')} style={styles.saveButton}>
                    <Text style={styles.buttonText}>Zapisz</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Usuń')} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Usuń</Text>
                </Pressable>
            </View>
        </>

    );
};


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        paddingTop: 50,

    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#4CAF50', // Zielony
        padding: 10,
        borderRadius: 5,
        width: '40%', // Szerokość przycisku jako procent szerokości kontenera
        alignItems: 'center', // Centruje tekst w przycisku
    },
    deleteButton: {
        backgroundColor: '#F44336', // Czerwony
        padding: 10,
        borderRadius: 5,
        width: '40%', // Podobnie, szerokość jako procent
        alignItems: 'center', // Centruje tekst w przycisku
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },






    weekDaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Możesz także spróbować 'space-between' dla różnych efektów
        flexWrap: 'wrap', // Pozwala elementom "zawijać się" na nową linię
        marginTop: 30, // Dodaje odstęp pomiędzy elementami w rzędzie
    },
    weekDayButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10, // Dodaje odstęp pomiędzy rzędami
        marginLeft: 5, // Dodaje odstęp pomiędzy elementami w rzędzie
        marginRight: 5, // Dodaje odstęp pomiędzy elementami w rzędzie
    },
    weekDayText: {
        fontSize: 16,
    },

    Wdzien: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#0399ff'

    },

    header: {
        flexDirection: 'row', // Elementy w poziomie
        alignItems: 'center', // Wyśrodkowanie w pionie
        marginBottom: 50,
    },
    iconContainer: {
        marginRight: 10, // Dodaje odstęp między ikoną a tekstem
    },
    strzakabbIcon: {
        height: 44, // Zaktualizuj wysokość
        width: 44, // Zaktualizuj szerokość
        marginRight: 30, // Dodaje odstęp między ikoną a tekstem
        marginLeft: 32, // Dodaje odstęp między ikoną a tekstem
    },
    title: {
        fontSize: 24,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
});

export default Kalendarz;
