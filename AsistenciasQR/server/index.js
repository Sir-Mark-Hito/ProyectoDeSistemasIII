const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const util = require('util');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"salas",
    database:"asistencidbrev"
});

const promiseQuery = util.promisify(db.query).bind(db);

app.post("/createEvento",(req,res)=>{
    const nombre = req.body.nombre;
    const fecIni = req.body.fecIni;
    const fecFin = req.body.fecFin;
    const horIni = req.body.horIni;
    const horFin = req.body.horFin;
    const org = req.body.org;
    const ubi = req.body.ubi;

    
    db.query('INSERT INTO evento(nombre,fecha_inicio,fecha_final,hora_inicio,hora_final,organizador_id,ubicacion) VALUES(?,?,?,?,?,?,?)'
    ,[nombre,fecIni,fecFin,horIni,horFin,org,ubi],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Evento registrado con Exito");
        }
    });
});

app.put("/updateEvento",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const fecIni = req.body.fecIni;
    const fecFin = req.body.fecFin;
    const horIni = req.body.horIni;
    const horFin = req.body.horFin;
    const org = req.body.organizador_id;
    const ubi = req.body.ubicacion;

    
    db.query('UPDATE evento SET nombre = ?, fecha_inicio = ?, fecha_final = ?, hora_inicio = ?, hora_final = ?,organizador_id = ?,ubicacion = ? WHERE id = ?'
    ,[nombre,fecIni,fecFin,horIni,horFin,org,ubi,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{            
            res.send("Evento actualizado con Exito");
        }
    });
}); 

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

app.post("/createLista", async  (req,res)=>{   
   
    try {

    const persona_id = req.body.nombre;
    const evento = req.body.evento;
    const [eventoN,fieldEvneto] =  await promiseQuery(
        'SELECT nombre FROM evento WHERE id = ?', [evento]
      );
    const [persona,fieldPersona] =  await promiseQuery(
        'SELECT nombre, primer_apellido, username, carrera FROM persona WHERE id = ?',
        [persona_id]
      );
      const codeqr = eventoN.nombre+'-'+ persona.nombre+'-'+persona.primer_apellido+'-'+persona.username+'-'+persona.carrera;
    const result = await promiseQuery('INSERT INTO listaasistencia (persona_id, evento_id,codeqr) VALUES (?, ?,?)', [persona_id, evento,codeqr]);
    
    return res.send(result);    
    
  
    } catch (error) {
        return res.send(error);
    }
    
    // Obtener la fecha de inicio del evento
   
  /*  const fechaActivacion = eventox[0].fecha_inicio;
   
    // Generar o recuperar la imagen_qr desde React (sustituir esto por tu lógica específica)
    const imagenQrBlob = '';

    // Generar el codeqr concatenando nombre, primer_apellido, username y carrera
    const persona =  db.query(
      'SELECT nombre, primer_apellido, username, carrera FROM Persona WHERE id = ?',
      [persona_id]
    );

    const codeqr = `${persona[0].nombre}${persona[0].primer_apellido}${persona[0].username}${persona[0].carrera}`;
  
    // Insertar en la tabla QR
     db.query(
      'INSERT INTO qr (lista_asistencia_id, fecha_activacion, imagen_qr, codeqr) VALUES (?, ?, ?, ?)',
      [result.id, fechaActivacion, imagenQrBlob, codeqr]
    ); */

    //insert a tu qr


});

app.delete("/deleteEvento/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM evento WHERE id = ?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Evento eliminado con Exito");
        }
    });
});

app.delete("/deleteLista/:id",(req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM listaasistencia WHERE id = ?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("resultado eliminado con Exito");
        }
    });
});


app.put("/updateLista",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const evento = req.body.evento;
   
    
    db.query('UPDATE listaasistencia SET persona_id = ?, evento_id = ? WHERE id = ?'
    ,[nombre,evento,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Registro actualizado con Exito");
        }
    });
});
//actualizar asistencia
app.put("/updateListaQr",(req,res)=>{
    const id = req.body.id;
  
    db.query('UPDATE ListaAsistencia SET asistencia = 1 WHERE id = ?'
    ,[nombre,evento,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Asistencia modificada con Exito");
        }
    });
});



