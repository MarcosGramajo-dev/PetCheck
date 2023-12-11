import React, { useContext, useState } from "react";
import Close from "../../images/icons/close.svg";
import { Link } from "react-router-dom";
import { useLoginState } from "../Context/Context";
import axios from 'axios'
import { UserVet } from "../Context/Type";

import {
  Typography,
  Input,
  Button
} from "@material-tailwind/react"


export default function Login() {
  const [user, setUser] = useState({email: "", password: ""});
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [stateBtnSubmit, setStateBtnSubmit] = useState(false)
  const [isWacht, setIsWatch] = useState(false)
  // let token = 0
  const login = useLoginState()

  if(!login){
    return null
  }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name === "password") {
      if (event.target.value.length < 6 && event.target.value.length >= 1) {
        setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      } else {
        setErrorMessage("");
      }
    }
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const verifyUser = () =>{
    setStateBtnSubmit(true)
    //consultar si existe el usuario
    // console.log(user)
    if(user.email == '' || user.password == '' || user.email == ' ' || user.password == ' '){
      setErrorMessage("Correo electrónico o contraseña incorrecta");
    } else {
      axios.post(`${login?.authContext.URL}/auth/login`, user)
      .then(res => {
        //si existe debera cambiar el estado login e inicar sesion
        //si NO existe mostrara un mensaje de error
        if(res.status === 200){
          setSuccessMessage('Usuario Confirmado')
          login.authContext.toggleOpen()
          login.authContext.addToken(res.data.password)
          login.authContext.saveInLocalStorage(res.data)
          login.authContext.toggleLogin(true)
          setStateBtnSubmit(true)
        }
      })
      .catch(error => {
        setErrorMessage(error.response.data)
        setStateBtnSubmit(false)
      })
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    // props.toggleOpen();
    // props.toggleLogin()
  };

  return (
    <div className="relative w-8/12 m-auto">
      <form
        className={`flex flex-col justify-center items-center py-3 ${isWacht ? 'hidden' : ''}`}
        onSubmit={handleSubmit}
      >
        <p className=" text-xl pb-2"></p>
        <div className="bg-vet-purple  rounded-md py-5 w-full absolute top-[-60px]">
            <Typography className="text-center text-white" variant="h4" >
              Iniciar Sesion
            </Typography>
        </div>
        <div className="mb-1 flex flex-col gap-4">
          {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
            Correo Electronico:
          </Typography> */}
          {/* <Input
            id="emailLogin"
            name="email"
            type="email"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-0"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleChange}
          /> */}
          <div className="w-72  my-2">
            <Input label="Correo Electronico"
            onChange={handleChange}
            id="emailLogin"
            name="email"
            type="email"
            required
            />
          </div>
        </div>
        {/* <div className="relative w-60 object-cover my-2"> */}
        <div className="w-72 my-2">
          {/* <label htmlFor="pass">Contraseña:</label>
          <input
            id="pass"
            name="password"
            className="border-vet-blue border rounded-md w-full px-2 drop-shadow"
            type="password"
            onChange={handleChange}
          /> */}
          <Input label="Contraseña"
            onChange={handleChange}
            id="pass"
            name="password"
            type="password"    
            required        
            />
        </div>
        {/* <Link to="newPass" className="text-vet-purple-dark text-xs my-2 text-right m-auto mt-0 mb-3 w-6/12">
          {" "}
          ¿Olvidaste tu Contraseña?
        </Link> */}
        <Button variant="text" className="text-vet-purple" onClick={() => setIsWatch(!isWacht)}>
          ¿Olvidaste tu Contraseña?
        </Button>
        <div className="h-6">
          {errorMessage ? <p id="MError" className="text-red-500">{errorMessage}</p> : ""}
          {successMessage ? <p id="MSuccess" className="text-green-500">{successMessage}</p> : ""}
        </div>
        <Button 
          id="submitLogin"
          disabled={stateBtnSubmit}
          onClick={(event) => {
            event.preventDefault();
            // props.toggleOpen();
            // props.toggleLogin();
            verifyUser();
            
          }}
          className="bg-vet-purple"
        >
          Iniciar Sesion
        </Button>
        
        <Link to="register" className="text-vet-purple-dark text-xs my-2" onClick={() => {
              login?.authContext.toggleOpen(), login?.changeState();
            }}>
          {" "}
          ¿No tiene Cuenta?. Registrate Aquí
        </Link>
      </form>
      { isWacht && <form action="">
        <div className="bg-vet-purple  rounded-md py-5 w-full absolute top-[-90px]">
            <Typography className="text-center text-white" variant="h4" >
              Recuperar Contraseña.
            </Typography>
        </div>
        <div className="gap-3 mt-10">
            <p className="mb-2">Ingresa tu correo electronico ahi </p>
            <p className="mb-2">Te enviaremos el enlace para restaurar tu contraseña</p>
            
            <Input 
              onChange={handleChange} 
              name="email" 
              type="email"
              label="Correo Electronico"
              />
            <div className="my-4 flex justify-end gap-3">
              <Button variant="text" onClick={() => setIsWatch(!isWacht)}> Volver </Button>
              <Button className="bg-vet-purple"> Restaurar Contraseña </Button>
            </div>
        </div>
      </form>}
    </div>
  );
}
