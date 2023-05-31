import React, { useContext, useState } from "react";
import Close from "../../images/icons/close.svg";
import { Link } from "react-router-dom";
import { useLoginState } from "../Context/Context";
import axios from 'axios'
import { UserVet } from "../Context/Type";

interface IProps {
  toggleOpen(): void;
  toggleLogin(): void;
}


export default function Login(props: IProps) {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = React.useState<string | null>();
  let token = 0
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
    //consultar si existe el usuario
    axios.post("https://backpetcheck2.onrender.com/auth/login", user)
    .then(res => {
      console.log(res.status)
      console.log(res)
      //si existe debera cambiar el estado login e inicar sesion
      //si NO existe mostrara un mensaje de error
      if(res.status === 200){
        token = res.data.password
        saveInLocalStorage(res.data)
      }
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
      if(error.response.data === "Usuario no encontrado"){
        setErrorMessage("El Usuario y/o Contrasela son Incorrectos")
      }
    })
  }
  
  const saveInLocalStorage = (dataUser: UserVet) =>{
        login.user = dataUser
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('vet', JSON.stringify(dataUser))
        login.changeState()
        props.toggleLogin()
        props.toggleOpen()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    props.toggleOpen();
    // props.toggleLogin()
  };

  return (
    <div className="relative">
      <form
        className="flex flex-col justify-center items-center py-3"
        onSubmit={handleSubmit}
      >
        <p className=" text-xl pb-2">Iniciar Sesion</p>
        <div className={`relative w-60 object-cover my-2`}>
          <input
            name="email"
            className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md"
            type="email"
            placeholder="Usuario"
            onChange={handleChange}
          />
        </div>
        <div className="relative w-60 object-cover my-2">
          <input
            name="password"
            className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        {errorMessage ? <p className="text-red-500">{errorMessage}</p> : ""}
        <button
          onClick={(event) => {
            event.preventDefault();
            // props.toggleOpen();
            // props.toggleLogin();
            verifyUser();
            
          }}
          className="my-2 w-32 px-4 h-8 border bg-white border-vet-purple text-vet-purple rounded-lg hover:text-white hover:bg-vet-purple hover:border-white text-sm"
        >
          Iniciar Sesion
        </button>
        <Link to="newPass" className="text-vet-purple-dark text-xs my-2">
          {" "}
          ¿Olvidaste tu Contraseña?
        </Link>
        <Link to="register" className="text-vet-purple-dark text-xs my-2">
          {" "}
          ¿No tiene Cuenta?. Registrate Aquí
        </Link>
      </form>
    </div>
  );
}
