const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'salas',
  database: 'asistencidbrev',
});

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


app.put('/actualizarasistencia', (req, res) => {
  const { codeqr } = req.body;
  console.log('codeqr bk:', codeqr);
  const updateQuery = 'UPDATE listaasistencia SET asistencia = 1 WHERE codeqr = ?';

  db.query(updateQuery, [codeqr], (error, results) => {
    if (error) {
      console.error('Error al actualizar la asistencia:', error);
      res.status(500).json({ error: 'Error al actualizar la asistencia' });
    } else {
      if (results.affectedRows > 0) {
        res.json({ success: true, message: 'Asistencia actualizada correctamente' });
      } else {
        res.status(404).json({ error: 'No se encontraron registros para actualizar la asistencia' });
      }
    }
  });
});








app.listen(3001, () => {
  console.log('Server running on port 3001');
});