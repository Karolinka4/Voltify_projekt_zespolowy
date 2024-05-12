import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Color, FontFamily, Border, FontSize } from '../GlobalStyles';
import {BACKEND_API_URL} from '@env';
/*
##########################################################################
Wygląd edycji,dodawania i usuwania urządzenia (to nie jest wygląd dodania urządzenia)
###########################################################################

*/

const Urzadzenia = ({ isVisible, onClose, selectedDevice, onSave, onDelete }) => {
  const [nazwa, setNazwa] = useState('');
  const [id, setId] = useState('');
  const [ip, setIp] = useState('');
  const [room, setRoom] = useState('');
  const [type, setType] = useState('');


const handleSave = () => {
  const data = { ip, name: nazwa, room, type };
  addDevice(data).then(() => {
    onClose();
  });
};

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
      onClose();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };




  const addDevice = (deviceData) => {
    fetch(`${BACKEND_API_URL}/add-device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      onClose();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
            onChangeText={setId}
            value={id}
            placeholder="ID"
            keyboardType="numeric"
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave} // Poprawione na handleSave
            >
              <Text style={styles.textStyle}>Zapisz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDelete]}
              onPress={handleDelete}
            >
              <Text style={styles.textStyle}>Usuń</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
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