app.get("/evento",(req,res)=>{   
    db.query('SELECT * FROM evento',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get("/persona",(req,res)=>{   
    db.query('SELECT * FROM persona',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


app.get("/personaAdmin",(req,res)=>{   
    db.query('SELECT * FROM persona WHERE rol = "Administrador" OR rol = "Docente"',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get("/horaevento",(req,res)=>{   
    db.query('SELECT * FROM persona WHERE rol = "Administrador" OR rol = "Docente"',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});



app.get("/lista",(req,res)=>{   
    db.query('SELECT L.id, E.nombre AS nombre_evento, CONCAT(P.nombre ," ", P.primer_apellido) AS nombre_persona, L.asistencia FROM listaasistencia L INNER JOIN evento E ON L.evento_id = E.id INNER JOIN  persona P ON L.persona_id = P.id',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});
//lista asictencia para obtener el qr
app.get("/listaqr",(req,res)=>{   
    db.query('SELECT * FROM listaasistencia',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


app.post("/login",(req,res)=>{
    ///passsword encriptado 

    db.query('SELECT * FROM persona WHERE username = ? AND password = ?',[req.body.username,req.body.password],
    (err,result)=>{

        if(err || result.length == 0){
           res.send({
            error:true,
            err:err});
        }
        else{
            res.send({
                error:false,
                result:result[0],
            });
        }
        
    });
});




app.get("/qr",(req,res)=>{   
    db.query('SELECT * FROM qr ',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

async function insertarListaAsistencia(eventoId, personaId) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Insertar en la tabla ListaAsistencia
    const [result] = await connection.query(
      'INSERT INTO ListaAsistencia (evento_id, persona_id) VALUES (?, ?)',
      [eventoId, personaId]
    );

    const listaAsistenciaId = result.insertId;

    // Obtener la fecha de inicio del evento
    const [evento] = await connection.query(
      'SELECT fecha_inicio FROM Evento WHERE id = ?',
      [eventoId]
    );

    const fechaActivacion = evento[0].fecha_inicio;

    // Generar o recuperar la imagen_qr desde React (sustituir esto por tu lógica específica)
    const imagenQrBlob = '';

    // Generar el codeqr concatenando nombre, primer_apellido, username y carrera
    const [persona] = await connection.query(
      //'SELECT nombre, primer_apellido, username, carrera FROM Persona WHERE id = ?',
      'SELECT P.nombre AS nombre, P.primer_apellido AS primer_apellido ,P.username AS username , P.carrera AS carrera, E.nombre AS nombreEvento FROM Persona P INNER JOIN listaasistencia La ON La.persona_id = P.id INNER JOIN evento E ON E.id = La.evento_id WHERE id = ?'
      [personaId]
    );

    //const codeqr = `${persona[0].nombre}${persona[0].primer_apellido}${persona[0].username}${persona[0].carrera}`;
    const codeqr = `${persona[0].nombreEvento}_${persona[0].nombre}_${persona[0].primer_apellido}_${persona[0].username}_${persona[0].carrera}`;

    // Insertar en la tabla QR
    await connection.query(
      'INSERT INTO QR (lista_asistencia_id, fecha_activacion, imagen_qr, codeqr) VALUES (?, ?, ?, ?)',
      [listaAsistenciaId, fechaActivacion, imagenQrBlob, codeqr]
    );

    await connection.commit();

  } catch (error) {
    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
}

module.exports = { insertarListaAsistencia };

app.get("/eventoLista/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id);
    db.query(`SELECT nombre,primer_apellido, carrera FROM listaasistencia INNER JOIN persona on persona.id = listaasistencia.persona_id WHERE asistencia = 1 AND evento_id = ?`,id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});



/////////////////////////////////////////////////////////movil

// Endpoint para autenticar usuario
app.post('/loginm', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT P.id AS id,P.nombre AS nombre ,P.rol AS rol ,P.username AS username, L.codeqr AS codeqr FROM persona P LEFT JOIN listaasistencia L ON L.persona_id = P.id WHERE username = ? AND password = ?';  //unir con asistencia
  //  const query = 'SELECT id,nombre,rol,username,listaasistencia.code.qr FROM persona WHERE username = ? AND password = ? join ';  //unir con asistencia
    db.query(query, [username, password], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
  
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.send({ message: 'Usuario y/o contraseña incorrectos', error: true });
      }
    });
  });
  
  
  app.put('/actualizarasistencia', async (req, res) => {
    const { codeqr } = req.body;
  
    try {
      const hasAttendance = await verificaAsistencia(codeqr);
  
      if (hasAttendance) {
        console.log("Asistencia encontrada:", hasAttendance);
        return res.status(400).json({ error: 'El usuario ya tiene asistencia!!' });
      }
  
      const updateQuery = 'UPDATE listaasistencia SET asistencia = 1 WHERE codeqr = ?';
  
      db.query(updateQuery, [codeqr], (error, results) => {
        if (error) {
          console.error('Error al actualizar la asistencia:', error);
          return res.status(500).json({ error: 'Error al actualizar la asistencia' });
        } else {
          if (results.affectedRows > 0) {
            return res.json({ success: true, message: 'Asistencia actualizada correctamente' });
          } else {
            return res.status(404).json({ error: 'No se encontraron registros para actualizar la asistencia' });
          }
        }
      });
    } catch (error) {
      console.error('Error al verificar la asistencia:', error);
      return res.status(500).json({ error: 'Error al verificar la asistencia' });
    }
  });
  
  const verificaAsistencia = (codeqr) => {
    return new Promise((resolve, reject) => {
      const verificarAsistencia = 'SELECT * FROM listaasistencia WHERE codeqr = ? limit 1';
      
      db.query(verificarAsistencia, [codeqr], (error, results) => {
        if (error) {
          console.error('Error al verificar la asistencia:', error);
          reject(error);
        } else {
          resolve(results.length > 0 && results[0]['asistencia'] == 1);
        }
      });
    });
  };






app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
});