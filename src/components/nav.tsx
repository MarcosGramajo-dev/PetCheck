import { useState } from 'react'
import iconName from '../images/nameIcon.svg'
import iconNameBlank from '../images/nameIcon_blank.svg'
import iconBook from '../images/bookIcon.svg'
import iconBookBlank from '../images/bookIcon_blank.svg'
import imgCat from '../images/Rectangle 1.png'

import {Link} from 'react-router-dom'

import Modal from './Modal/modal'


export default function Nav() {

  const [toggleMenu, setToggleMenu] = useState("burguerMenu");
  const [lowerMenu, setLowerMenu] = useState("sm:hidden h-0 overflow-hidden");
  const [state, setState] = useState(false)

  const [toggleOpen, setToggleOpen] = useState(false);


  const openModal = (newValue:boolean) => {
    setToggleOpen(newValue);
  }

  function menuMobile(sesion:boolean){
    if(sesion){
      return(
        <div className="border-t-2 border-vet-purple-light w-11/12 m-auto flex flex-col justify-between h-full">
          <div className="w-full pt-20">
          <Link to="gestion"><button onClick={()=>{setToggleMenu("burguerMenu"); setLowerMenu("sm:hidden h-0 overflow-hidden")}} className="my-1 h-12 w-full m-auto border-2 border-vet-purple-dark text-vet-purple-dark bg-white hover:bg-vet-purple-dark hover:border-white hover:text-white"> Gestion </button> </Link>
          <button className="my-1 h-12 w-full m-auto border-2 border-vet-purple-dark text-vet-purple-dark bg-white hover:bg-vet-purple-dark hover:border-white hover:text-white"> Perfil </button>
          </div>
          <div>
            <button className="my-3 h-12 w-full m-auto text-white bg-vet-red hover:bg-white hover:text-vet-red"> Salir </button>
          </div>
        </div>
      )

    }
    else{
      return(
        <form className="flex flex-col justify-center items-center py-3 mt-16">
          <button className="text-white text-xl pb-2">Iniciar Sesion</button>
          <div className="relative w-60 object-cover my-2">
            <input className="w-60 rounded-lg px-2" type="text" placeholder='Usuario'/>
          </div>
          <div className="relative w-60 object-cover my-2">
            <input className="w-60 rounded-lg px-2"  type="password" placeholder='Password'/>
          </div>
          <button className="mx-1 w-32 px-4 h-8 border bg-white border-vet-purple-dark text-vet-purple-dark rounded-lg hover:text-white hover:bg-vet-purple-dark hover:border-white text-sm">Iniciar Sesion</button>
          <a href="#" className="text-white text-xs my-2">¿No tiene Cuenta?. Registrate Aquí</a> {/* FALTA CREAR VISTA */}
        </form>
      )
    }
  }

  function btnDesktop(sesion:boolean){
    if(sesion){
      return(
        <div className="flex m-5 items-center z-10">
          <Link to="gestion"> <button className="mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple max-sm:hidden"> Gestion </button> </Link>
          <button className=" mx-1 duration-300 text-xs px-4 h-6 border border-vet-red text-white bg-vet-red rounded-lg hover:text-vet-red hover:bg-neutral-50 max-sm:hidden"> Salir </button>

        </div>
      )
    } else{
      return(
        <div className="flex m-5 items-center z-10">
          <button className="min-w-[120px] mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple max-sm:hidden" onClick={()=>{openModal(toggleOpen)}}> Iniciar Sesion </button>
          <button className="min-w-[120px] mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50 max-sm:hidden"> Registrate Aquí </button>
        </div>
        
      )
    }
  }

  return (
    <div>
      <div className="flex w-full z-50 my-0 justify-between items-center m-auto max-sm:bg-vet-purple-dark relative max-sm:fixed">
        <div className={toggleMenu} onClick={ ()=> { if(toggleMenu != 'burguerMenu sm:hidden'){
          setToggleMenu("burguerMenu sm:hidden")
          setLowerMenu("desployMenu sm:hidden")
        }
        else{
          setToggleMenu("crossMenu sm:hidden") 
          setLowerMenu("desployedMenu sm:hidden")
        }


        }}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className=" mx-5 z-10">
          <Link to="/" className="flex justify-center items-center">
            <img src={iconBook} className="w-20 mx-3 max-sm:hidden pt-3"/>
            <img src={iconName} className="w-36 max-sm:hidden pt-3"/>
            <div className="relative w-16 h-16"><img src={iconBookBlank} className="object-cover w-24 h-24 sm:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
            <div className="relative w-20 h-16"><img src={iconNameBlank} className="object-cover w-24 h-24 sm:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
          </Link>
        </div>
        {btnDesktop(true)}
      </div>
        <img src={imgCat} className="absolute right-0 top-0 z-[-1] max-sm:opacity-20"/>
      <div className={lowerMenu}>
        
        {menuMobile(true)}
        
      </div>  
      <Modal/>
    </div>
  )
}