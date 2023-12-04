# Asitencia QR
El proyecto fue desarrollado en Viusual Studio Code con react y react native, usando como backend Node y con una base de datos en Mysql.

El proyecto esta dividido en 3 partes 

- \AsistenciaQRMovil\clientmovil
- \AsistenciaQR\client
- \AsistenciaQR\server

## Instalacion 
Restaurar la base de datos en Mysql.
### \AsistenciaQR\server 
Dentro de la ruta realizar el siguiente comando:
```bash
npm install
```
Dentro del index.js modificar tu conexion:
```bash
const db = mysql.createConnection({
    host:"localhost",
    user:"root", // TU USUARIO DE MYSQL
    password:"salas", // TU PASSWORD DE MYSQL
    database:"asistencidbrev"
});
```
para hacer correr el backend  y levantar el servidor:
```bash
node index.js
```
si excistiera algun problema con los permisos de mysql o la version no sea detectada en un query de mysql hacer correr los siguientes lineas de comando:
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'TU_PASSWORD'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'TU_PASSWORD';

FLUSH PRIVILEGES;
```
---
### \AsistenciaQR\client
Dentro de la ruta realizar el siguiente comando:
```bash
npm install
```
luego iniciar el proyecto:
```bash
npm start
```
dentro de la vista podemos acceder con las siguientes credenciales:

```bash
En el campo email address: "admin"
En el campo password "1"
```
De este modo ingresamos a la parte Web del cliente.
---

### \AsistenciaQRMovil\clientmovil

Dentro de la ruta realizar el siguiente comando:
```bash
npm install
```
luego iniciar el proyecto:
```bash
npm start
```

Realizar unas breves modificaciones para hacer correr las vistas dependiendo de tu conexion:
```bash
\AsistenciaQRMovil\clientmovil\components\Login.js
```
```bash
Linea de code 15
const handleLogin = async () => {
  console.log(username, password);
  //cambiar la ip por la de la maquina donde se ejecute la red local
  Axios.post("http://192.168.100.111:3001/loginm", {
    //Axios.post("http://TU DIRECCION IPv4:3001/loginm", {
   
```
```bash
\AsistenciaQRMovil\clientmovil\components\SecretaryPage.js
```
```bash
Linea de code 50
//cambiar la ip por la de la maquina donde se ejecute la red local
    axios.put('http://192.168.100.111:3001/actualizarasistencia', { codeqr: qrLeido }).then(res=>{
      //axios.put('http://TU DIRECCION IPv4:3001/actualizarasistencia', { codeqr: qrLeido }).then(res=>{
   
```

Exiten 2 tipos de credenciales para el cliente movil el Cliente solo ve un qr y la secretaria lee el QR para hcer la prueba le especifico 2 credenciales:
```bash
Este es un ejemplo para cliente
En el campo Username: "salas"
En el campo password: "123"
```
```bash
Este es un ejemplo para Secretaria
En el campo Username: "diana"
En el campo password: "123"
```


