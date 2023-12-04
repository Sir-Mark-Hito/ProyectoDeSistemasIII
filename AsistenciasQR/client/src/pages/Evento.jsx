
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { storage } from '../storage/storage';
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from 'sweetalert2'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Evento() {

    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    const userData = storage.get("authData");
    
    const authVerify = () => {

        if (!userData) {
            navigate("/login");
        }
        if(userData.rol!=="Admin" && userData.rol!=="Docente" ){
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

    const [nombre, setNombre] = useState("");
    const [fecIni, setFecIni] = useState(new Date());
    const [fecFin, setFecFin] = useState(new Date());
    const [horIni, setHorIni] = useState("00:00");
    const [horFin, setHorFin] = useState("00:00");
    const [organizador_id, setOranizadorID] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [id, setId] = useState("");
    const [organizador, setOrganizador] = useState("");
    const [orgList, setOrgList] = useState([]);


    const limpiarCamposEvento = () => {
        setNombre("");
        setFecIni(new Date());
        setFecFin(new Date());
        setHorIni("00:00");
        setHorFin("00:00");
        setUbicacion("");
        setUpdateEvento(false);

    };


    const [updateEvento, setUpdateEvento] = useState(false);

    const [eventoList, setEventoList] = useState([]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const formatTime = (timeString) => {
        return timeString.slice(0, 5); // Obtener las primeras 5 caracteres (HH:mm)
    };


    const getInitialData = () => {

        Axios.get("http://localhost:3001/eventos").then((res) => {
            setEventoList(res.data);
        })

        Axios.get("http://localhost:3001/personaAdmin").then((res) => {
            setOrgList(res.data);
        })

    };


    const addEvento = () => {
        Axios.post("http://localhost:3001/createEvento", {
            nombre: nombre,
            fecIni: fecIni,
            fecFin: fecFin,
            horIni: horIni,
            horFin: horFin,
            organizador_id: organizador,
            ubicacion: ubicacion
        }).then(() => {
            getEvento();
            limpiarCamposEvento();
           Swal.fire({
                title: 'Evento <strong>' +nombre+'</strong> Registrado ',
                icon: 'success',

           })
        });
    }

    const upEvento = () => {
        Axios.put("http://localhost:3001/updateEvento", {
          id: id,
          nombre: nombre,
          fecIni: fecIni,
          fecFin: fecFin,
          horIni: horIni,
          horFin: horFin,
          organizador_id: organizador,
          ubicacion: ubicacion
        }).then((res) => {
          getEvento();
          limpiarCamposEvento();
           Swal.fire({
                title: 'Evento  <strong>' +nombre+' </strong> Actualizado ',
                icon: 'success',

           })
        });
      }

      const deleteEvento = (id) => {
        Axios.delete(`http://localhost:3001/deleteEvento/${id}`).then(() => {
          getEvento();
          limpiarCamposEvento();
          
           Swal.fire({
                title: 'Evento  <strong>' +nombre+' </strong> Elimiando ',
                html:"<i>Realmente desea eliminar el registro</i>",
               showCancelButton: true,
                icon: 'warning',
                confirmButtonText: 'Si, Eliminar'

           }).then(res=>{
            if(res.isConfirmed){

                
                Swal.fire({
                     title:'Evento Eliminado Correctamewnte',
                        icon:'success'
                  
                   
                })

            }
           });
        });
      }


    const updateEvent = (val) => {
        setUpdateEvento(true);

        setNombre(val.nombre);
        setFecIni(val.fecha_inicio);
        setFecFin(val.fecha_final);
        setHorIni(val.hora_inicio);
        setHorFin(val.hora_final);
        setId(val.id);
        setUbicacion(val.ubicacion);
        setOranizadorID(val.organizador_id);

    }

    const getPersonAdmin = () => {
        Axios.get("http://localhost:3001/personaAdmin").then((response) => {
            setOrgList(response.data);
        });
    }

    const getEvento = () => {
        Axios.get("http://localhost:3001/evento").then((response) => {
            setEventoList(response.data);
        });
    }

    useEffect(() => {
        getEvento();
        getInitialData();
        getPersonAdmin();
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
            <div className="card text-center">
                <div className="card-header">
                    Gestion de Eventos
                </div>

                <div className="card-body">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Nombre: </span>
                        </div>
                        <input type="text"
                            onChange={(event) => {
                                setNombre(event.target.value);
                            }}
                            class="form-control" value={nombre} placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ubicacion: </span>
                        </div>
                        <input type="text"
                            onChange={(event) => {
                                setUbicacion(event.target.value);
                            }}
                            className="form-control" value={ubicacion} placeholder="Ingrese la Ubicacion" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Fecha de Inicio:</span>
                            </div>

                            <input type="date"
                                onChange={(event) => {
                                    setFecIni(event.target.value);
                                }}

                                className="form-control" value={fecIni} placeholder="Ingrese el fecha" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Fecha Final:</span>
                            </div>
                            <input type="date"
                                onChange={(event) => {
                                    setFecFin(event.target.value);
                                }}
                                class="form-control" value={fecFin} placeholder="Ingrese el fecha" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Hora de Inicio:</span>
                            </div>
                            <input type="time"
                                onChange={(event) => {
                                    setHorIni(event.target.value);
                                }}
                                className="form-control" value={horIni} placeholder="Ingrese el fecha" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Hora Fin:</span>
                            </div>
                            <input type="time"
                                onChange={(event) => {
                                    setHorFin(event.target.value);
                                }}
                                class="form-control" value={horFin} placeholder="Ingrese el fecha" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Organizador:</span>
                            </div>
                            <select id="organizador_id" onChange={(event) => {
                                setOrganizador(event.target.value);
                            }} >
                                <option>Seleccione Organizador</option>
                                {orgList.map(item =>
                                    <option value={item.id} > {item.nombre}{" "}{item.primer_apellido}{" "}{item.segundo_apellido}</option>
                                )}
                            </select>
                        </div>


                    </div>
                    <div class="card-footer text-muted">
                        {
                            updateEvento ?
                                <div>
                                    <button className='btn btn-warning m-2' onClick={upEvento}>Actualizar</button>
                                    <button className='btn btn-info m-2' onClick={limpiarCamposEvento}>Cancelar</button>
                                </div>
                                : <button className='btn btn-success' onClick={addEvento}>Registrar</button>
                        }
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope='col'>Organizador </th>
                            <th scope='col'>Ubicacion</th>
                            <th scope="col">Fecha de Inicio</th>
                            <th scope="col">Fecha Final</th>
                            <th scope="col">Hora de inicio</th>
                            <th scope="col">Hora Final </th>
                            <th scope='col'>Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eventoList.map((val, key) => {
                                return <tr key={key}>
                                    <th scope="row">{val.id}</th>
                                    <td>{val.nombre}</td>
                                    <td>{val.organizador_id }</td>
                                    <td>{val.ubicacion}</td>
                                    <td>{formatDate(val.fecha_inicio)}</td>
                                    <td>{formatDate(val.fecha_final)}</td>
                                    <td>{formatTime(val.hora_inicio)}</td>
                                    <td>{formatTime(val.hora_final)}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label='Basic Example'>
                                            <button type='button'
                                                onClick={() => { updateEvent(val) }}
                                                className='btn btn-info'>Editar</button>
                                            <button type='button' 
                                            onClick={()=>{deleteEvento(val.id)}}
                                             className='btn btn-danger'>Eliminar</button>
                                                <a href={"/lista-evento/"+val.id} className='btn btn-info'>ver asistencia</a>
                                               
                                        </div>
                                    </td>
                                </tr>

                            })
                        }
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}
export default Evento;