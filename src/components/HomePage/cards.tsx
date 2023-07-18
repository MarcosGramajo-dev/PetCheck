import Bag from '../../images/icons/bag.svg'
import Car from '../../images/icons/car.svg'
import Emergency from '../../images/icons/emergency.svg'
import Local24 from '../../images/icons/local_24.svg'
import Shower from '../../images/icons/shower.svg'
import Vet from '../../images/localVet.jpg'
import Facebook from '../../images/redes/Facebook.svg'
import Instagram from '../../images/redes/Instagram.svg'
import Whatsapp from '../../images/redes/Whatsapp.svg'
import { UserVet } from '../Context/Type'

import { useState } from 'react';

interface IProps{
    infoCard: UserVet
}


const Cards=(props:IProps)=>{
    const [isPurpleOpen, setPurpleOpen] = useState(false);
  const [isLilacOpen, setLilacOpen] = useState(false);

  const togglePurpleOpen = () => setPurpleOpen(!isPurpleOpen);
  const toggleLilacOpen = () => setLilacOpen(!isLilacOpen);

    return(
        <div className="max-w-xs mx-auto bg-white rounded shadow-lg">
            
                <img src={props.infoCard.vet.image} alt="#" className="w-full h-32 object-cover object-center"/>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{props.infoCard.vet.nameLocal}</h2>
                    <button className="text-xl font-semibold mb-2" onClick={togglePurpleOpen}>
                        Servicios
                    </button>
                    {isPurpleOpen && (
                    <div className="bg-purple-200 p-2 rounded" >
                        {/* hacer map aqui despues */}
                        <p className="bg-amber-500 rounded-full m-1">
                            <img className="p-1 w-8" src={Bag} alt="#" />
                        </p>
                        <p className=" bg-teal-500 rounded-full m-1">
                            <img className="p-1 w-8" src={Car} alt="#" />
                        </p>
                        <p className="bg-red-500 rounded-full m-1">
                            <img className="p-1 w-8" src={Emergency} alt="#" />
                        </p>
                        <p className="bg-cyan-500 rounded-full m-1">
                            <img className="p-1 w-8"src={Shower} alt="#" />
                        </p>
                        <p className="bg-green-500 rounded-full m-1">
                            <img className="p-1 w-8" src={Local24} alt="#" />
                        </p>
                     </div>
                     )}
            
            <div className="py-4">
                <h4 className="text-xl font-semibold mb-2">{props.infoCard.vet.address}</h4>
                <button className="w-full bg-purple-500 text-white py-2 px-4 rounded" onClick={toggleLilacOpen}>
                 Redes Sociales
                 </button>
                 {isLilacOpen && (
                <div className="bg-purple-300 p-2 rounded">
                    <p><img src={Facebook} alt={props.infoCard.vet.facebook} className="mx-1 cursor-pointer" /></p>
                    <p><img src={Instagram} alt={props.infoCard.vet.instagram} className="mx-1 cursor-pointer"/></p>
                    <p><img src={Whatsapp} alt="" className="mx-1 cursor-pointer"/></p>
                </div>
                )}
            </div>
        </div>
    </div>
    )
}
export default Cards;
// <div className="hover:h-52 duration-300 max-sm:w-4/5 w-2/5 h-36 border-4 border-vet-purple-light bg-white rounded-lg shadow-xl m-3 overflow-hidden">
//             <div className="flex h-36">
//                 <div className="w-1/2 h-full relative" ><img src={props.infoCard.vet.image} alt="#" className="absolute h-36"/></div>
//                 <div className="w-1/2 flex flex-col justify-around">
//                     <p className="text-center font-semibold">{props.infoCard.vet.nameLocal}</p>
//                     <div className="flex pb-2">
//                         {/* hacer map aqui despues */}
//                         <div className="bg-amber-500 rounded-full m-1"><img className="p-1 w-8" src={Bag} alt="#" /></div>
//                         <div className=" bg-teal-500 rounded-full m-1"><img className="p-1 w-8" src={Car} alt="#" /></div>
//                         <div className="bg-red-500 rounded-full m-1"><img className="p-1 w-8" src={Emergency} alt="#" /></div>
//                         <div className="bg-cyan-500 rounded-full m-1"><img className="p-1 w-8"src={Shower} alt="#" /></div>
//                         <div className="bg-green-500 rounded-full m-1"><img className="p-1 w-8" src={Local24} alt="#" /></div>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-between py-3">
//                 <p className="pl-2">{props.infoCard.vet.address}</p>
//                 <div className="flex pr-2">
//                     <img src={Facebook} alt={props.infoCard.vet.facebook} className="mx-1 cursor-pointer" />
//                     <img src={Instagram} alt={props.infoCard.vet.instagram} className="mx-1 cursor-pointer"/>
//                     <img src={Whatsapp} alt="" className="mx-1 cursor-pointer"/>
//                 </div>
//             </div>
//         </div>