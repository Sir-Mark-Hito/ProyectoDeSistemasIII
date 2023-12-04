import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Axios from 'axios';
import { storage } from "../storage/storage";
import { useNavigate } from "react-router-dom";

function Login() {
    const [isLogin,setIsLogin]=useState(false)
    const [data,setData]=useState([])
    const [dataForm,setDAtaForm]=useState({
        username:"",
        password:""        
    })

    const navigate = useNavigate();

    const loguear=()=>{
        ///usuario y la contraseña
        Axios.post("http://localhost:3001/login", {
              username: dataForm.username,
              password: dataForm.password
            }).then((res) => {
                console.log(res.data)
              if(!res.data.error){
                 setData(res.data.result)
                 storage.set("authData",res.data.result)
                 /////redireccionar a tu home
                 switch (res.data.result.rol) {
                  case "Admin":                    
                    navigate("/home");
                    break;
                  case "Cliente":
                    navigate("/qr");
                    break;
                  case "Docente":
                    navigate("/home");
                    break;
                  case "Secretaria":
                    navigate("/lectorqr");
                    break;
                 
                  default:
                    break;
                 }
               
              }else{
                alert("Los datos ingresados son incorrectos");
              }
            });
    }
    console.log(dataForm)
    const handleChange=(e)=>{
        setDAtaForm({
            ...dataForm,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div>
            
  
  <div className="form-outline mb-4">
    <label className="form-label" for="form2Example1" >Email address</label>
    <input type="email" id="form2Example1" class="form-control"  name="username" onChange={handleChange}  value={dataForm.username} />
  </div>

  
  <div className="form-outline mb-4">
    <label className="form-label" for="form2Example2"  >Password</label>
    <input type="password" id="form2Example2" class="form-control" name="password" onChange={handleChange} value={dataForm.password} />
  </div>


    

  
  <button type="button" className="btn btn-primary btn-block mb-4" onClick={loguear}>Sign in</button>




        </div>
    )
}

export default Login;