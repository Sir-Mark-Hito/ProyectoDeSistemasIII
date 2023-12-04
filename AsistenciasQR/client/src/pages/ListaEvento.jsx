import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '../storage/storage';
import { useEffect } from "react";

import Axios from 'axios';
import Swal from 'sweetalert2'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





function ListaEvento() {

    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    const userData = storage.get("authData");
 

    const {id}  = useParams();

    const authVerify = () => {

        if (!userData) {
            navigate("/login");
        }
        if (userData.rol !== "Admin" && userData.rol !== "Docente") {
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




   
    const [eventoLista, setEventoLista] =  useState([]);




    const getInitialData = () => {

        Axios.get(`http://localhost:3001/eventoLista/${id}`).then((res) => {
            console.log(res.data);
            setEventoLista(res.data);
        })
       

    }
    const getEventoLista = () => {
        Axios.get(`http://localhost:3001/eventoLista/?id=${id}`).then((response) => {
            setEventoLista(response.data);

        });
    }

    useEffect(() => {
        getInitialData();

    }, []);
    
    return (
        <Container>
              <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">AsistenciaQR {userData?.username}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Evento">Evento</Nav.Link>
              <Nav.Link href="/listaAsistencia">Lista de Participantes</Nav.Link>                       
              <button  onClick={()=>logOut()}>Logout</button>
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
           
            <Table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre </th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Carrera</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        eventoLista.map((val, key) => {
                            return <tr key={key}>
                                <th scope="row">{key+1}</th>
                                <td>{val.nombre}</td>
                                <td>{val.primer_apellido}</td>
                                <td>{val.carrera}</td>
                               
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Container >
    );
}
export default ListaEvento;