import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { storage } from '../storage/storage';
import { useEffect } from "react";

import Axios from 'axios';
import Swal from 'sweetalert2'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





function ListaAsistencia() {

    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    const userData = storage.get("authData");
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




    const [id, setId] = useState("");
    const [persona_id, setPersona_id] = useState("");
    const [evento_id, setEvento_id] = useState("");
    const [asistencia, setAsistencia] = useState("");
    const [idLista, setIdLista] = useState("");

    const [eventoList, setEventoList] = useState([]);
    const [personaList, setPersonaList] = useState([]);
    const [listaList, seListaList] = useState([]);

    const [updateLista, setUpdateLista] = useState(false);




    const getInitialData = () => {

        Axios.get(`http://localhost:3001/personas`).then((res) => {
            setPersonaList(res.data);
        })
        Axios.get("http://localhost:3001/eventos").then((res) => {
            setEventoList(res.data);

        })

    }
    useEffect(() => {
        getInitialData();
        getLista();
        getEvento();
        getPersona();

    }, []);

    const getPersona = () => {
        Axios.get("http://localhost:3001/persona").then((response) => {
            setPersonaList(response.data);

        });
    }

    const getEvento = () => {
        Axios.get("http://localhost:3001/evento").then((response) => {
            setEventoList(response.data);

        });
    }

    const getLista = () => {
        Axios.get("http://localhost:3001/lista").then((response) => {
            seListaList(response.data);

        });
    }

    const addLista = () => {

        Axios.post("http://localhost:3001/createLista", {
            nombre: persona_id,
            evento: evento_id
        }).then(() => {
            getLista();
            limpiarCamposListas();
            Swal.fire({
                title: ' Asistencia registrada correctamente ',
                icon: 'success',

            })
        });
    };
    const upLista = () => {

        Axios.put("http://localhost:3001/updateLista", {
            id: id,
            nombre: persona_id,
            evento: evento_id
        }).then(() => {
            getLista();
            limpiarCamposListas();
            Swal.fire({
                title: ' Asistencia actualizada correctamente ',
                icon: 'success',

            })
        });
    }

    const deleteEvento = (id) => {
        Axios.delete(`http://localhost:3001/deleteLista/${id}`).then(() => {
            getLista();
            limpiarCamposListas();
            Swal.fire({
                title: 'Eliminado de la lista correctamente ',
                html: "<i>Realmente desea eliminar el registro</i>",
                showCancelButton: true,
                icon: 'warning',
                confirmButtonText: 'SI, Eliminar',

            }).then(res => {
                if (res.isConfirmed) {
                    Swal.fire({
                        title: 'Eliminado de la lista correctamente ',
                        icon: 'success',

                    })

                }
            });
        });
    }

    const updateList = (val) => {
        setUpdateLista(true);

        setIdLista(val.id);
        setEvento_id(val.evento_id);
        setPersona_id(val.persona_id);

    }

    const limpiarCamposListas = () => {
        setUpdateLista(false);
    };

    
    //const { insertarListaAsistencia } = require('./database');

    //insertarListaAsistencia(setEvento_id, setPersona_id)
     //   .then(() => {
        //    console.log('Inserción exitosa en ListaAsistencia y QR');
      //  })
      //  .catch((error) => {
        //    console.error('Error al insertar en ListaAsistencia y QR:', error);
       // });


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
            <div class="card text-center">
                <div class="card-header">
                    Gestion de Lista
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Evento:</span>
                        </div>
                        <select id="evento_id"
                            onChange={(event) => {
                                console.log('evento', event.target.value); setEvento_id(event.target.value);
                            }} >
                            <option>Seleccione evento</option>
                            {eventoList.map(item =>
                                <option value={item.id}>{item.nombre}</option>
                            )}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Persona:</span>
                        </div>
                        <select id="persona_id"
                            onChange={(event) => {
                                console.log('persona', event.target.value); setPersona_id(event.target.value);
                            }} >
                            <option>Seleccione Persona</option>
                            {personaList.map(item =>
                                <option value={item.id} > {item.nombre}{" "}{item.primer_apellido}{" "}{item.segundo_apellido}</option>
                            )}
                        </select>
                    </div>

                </div>
                <div class="card-footer text-muted">
                    {
                        updateLista ? <div>
                            <button className='btn btn-warning m-2' onClick={upLista}>Actualizar</button>
                            <button className='btn btn-info m-2' onClick={limpiarCamposListas}>Cancelar</button>
                        </div>
                            : <button className='btn btn-success' onClick={addLista}>Registrar</button>
                    }

                </div>
            </div>
            <Table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre del evento</th>
                        <th scope="col">Nombre de la Persona</th>
                        <th scope="col">asistencia</th>
                        <th scope='col'>Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaList.map((val, key) => {
                            return <tr key={key}>
                                <th scope="row">{val.id}</th>
                                <td>{val.nombre_evento}</td>
                                <td>{val.nombre_persona}</td>
                                <td>{val.asistencia}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label='Basic Example'>
                                        <button type='button'
                                            onClick={() => {
                                                updateList(val)
                                            }}
                                            className='btn btn-info'>Editar</button>
                                        <button type='button'
                                            onClick={() => { deleteEvento(val.id) }}
                                            className='btn btn-danger'>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Container >
    );
}
export default ListaAsistencia;