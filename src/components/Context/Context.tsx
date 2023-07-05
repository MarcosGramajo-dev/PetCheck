import React, {useState, useContext, createContext, ReactNode, Dispatch} from 'react'
import axios from 'axios';
import Login from '../Modal/login';
import { History, loginContext, UserVet } from './Type';



interface Props {
    children: ReactNode
}



export const LoginContext = createContext<loginContext | null>(null);

export function useLoginState(){
    return useContext(LoginContext);
}

export default function LoginContextProvider({children}:Props){    

    const [login, setLogin] = useState(false)
    const [isOpen, setisOpen] = useState(false)

    const [isLogin, setIsLogin] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const [HC, setHC] = useState<History>({
        Vacunas: [{
            Certification: 0,
            DataVacuna: "",
            Vacuna: "",
            fecha: "",
            nameAndMatricule: ""
          }],
          Registros: [{
            Info: "",
            Registro: "",
            fecha: ""
          }],
          DataPet: {
              image: "",
              NombreMascota: "",
              Especie: "",
              Sexo: "",
              Nchip: 0,
              Pedigree: 0,
              Date: "",
              detalles: ""
          },
          ownerPet: {
              NombreDueño: "",
              DNI: 0,
              Telefono: 0,
              Direccion: "",
              province: "",
              departament: ""
          },
          id: 0        
    })

    const URL = "https://backpetcheck2.onrender.com/"
    // const URL = "http://localhost:3000"

    const [token, setToken] = useState("")
    let user =
        {
            email: "",
            password: "",
            vet: {
                image: "",
                nameLocal: "" ,
                ownerVet: "",
                service: [{value: "", isChecked: false}],
                numMatricula: 0,
                province: "",
                departament: "",
                address: "",
                tel: 0,
                telWp: 0,
                web: "",
                instagram: "",
                facebook: "",
                tiktok: ""
            }
        }

    function toggleOpen() {
        setShowModal(!showModal);
        }
    
    function toggleLogin(bool:boolean){
        setIsLogin(bool);
        console.log(isLogin)
    }
          

    const changeState = () =>{
        setLogin(!login);
        setisOpen(!isOpen);
        console.log(login);
        console.log(user);
    }

    const addToken = (newToken: string) => {
        setToken(newToken)
    }

    const addHC = (history: History) => {
        setHC(history);
    }

    

    const saveInLocalStorage = (dataUser: UserVet) =>{
        localStorage.setItem('token', JSON.stringify(dataUser.password));
        localStorage.setItem('vet', JSON.stringify(dataUser))
  }

    const authContext = {
        changeState,
        login,
        user,
        saveInLocalStorage,
        token,
        URL,
        addToken,
        toggleLogin,
        toggleOpen,
        isOpen,
        showModal,
        isLogin,
        addHC,
        HC
    }

    return(
        <LoginContext.Provider value={{changeState, login, user, authContext}}>
                {children}
        </LoginContext.Provider>
    )
}