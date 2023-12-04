import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { storage } from '../storage/storage';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const userData = storage.get("authData");

 
  const authVerify=()=>{    
    
    if(!userData){
      navigate("/login");
    }
    
    if(userData.rol!=="Admin" && userData.rol!=="Docente" ){
      logOut()
    }
    

  }
  const logOut=()=>{
    storage.remove("authData");
    navigate("/login");
  }
  useEffect(()=>{
    authVerify()
  },[])
  
    return (
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
    ); 
  }
  
export default Home;
