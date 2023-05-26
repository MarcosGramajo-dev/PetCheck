import React, {useState, useContext, createContext, ReactNode} from 'react'
import axios from 'axios';
import Login from '../Modal/login';
import { loginContext } from './Type';


interface Props {
    children: ReactNode
}

export const LoginContext = createContext<loginContext | null>(null);

export function useLoginState(){
    return useContext(LoginContext);
}

export default function LoginContextProvider({children}:Props){    

    const [login, setLogin] = useState(false)

    const changeState = () =>{
        setLogin(!login);
        console.log(login);
    }

    return(
        <LoginContext.Provider value={{changeState, login}}>
                {children}
        </LoginContext.Provider>
    )
}