import { BrowserRouter, Route } from "react-router-dom"
import RoutesWithtFound from "./RoutesWithFound"
import Login from "../pages/Login";
import Home from "../pages/Home";
import Qr from "../pages/Qr";
import Evento from "../pages/Evento";
import ListaAsistencia from "../pages/ListaAsistencia";
import ReaaderQr from "../pages/ReaaderQr";
import ListaEvento from "../pages/ListaEvento";

const RoutesApp =()=>{
  /*quiero q pongas roles q para la pagina home ,evento y lista asistencia solo ingrese el administrador, para qr solo cliente*/
  

    return(
        <BrowserRouter>
        <RoutesWithtFound>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/qr" element={<Qr/>} />
        <Route path="/evento" element={<Evento/>} />
        <Route path="/listaAsistencia" element={<ListaAsistencia/>} />
        <Route path="/lectorqr" element={<ReaaderQr/>} />
        <Route path="/lista-evento/:id" element={<ListaEvento/>} />
        <Route path="/*" element={<div>No puedes estar aqui</div>} />
        
        </RoutesWithtFound>
      </BrowserRouter>
    )
}

export default RoutesApp;