import React, { useState } from "react"


export default function NewPass (){
    const [email, setEmail] = useState("")
    const [userEmail, setUserEmail] = useState({})

    function handleChange (e: React.ChangeEvent<HTMLInputElement>){
            setEmail(e.target.value)
            setUserEmail({...userEmail, "email": email})
    }
    return (
        <div className="w-full h-full flex justify-center items-center ">
            <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                <p>Ingresa tu correo electronico y ahi te enviaremos el enlace para restaurar tu contrasela</p>
                <input onChange={handleChange} name="email" type="email"/>
                <button> Enviar </button>
            </div>
        </div>
    )
}