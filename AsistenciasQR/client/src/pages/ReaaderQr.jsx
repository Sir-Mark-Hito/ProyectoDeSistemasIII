import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from '../storage/storage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Axios from "axios";

function ReaderQr() {
  const [url, setUrl] = useState('');
  const [qrcode, setQrcode] = useState('');


  const navigate = useNavigate();
  const userData = storage.get("authData");

  const authVerify = () => {

    if (!userData) {
      navigate("/login");
    }
    if (userData.rol !== "Secretaria") {     
      logOut()
    }
  }
  const logOut = () => {
    storage.remove("authData");
    navigate("/login");
  }
  useEffect(() => {
    authVerify()
  }, [])

  useEffect(() => {
    getInitialData();
    getQr();
   
}, [])



  const [state, setState] = useState({
    delay: 100,
    result: 'No result',
  });
  const handleScan = (data) => {
    if (data) {

      const codeExists = qrList.some((qr) => qr.codeqr === data.text);

      if (codeExists) {
       
        Axios.put("http://localhost:3001/updateListaQr", { codeqr: data.text })
          .then((response) => {
            console.log(response);
            if (response.data.message) {
              console.log("Asistencia registrada correctamente.");
            } else {
              console.log("Error en la asistencia.");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Error en la asistencia.");
      }

      ///verificar en base de datos si existe el codigo el cual seria de la tabla qr su fila codeqr con el get q tenemos y el data 
      ////en el bk si el codigo existe cambiar el estado a true (asistencia) es un put llamado updateListaQr
      ///en el bk si el codigo no existe devolver errro
      ///en el fron  si devuelve error mostrar mensaje de error`
      ///si es correcto mostrar en pantalla un mensaje de correcto


      setState({
        result: data.text,
      })
    }
  }
  function handleError(err) {
    console.error(err)
  }


  const [qrList, setQrList] = useState([]);

  const getInitialData = () => {

      Axios.get("http://localhost:3001/qr").then((res) => {
          setQrList(res.data);
      })
  };

  const getQr = () => {
      Axios.get("http://localhost:3001/qr").then((response) => {
          setQrList(response.data);
      });
  }

  return (


    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">AsistenciaQR {userData?.username}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <button onClick={() => logOut()}>Logout</button>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      {state.result === 'No result' ? <QrReader
        delay={state.delay}
        onError={handleError}
        onScan={handleScan}
      /> :
        <div>{state.result}</div>}
      {/*  <p>{state.result}</p> */}
    </div>
  )

}


export default ReaderQr;