import React, { useState, useEffect } from 'react';
import { View, Text, Image ,StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    };

    fetchUserData();
  }, []);
  console.log('userData:', userData);
  return (
    <View style={styles.container}>
      <Text>Código QR de Asistencia</Text>
      {userData && userData.codeqr ? (
        <View style={styles.qrContainer}>
          <QRCode value={userData.codeqr} size={200} />
        </View>
      ) : (
        <Text>Cargando código QR...</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StudentPage;