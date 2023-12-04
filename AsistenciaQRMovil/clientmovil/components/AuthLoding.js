import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator,  View } from 'react-native';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUser = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      navigation.navigate(userToken ? 'Home' : 'Login');
    };

    checkUser();
  }, []);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoadingScreen;