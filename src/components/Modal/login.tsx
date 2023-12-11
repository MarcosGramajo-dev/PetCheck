import React, { useContext, useState } from "react";
import Close from "../../images/icons/close.svg";
import { Link } from "react-router-dom";
import { useLoginState } from "../Context/Context";
import axios from 'axios'
import { UserVet } from "../Context/Type";


export default function Login() {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [stateBtnSubmit, setStateBtnSubmit] = useState(false)
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
    axios.post(`${login?.authContext.URL}/auth/login`, user)
    .then(res => {
      // console.log(res.status)
      // console.log(res)
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
      // console.log(error)
      // console.log(error.response.data)
      setErrorMessage(error.response.data)
      setStateBtnSubmit(false)
    })
  }
  
  // const saveInLocalStorage = (dataUser: UserVet) =>{
  //       login.user = dataUser
  //       localStorage.setItem('token', JSON.stringify(token));
  //       localStorage.setItem('vet', JSON.stringify(dataUser))
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    // props.toggleOpen();
    // props.toggleLogin()
  };

  return (
    <div className="relative w-8/12 m-auto">
      <form
        className="flex flex-col justify-center items-center py-3"
        onSubmit={handleSubmit}
      >
        <p className=" text-xl pb-2">Iniciar Sesion</p>
        <div className={`relative w-60 object-cover my-2`}>
          <label htmlFor="emailLogin">Correo Electronico:</label>
          <input
            id="emailLogin"
            name="email"
            className=" border-vet-blue border rounded-md w-full px-2 drop-shadow"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div className="relative w-60 object-cover my-2">
          <label htmlFor="pass">Contraseña:</label>
          <input
            id="pass"
            name="password"
            className="border-vet-blue border rounded-md w-full px-2 drop-shadow"
            type="password"
            onChange={handleChange}
          />
        </div>
        <Link to="newPass" className="text-vet-purple-dark text-xs my-2 text-right m-auto mt-0 mb-3 w-6/12">
          {" "}
          ¿Olvidaste tu Contraseña?
        </Link>
        <div className="h-6">
          {errorMessage ? <p id="MError" className="text-red-500">{errorMessage}</p> : ""}
          {successMessage ? <p id="MSuccess" className="text-green-500">{successMessage}</p> : ""}
        </div>
        <button 
          id="submitLogin"
          disabled={stateBtnSubmit}
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
        
        <Link to="register" className="text-vet-purple-dark text-xs my-2">
          {" "}
          ¿No tiene Cuenta?. Registrate Aquí
        </Link>
      </form>
    </div>
  );
}
