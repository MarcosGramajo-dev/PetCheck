import React, { useContext, useState } from 'react';
import Close from '../../images/icons/close.svg'
import { Link } from 'react-router-dom'

interface IProps {
  toggleOpen(): void;
  toggleLogin(): void;
}

export default function Login(props: IProps) {
  
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false);
  const[password, setPassword]= useState("");
  const [errorMessage, setErrorMessage]= React.useState<string | null>();
  console.log(password)

  function validateEmail(email: string) {
    // Expresión regular para correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  const handleEmailChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  }
  
  
  const handlePasswordChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value);
    if(password.length<6){
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      // return;
    }else{
      setErrorMessage("")
    }
  }


  const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setErrorMessage("");
  
    
    props.toggleOpen();
    props.toggleLogin()
  }
  return (
    <div className="relative">
      <form className="flex flex-col justify-center items-center py-3" onSubmit={handleSubmit}>
        <p className=" text-xl pb-2">Iniciar Sesion</p>
        <div className={`relative w-60 object-cover my-2 ${!isEmailValid ? "border-red-500" : ""}`}>
          <input className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md" type="text" placeholder='Usuario'  onChange={handleEmailChange} />
        </div>
        <div className="relative w-60 object-cover my-2">
          <input className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md" type="password" placeholder='Password'  onChange={handlePasswordChange}/>
        </div>
        {errorMessage ? <p className='text-red-500'>{errorMessage}</p>:"" }
        <button onClick={(event)=> {event.preventDefault(); props.toggleOpen(); props.toggleLogin()}} className="my-2 w-32 px-4 h-8 border bg-white border-vet-purple text-vet-purple rounded-lg hover:text-white hover:bg-vet-purple hover:border-white text-sm">Iniciar Sesion</button>
        <Link to="register" className="text-vet-purple-dark text-xs my-2"> ¿No tiene Cuenta?. Registrate Aquí</Link>
      </form >
    </div>
  )
}