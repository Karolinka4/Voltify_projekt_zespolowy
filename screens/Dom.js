import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import {BACKEND_API_URL} from '@env';
import Pokoj from '../components/Pokoj';
import DodajPokoj from '../components/DodajPokoj';
import { useNavigation } from "@react-navigation/native";
import WszystkieUrzadzenia from '../screens/WszystkieUrzadzenia';
/*
##########################################################################
Wygląd Domku odrazu po odpaleniu aplikacji czyli bez żadnego pokoju
###########################################################################

*/

export default function Dom() {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

   useEffect(() => {
       const fetchRooms = async () => {
         const url = `${BACKEND_API_URL}/rooms/1`;// ########### tutaj też jest na stałe przypisana 1

         try {
           const response = await fetch(url, {
             method: 'GET',
             headers: {
               'Content-Type': 'application/json',
             },
           });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const roomsData = await response.json();
        setRooms(roomsData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchRooms();
  }, [rooms]);

  const handleAddRoom = (room) => {
    setRooms(prevRooms => [...prevRooms, room]);
    setModalVisible(false);
  };

  const handleEditRoom = (updatedRoom) => {
    const updatedRooms = rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room);
    setRooms(updatedRooms);
    setEditRoom(null);
    setModalVisible(false);
  };

  const deleteRoomFromServer = async(roomId) => {
    const url = `${BACKEND_API_URL}/delete-room/1/${roomId}`;//http://localhost:5000/delete-room/1/${roomId} ######ta jedynka to jest na sztywno oznacza użytkownika
    try {
           const response = await fetch(url, {
             method: 'DELETE', // Using the DELETE method as specified
           });

           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           setRooms(currentRooms => currentRooms.filter(room => room.id !== roomId));
           } catch (error) {
                 console.error('There was a problem with the fetch operation:', error);
           }
  };

  const handleDeleteRoom = (roomId) => {
    //setRooms(rooms.filter(room => room.id !== roomId)); //To jest stara wersja, która działa tylko dla danych statycznych(omijając bazę danych)
    deleteRoomFromServer(roomId);
  };

  const handleOnClose = () => {
    setEditRoom(null);
    setModalVisible(false);
  };

  const openEditModal = (room) => {
    setEditRoom(room);
    setModalVisible(true);
  };

  return (
    <View style={styles.domb}>
      <Image
        style={styles.domChild}
        source={require("../assets/frame-147.png")}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('WszystkieUrzadzenia')}>
          <Text style={styles.buttonText1}>Urządzenia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>+ Pokój</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Pokoj rooms={[item]} onDelete={handleDeleteRoom} onEdit={() => openEditModal(item)} />}
      style={styles.pokoojList}
      />
      <DodajPokoj
        visible={modalVisible}
        onClose={handleOnClose}
        onSubmit={editRoom ? handleEditRoom : handleAddRoom}
        editRoom={editRoom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  domb: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: 'center',
    paddingTop: 60, // Dostosuj według potrzeb
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 28,
  },
  domChild: {
    width: 200,
    height: 50,
    height: 50,
    marginBottom: 20, // Dostosuj według potrzeb
  },


  button: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    width: 120,
    marginRight: 20, // Dostosuj według potrzeb
    borderWidth: 3,
    borderColor: '#92C721',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'medium',
  },
  button1:
  {

    borderColor: '#92C721',
    backgroundColor: '#64AD1B',
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginLeft: 20, // Dostosuj według potrzeb
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'medium',
  },
  pokoojList: {
    width: '100%',
    marginTop: 20,
  },
});


