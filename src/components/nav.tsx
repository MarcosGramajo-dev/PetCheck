import React, { useEffect, useState } from "react";
import iconName from "../images/nameIcon.svg";
import iconNameBlank from "../images/nameIcon_blank.svg";
import iconBook from "../images/bookIcon.svg";
import iconBookBlank from "../images/bookIcon_blank.svg";
import imgCat from "../images/backgroun-cat.png";
import banner from "../images/bannerNav.png";

import {
  Button
} from "@material-tailwind/react"

import { Link } from "react-router-dom";

import Modal from "./Modal/modal";
import { useLoginState } from "./Context/Context";

import { UserVet } from "./Context/Type";
import axios from "axios";

export default function Nav() {
  const [toggleMenu, setToggleMenu] = useState("burguerMenu md:hidden");
  const [lowerMenu, setLowerMenu] = useState("md:hidden h-0 overflow-hidden");
  const [state, setState] = useState(false);

  const login = useLoginState();
  let tokenLocal;

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    tokenLocal = localStorage.getItem("token");
    // console.log(tokenLocal)

    axios
      .get(`${login?.authContext.URL}/auth/perfil`, { params: { tokenLocal } })
      .then((res) => {
        if (res.data === "Success") {
          login?.authContext.toggleLogin(true);
        }
      })
      .catch((error) => console.log(error));
  };

  // function toggleOpen() {
  //   setShowModal(!showModal)
  // }

  // function toggleLogin(){
  //     setIsLogin(!isLogin);
  //     console.log(isLogin)
  // }

  function changeState() {
    setState(!state);
    if (state) {
      setToggleMenu("burguerMenu md:hidden");
      setLowerMenu("desployMenu md:hidden");
    } else {
      setToggleMenu("crossMenu md:hidden");
      setLowerMenu("desployedMenu md:hidden");
    }
  }

  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = React.useState<string | null>();
  let token = 0;

  if (!login) {
    return null;
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

  const verifyUser = () => {
    //consultar si existe el usuario
    axios
      .post(`${login?.authContext.URL}auth/login`, user)
      .then((res) => {
        console.log(res.status);
        console.log(res);
        //si existe debera cambiar el estado login e inicar sesion
        //si NO existe mostrara un mensaje de error
        if (res.status === 200) {
          token = res.data.password;
          changeState();
          saveInLocalStorage(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        if (error.response.data === "Usuario no encontrado") {
          setErrorMessage("El Usuario y/o Contrasela son Incorrectos");
        }
      });
  };

  const saveInLocalStorage = (dataUser: UserVet) => {
    login.user = dataUser;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("vet", JSON.stringify(dataUser));
    login.changeState();
    login.authContext.toggleLogin(true);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setErrorMessage("");

  //   toggleOpen();
  //   // props.toggleLogin()
  // };

  function menuMobile(sesion: boolean) {
    if (sesion) {
      return (
        <div className='border-t-2 border-vet-purple-light w-11/12 m-auto flex flex-col justify-between h-full'>
          <div className='w-full pt-20'>
            <Link to='nuevaHistoria'>
              <button
                onClick={() => changeState()}
                className='my-1 h-12 w-full m-auto border-2 border-vet-purple-dark text-vet-purple-dark bg-white hover:bg-vet-purple-dark hover:border-white hover:text-white'>
                
                Nueva Historia Clinica
              </button>
            </Link>
            <Link to='gestion'>
              <button
                onClick={() => changeState()}
                className='my-1 h-12 w-full m-auto border-2 border-vet-purple-dark text-vet-purple-dark bg-white hover:bg-vet-purple-dark hover:border-white hover:text-white'>
                
                Gestion
              </button>
            </Link>
            <Link to='perfil'>
              <button
                onClick={() => changeState()}
                className='my-1 h-12 w-full m-auto border-2 border-vet-purple-dark text-vet-purple-dark bg-white hover:bg-vet-purple-dark hover:border-white hover:text-white'>
                
                Perfil
              </button>
            </Link>
          </div>
          <div>
            <Link to='/'>
              <button
                onClick={() => {
                  login?.authContext.toggleLogin(false), localStorage.clear();
                }}
                className='my-3 h-12 w-full m-auto mb-16 text-white bg-vet-red hover:bg-white hover:text-vet-red'>
                
                Salir
              </button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <form className='flex flex-col justify-center items-center py-3 mt-16'>
          {/* <button className='text-white text-xl pb-2'>Iniciar Sesion</button> */}
          <Button variant="outlined">Iniciar Sesion</Button>
          <div className='relative w-60 object-cover my-2'>
            <input
              className='w-60 rounded-lg px-2'
              name='email'
              onChange={handleChange}
              type='email'
              placeholder='Correo Electronico'
            />
          </div>
          <div className='relative w-60 object-cover my-2'>
            <input
              className='w-60 rounded-lg px-2'
              name='password'
              onChange={handleChange}
              type='password'
              placeholder='Password'
            />
          </div>
          {errorMessage ? <p className='text-red-500'>{errorMessage}</p> : ""}
          <button
            onClick={(e) => {
              e.preventDefault(), verifyUser();
            }}
            className='mx-1 w-32 px-4 h-8 border bg-white border-vet-purple-dark text-vet-purple-dark rounded-lg hover:text-white hover:bg-vet-purple-dark hover:border-white text-sm'>
            Iniciar Sesion
          </button>
          <Link
            onClick={() => changeState()}
            to='register'
            className='text-white text-xs my-2'>
            ¿No tiene Cuenta?. Registrate Aquí
          </Link>
        </form>
      );
    }
  }

  function btnDesktop(sesion: boolean) {
    if (sesion) {
      return (
        <div className='flex m-5 items-center z-10 gap-3'>
          <div>
            <Link to='nuevaHistoria'>
              
              <Button 
                // className=' min-w-[150px] mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple hidden md:block'
                variant="outlined"
                size="sm"
                className="border border-vet-blue text-vet-blue hidden md:block min-w-[190px]"
              >
                Nueva Historia Clinica
              </Button>
            </Link>
          </div>
          <div>
            <Link to='gestion'>
              
              <Button 
              // className='mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple hidden md:block'
                variant="outlined"
                size="sm"
                className="border border-vet-blue text-vet-blue hidden md:block"
              >
                Gestion
              </Button>
            </Link>
          </div>
          <div>
            <Link to='perfil'>
              
              <Button 
              // className='mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple hidden md:block'
                variant="outlined"
                size="sm"
                className="border border-vet-blue text-vet-blue hidden md:block"
              >
                Perfil
              </Button>
            </Link>
          </div>
          <div>
            <Link to='/'>
              
              <Button
                size="sm"
                onClick={() => {
                  login?.authContext.toggleLogin(false), localStorage.clear();
                }}
                // className=' mx-1 duration-300 text-xs px-4 h-6 border border-vet-red text-white bg-vet-red rounded-lg hover:text-vet-red hover:bg-neutral-50 hidden md:block'
                  className="bg-vet-red hidden md:block"
                >
                Salir
              </Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className='flex m-5 items-center z-10 gap-3'>
          {/* <button
            className='min-w-[145px] mx-1 duration-300 px-4 h-[35px] border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple hidden md:block'
            onClick={() => {
              login?.authContext.toggleOpen(), login?.changeState();
            }}>
            
            Iniciar Sesion
          </button> */}
          <Button
            variant="outlined"
            size="sm"
            onClick={() => {
              login?.authContext.toggleOpen(), login?.changeState();
            }}

            className="hidden md:block min-w-[140px]"
          >
              Iniciar Sesion
            </Button>
          <Link to='register'>
            <Button
              className="bg-vet-blue hover:bg-vet-blue/50 hidden md:block min-w-[145px]"
              size="sm"
            >
              Registrate Aquí
            </Button>
            {/* <button className='min-w-[145px] mx-1 duration-300 px-4 h-[35px] border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50 hidden md:block'>
              
              Registrate Aquí
            </button> */}
          </Link>
        </div>
      );
    }
  }

  return (
    <div>
      <img
        src={banner}
        alt='banner nav'
        className='fixed imgPosition hidden md:block'
      />
      <div className='flex w-full z-50 my-0 justify-between items-center m-auto bg-vet-purple-dark fixed md:bg-transparent max-w-[1400px]'>
        <div className={toggleMenu} onClick={() => changeState()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className=' mx-5 z-10 flex'>
          <Link to='/' className='flex justify-center items-center'>
            <img src={iconBook} className='w-20 mx-3 hidden md:block pt-3' />
            <img src={iconName} className='w-36 hidden md:block pt-3' />
          </Link>

          <Link
            onClick={() => (state ? changeState() : "")}
            to='/'
            className='flex justify-center items-center'>
            <div className='flex'>
              <div className='relative w-16 h-16'>
                <img
                  src={iconBookBlank}
                  className='object-cover w-24 h-24 md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                />
              </div>
              <div className='relative w-20 h-16'>
                <img
                  src={iconNameBlank}
                  className='object-cover w-24 h-24 md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                />
              </div>
            </div>
          </Link>
        </div>
        {btnDesktop(login.authContext.isLogin)}
      </div>
      <img
        src={imgCat}
        className='absolute hidden xl:block w-[500px] right-0 top-0 z-[-1]'
      />
      <div className={lowerMenu}>{menuMobile(login.authContext.isLogin)}</div>
      <Modal modalType={"login"} />
    </div>
  );
}
