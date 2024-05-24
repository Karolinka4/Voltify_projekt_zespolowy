import React, { useState, useEffect } from 'react';
import { Modal, View, Button, TextInput, StyleSheet, Image, Alert, TouchableOpacity, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {BACKEND_API_URL} from '@env';
import { getDataFromStorage } from '../AsyncStorage/AsyncStorage';
/*
##########################################################################
Wygląd edycji dodawania pokoju
###########################################################################

*/


const DodajPokoj = ({ visible, onClose, onSubmit, editRoom }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {

  getDataFromStorage('@myKey').then((data) => {
    setUserId(data.Key);
  });

    if (editRoom) {
      setName(editRoom.name);
      setImage(editRoom.photo);//TODO przy dodwaniu jak nie będzie zdjęcia to zamienić na image
      setShowImage(true);
    } else {
      setName('');
      setImage(null);
      setShowImage(false);
    }
  }, [editRoom]);

  const pickImage = async () => {


    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setShowImage(true);
    }
  };

  const handleSubmit = () => {
    if (!name) {
      Alert.alert('Błąd', 'Nazwa pokoju jest wymagana.');
      return;
    }
    //addRoomToServer(name);
    //TODO MOżę dodać to głupie losowanie ID, jak się wywali
    onSubmit({ id: editRoom ? editRoom.id : null, name, image });
    setName('');
    setImage(null);
  };

  return (

    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <TextInput
          style={styles.input}
          placeholder="Nazwa pokoju"
          value={name}
          onChangeText={setName}
        />
       <TouchableOpacity style={[styles.button, styles.pickImageButton]} onPress={pickImage}>
           <Text style={styles.buttonText}>Wybierz zdjęcie</Text>
         </TouchableOpacity>
         {(image || showImage) && <Image source={{ uri: image }} style={styles.previewImage} />}
         <View style={styles.buttonContainer}>
           <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
             <Text style={styles.buttonText}>Zapisz</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
             <Text style={styles.buttonText}>Anuluj</Text>
           </TouchableOpacity>
         </View>
       </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

buttonContainer: {
  flexDirection: 'row', // Układa przyciski poziomo
  justifyContent: 'space-around', // Rozdziela przyciski równomiernie w kontenerze
  width: 200, // Opcjonalnie, ustawia szerokość kontenera przycisków na 100% dostępnego miejsca
  padding: 30, // Opcjonalnie, dodaje odstęp wewnątrz kontenera przycisków
  left: 75, // Opcjonalnie, ustawia prawo marginesu kontenera przycisków
},


  input: {
    height: 50,
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  previewImage: {
    width: 300,
    height: 150,
    marginTop: 15,
    marginBottom: 15,

  },
  button: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickImageButton: {
      backgroundColor: '#A9A9A9', // Niebieski
      width: "80%",
        shadowColor: '#696969',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 10,
    },
    saveButton: {
      backgroundColor: '#64AD1B', // Zielony
      width: "80%",
      right: 70,
    },
    cancelButton: {
      backgroundColor: '#dc3545', // Czerwony
      width: "80%",
      right: 22,
    },
      buttonText: {
        color: '#000000',
      },
});

export default DodajPokoj;