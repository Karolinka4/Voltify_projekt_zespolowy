import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import {BACKEND_API_URL} from '@env';
import Pokoj from '../components/Pokoj';
import DodajPokoj from '../components/DodajPokoj';
import { useNavigation } from "@react-navigation/native";
import WszystkieUrzadzenia from '../screens/WszystkieUrzadzenia';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';
import { useFetchContext } from '../FetchAllDataContext.js';

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
  const [userId, setUserId] = useState(null);
  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const { key } = useFetchContext();
  useEffect(() => {
    // Przykład użycia funkcji odczytu danych
    getDataFromStorage('@myKey').then((data) => {
        setUserId(data.Key);
    });
  }, []);

//@@@@@@@@@@@@@@@@@@@@@@@ może [userId, rooms] trzeba dopisać rooms
   useEffect(() => {
      console.log("Pobieram dane na głównej stronie(pokoje, urżądzenia itp)");
       const fetchRooms = async () => {
         const url = `${BACKEND_API_URL}/api/account/${userId}/room/`;// ########### tutaj też jest na stałe przypisana 1
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

        const roomsData = await response.json();
        setRooms(roomsData);
      } catch (error) {
        console.error('There was a problem on DOM(fetchRooms) with the fetch operation:', error);
      }
    };
    if (userId) {
      fetchRooms();
    }
  }, [userId, refreshFlatList, key]);//TODO Test modalVisible

  const handleAddRoom = (room) => {
    addRoomToServer(room);
    //setRooms(prevRooms => [...prevRooms, room]);
    setModalVisible(false);
  };

  const handleEditRoom = (updatedRoom) => {
    //const updatedRooms = rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room);
    editRoomToServer(updatedRoom);
    //setRooms(updatedRooms);
    setEditRoom(null);
    setModalVisible(false);
  };

  const deleteRoomFromServer = async(roomId) => {
    const url = `${BACKEND_API_URL}/api/account/${userId}/room/${roomId}/`
    try {
           const response = await fetch(url, {
             method: 'DELETE', // Using the DELETE method as specified
           });

           if (!response.ok) {
             throw new Error('Network response on DOM(DEleteRoomFromServer) was not ok');
           }
           setRooms(currentRooms => currentRooms.filter(room => room.id !== roomId));
           } catch (error) {
                 console.error('There was a problem on DOM(DeleteRoomFromServer) with the fetch operation:', error);
           }
  };

 const addRoomToServer = async(room) => {
    const url = `${BACKEND_API_URL}/api/account/${userId}/room/`;
    const formData = new FormData();

    formData.append('name', room.name);
    const partsUrl = room.image.split('/');
    const fileNameByUrl = partsUrl[partsUrl.length - 1];

    let photoUrl = room.image;
    if(!room.image.startsWith('http:')){
         photoUrl = `file://${room.image}`;
         const photo = {
            uri:  photoUrl,
            type: 'image/png',
            name: fileNameByUrl,
         }
         formData.append('photo', photo);
    }
    try{
        const response = await fetch(url, {
        method: 'POST',
        body: formData,
        });

        if(!response.ok){
            throw new Error('Something went wrong on Dom(addRoomToServer): network error');
        }

        const responseData = await response.json();
        console.log(responseData);
        setRefreshFlatList(prev => !prev);
    } catch(error){
     console.error('There was a problem on Dom(addRoomToServer) with the fetch operation:', error);
    }


  };

   const editRoomToServer = async(room) => {
      const url = `${BACKEND_API_URL}/api/account/${userId}/room/${room.id}/`;
      const formData = new FormData();

      formData.append('name', room.name);

        const partsUrl = room.image.split('/');
      const fileNameByUrl = partsUrl[partsUrl.length - 1];

        let photoUrl = room.image;
              if(!room.image.startsWith('http:')){
                 photoUrl = `file://${room.image}`;
                 const photo = {
                         uri:  photoUrl,
                         type: 'image/png',
                         name: fileNameByUrl,
                       }
                 formData.append('photo', photo);
               }
        console.log(photoUrl);


      try{
          const response = await fetch(url, {
          method: 'PUT',
          body: formData,
          });

          if(!response.ok){
              throw new Error('Something went wrong on Dom(editRoomToServer): network error: ');
          }

          const responseData = await response.json();
          console.log(responseData);
          setRefreshFlatList(prev => !prev);
      } catch(error){
              console.error('There was a problem on Dom(editRoomToServer) with the fetch operation:', error);
            }
    };

  const handleDeleteRoom = (roomId) => {
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