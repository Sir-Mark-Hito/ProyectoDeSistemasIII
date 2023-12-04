import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../storage/storage';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Axios from "axios";
import ListaAsistencia from './ListaAsistencia';



function Qr() {

    const [url, setUrl] = useState('');
    

    const navigate = useNavigate();
    const userData = storage.get("authData");


    const [id, setId] = useState("");
    const [persona_id, setPersona_id] = useState("");
    const [evento_id, setEvento_id] = useState("");
    const [asistencia, setAsistencia] = useState("");
    const [qrcode, setQrcode] = useState('');

    const [listaList, seListaList] = useState([]);

    

    const authVerify = () => {

        if (!userData) {
            navigate("/login");
        }
        if (userData.rol !== "Cliente" && userData.rol !== "Docente") {
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
            
        if (userData) {
            ///llamar a la tabla de qr
            ///la informacion que devuelvelo metes a un estado y de ese estado dibujas el qr
           //const codeqrData = userData.codeqr;
          // setQrcode(codeqrData);
          Axios.get("http://localhost:3001/listaqr").then((response) => {
            seListaList(response.data);

          
            const codeQrGenerado = response.data.length > 0 ? response.data[0].codeqr : '';

            setQrcode(codeQrGenerado);
        });
        }
    }, [])

    const getInitialData = () => {

        Axios.get(`http://localhost:3001/listaqr`).then((res) => {
            setQrcode(res.data);
        })
        
    }
    useEffect(() => {
        getInitialData();
        getLista();
       

    }, []);

   
    const getLista = () => {
        Axios.get("http://localhost:3001/listaqr").then((response) => {
            seListaList(response.data);
        });
    }
    

   

    return (


        <div >
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
            <div class="d-flex justify-content-center ">
                <Card style={{
                    width: 'auto',
                    margin: 'auto',
                    marginTop: '150px',
                    textAlign: 'center'
                }}>

                    {
                        qrcode !== "" ? <QRCodeSVG value={qrcode} /> :
                            <div>No tiene un qr cargado</div>

                    }

                </Card>

            </div>

          
        </div>
    );
}
export default Qr;