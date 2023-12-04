import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../components/Login';
import SecretaryPage from '../components/SecretaryPage';
import StudentPage from '../components/StudentPage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    setUser(user);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
          <Stack.Screen name="Login" component={LoginScreen} />
        
        <Stack.Screen name="SecretaryPage" component={SecretaryPage} />
              <Stack.Screen name="StudentPage" component={StudentPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}