import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SecretaryPage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  useEffect(() => {
    (async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
  
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error al solicitar permisos de cámara:', error);
      }
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
  
    
    console.log('qr:', data);
    const qrLeido = data;
    //cambiar la ip por la de la maquina donde se ejecute la red local
    axios.put('http://192.168.100.111:3001/actualizarasistencia', { codeqr: qrLeido }).then(res=>{
      //axios.put('http://192.168.106.69:3001/actualizarasistencia', { codeqr: qrLeido }).then(res=>{
      alert('Asistencia actualizada correctamente: '+ data) ;
    }).catch(error => {
      console.error('error--->',error.response.data.error);
      alert(error.response.data.error);    
    });      
   
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerContainer: {
    height: '40%', 
    width: '60%', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 10, 
  },
  scanner: {
    flex: 1,
    width: '100%',
  },
});