import { useState } from 'react'
import iconName from '../images/nameIcon.svg'
import iconNameBlank from '../images/nameIcon_blank.svg'
import iconBook from '../images/bookIcon.svg'
import iconBookBlank from '../images/bookIcon_blank.svg'
import imgCat from '../images/Rectangle 1.png'

import Modal from './Modal/modal'


export default function Nav() {

  const [toggleMenu, setToggleMenu] = useState("burguerMenu sm:hidden");
  const [lowerMenu, setLowerMenu] = useState("");

  const [toggleOpen, setToggleOpen] = useState(false);


  const openModal = (newValue:boolean) => {
    setToggleOpen(newValue);
  }

  return (
    <div>
      <div className="flex w-auto my-0 justify-between items-center m-auto max-sm:bg-vet-purple-dark relative">
        <div className={toggleMenu} onClick={ ()=> { if(toggleMenu === 'burguerMenu sm:hidden' || toggleMenu === ""){
          setToggleMenu("crossMenu sm:hidden") 
          setLowerMenu("desployedMenu sm:hidden")
        }
        else{
          setToggleMenu("burguerMenu sm:hidden")
          setLowerMenu("desployMenu sm:hidden")
        }
        }}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="flex mx-5 justify-center items-center z-10">
            <img src={iconBook} className="w-20 mx-3 max-sm:hidden pt-3"/>
            <img src={iconName} className="w-36 max-sm:hidden pt-3"/>
            <div className="relative w-16 h-16"><img src={iconBookBlank} className="object-cover w-24 h-24 sm:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
            <div className="relative w-20 h-16"><img src={iconNameBlank} className="object-cover w-24 h-24 sm:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
        </div>
        <div className="flex m-5 items-center z-10">
            <button className="mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple max-sm:hidden" onClick={()=>{openModal(toggleOpen)}}> Iniciar Sesion </button>
            <button className="mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50 max-sm:hidden"> Registrate Aquí </button>
        </div>
        <img src={imgCat} className="absolute right-0 top-0 z-[-1] max-sm:opacity-20"/>
      </div>
      <div className={lowerMenu}>
        <form className="flex flex-col justify-center items-center py-3">
          <button className="text-white text-xl pb-2">Iniciar Sesion</button>
          <div className="relative w-60 object-cover my-2">
            <input className="w-60 rounded-lg px-2" type="text" placeholder='Usuario'/>
          </div>
          <div className="relative w-60 object-cover my-2">
            <input className="w-60 rounded-lg px-2"  type="password" placeholder='Password'/>
          </div>
          <button className="mx-1 w-32 px-4 h-8 border bg-white border-vet-purple-dark text-vet-purple-dark rounded-lg hover:text-white hover:bg-vet-purple-dark hover:border-white text-sm">Iniciar Sesion</button>
          <a href="#" className="text-white text-xs my-2">¿No tiene Cuenta?. Registrate Aquí</a>
        </form>
      </div>  
      <Modal/>
    </div>
  )
}