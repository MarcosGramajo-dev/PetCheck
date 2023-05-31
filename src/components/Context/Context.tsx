import React, {useState, useContext, createContext, ReactNode} from 'react'
import axios from 'axios';
import Login from '../Modal/login';
import { loginContext, UserVet } from './Type';



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

    const changeState = () =>{
        setLogin(!login);
        setisOpen(!isOpen);
        console.log(login);
        console.log(user);
    }

    return(
        <LoginContext.Provider value={{changeState, login, user}}>
                {children}
        </LoginContext.Provider>
    )
}