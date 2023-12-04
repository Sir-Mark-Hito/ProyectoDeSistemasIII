import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';



const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  console.log(username, password);
  //cambiar la ip por la de la maquina donde se ejecute la red local
  Axios.post("http://192.168.100.111:3001/loginm", {
    //Axios.post("http://192.168.106.69:3001/loginm", {
    username: username,
    password: password
  }).then( async (res) => {
      //console.log(res.data)
      console.log('res.data:', res.data);
    if(!res.data.error){    
       console.log(res.data);
       await AsyncStorage.setItem('userData', JSON.stringify(res.data));
       if(res.data.rol === "Secretaria"){
         navigation.replace('SecretaryPage')
        }else{
         navigation.replace('StudentPage')

       }
     
   
  } else {
    alert("Los datos ingresados son incorrectos");
  }
}).catch(error => {
  console.error(error);
});


};
 
  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
