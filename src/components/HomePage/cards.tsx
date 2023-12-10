import Bag from "../../images/icons/bag.svg";
import Car from "../../images/icons/car.svg";
import Emergency from "../../images/icons/emergency.svg";
import Local24 from "../../images/icons/local_24.svg";
import Shower from "../../images/icons/shower.svg";
import Vet from "../../images/localVet.jpg";
import Facebook from "../../images/redes/Facebook.svg";
import Instagram from "../../images/redes/Instagram.svg";
import Whatsapp from "../../images/redes/Whatsapp.svg";
import Laptop from "../../images/redes/laptop.svg";
import { UserVet } from "../Context/Type";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

type redesSociales = {
  webpage: string;
  instagram: string;
  facebook: string;
  tiktok: string;
};

type tarjetas = {
  email: string;
  nombreVeterinaria: string;
  direccion: string;
  redesSociales: redesSociales;
  imagen: string;
  servicios: string[];
};

interface IProps {
  infoCard: tarjetas;
}

const Cards = (props: IProps) => {
  const [isPurpleOpen, setPurpleOpen] = useState(true);
  const [isLilacOpen, setLilacOpen] = useState(false);

  function openTab(tab: string) {
    if (tab === "services") {
      setPurpleOpen(true);
      setLilacOpen(false);
    } else {
      setPurpleOpen(false);
      setLilacOpen(true);
    }
  }

  // console.log(props.infoCard)

  return (
        <Card className="w-full max-w-[26rem] max-h-[600px] shadow-lg mt-6">
          <CardHeader floated={false} color="blue-gray">
            <img
              src={props.infoCard.imagen}
              alt="vet"
              className="h-72 w-full bg-cover"
            />
            {/* <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " /> */}
          </CardHeader>
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray" className="font-medium">
                {props.infoCard.nombreVeterinaria}
              </Typography>
            </div>
              <Typography variant="h5" color="blue-gray" className="font-medium">
                {props.infoCard.direccion}
              </Typography>
            <div className="group mt-4 flex gap-3">
              <div className="flex w-10">
                
                { props.infoCard.servicios.map((item) => (
                    <Tooltip content="Servicio a domicilio">
                      <span className="cursor-pointer rounded-full border border-gray-900/5 bg-light-blue-300 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-light-blue-100 hover:!opacity-100 group-hover:opacity-70">
                        <img src={item} alt="car"/>
                      </span>
                    </Tooltip>
                )) }
                <Tooltip content="Servicio a domicilio">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-light-blue-300 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-light-blue-100 hover:!opacity-100 group-hover:opacity-70">
                    <img src={Car} alt="car"/>
                  </span>
                </Tooltip>
              </div>
              <div className="flex w-10">
              <Tooltip content="Compras">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-orange-400 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-orange-200 hover:!opacity-100 group-hover:opacity-70">
                  <img src={Bag} alt="car"/>
                </span>
              </Tooltip>
              </div>
              <div className="flex w-10">
              <Tooltip content="Cirugias">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-red-400 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-red-200 hover:!opacity-100 group-hover:opacity-70">
                  <img src={Emergency} alt="car"/>
                </span>
              </Tooltip>
              </div>
              <div className="flex w-10">
              <Tooltip content="24Hs">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-green-400 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-green-200 hover:!opacity-100 group-hover:opacity-70">
                  <img src={Local24} alt="car"/>
                </span>
              </Tooltip>
              </div>
              <div className="flex w-10">
              <Tooltip content="Baño y Corte">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-teal-400 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-teal-100 hover:!opacity-100 group-hover:opacity-70">
                  <img src={Shower} alt="car"/>
                </span>
              </Tooltip>
              </div>
              
            </div>
          </CardBody>
          <CardFooter className="flex pt-3">
            { props.infoCard.redesSociales.facebook != '' ? 
            <Button size="lg" fullWidth={true} className="m-1 bg-gray-200">
                <img src={Facebook} alt="wp"/>
            </Button> : null }

            { props.infoCard.redesSociales.instagram != '' ?  
            <Button size="lg" fullWidth={true} className="m-1 bg-white">
                <img src={Instagram} alt="wp"/>
            </Button> : null }
            
            
            <Button size="lg" fullWidth={true} className="m-1 bg-gray-200">
                <img src={Laptop} alt="wp"/>
            </Button>
            <Button size="lg" fullWidth={true} className="m-1 bg-white">
                <img src={Whatsapp} alt="wp"/>
            </Button>
          </CardFooter>
        </Card>
  )
}

  export default Cards;
  //   return (
  //     <div className='max-w-xs bg-white rounded shadow-lg w-3/12 m-2 justify-between'>
  //       <img
  //         src={props.infoCard.imagen}
  //         alt='#'
  //         className='w-full h-32 object-cover object-center'
  //       />
  //       <div className='p-4'>
  //         <h2 className='text-xl font-semibold mb-2'>
  //           {props.infoCard.nombreVeterinaria}
  //         </h2>
  //         <h4 className='text-xl font-semibold mb-2'>
  //           {props.infoCard.direccion}
  //         </h4>
  //         <div>
  //           <button
  //             className='text-xl font-semibold mb-2'
  //             onClick={() => openTab("services")}>
  //             Servicios
  //           </button>
  //           <button
  //             className='w-full bg-purple-500 text-white py-2 px-4 rounded'
  //             onClick={() => openTab("")}>
  //             Redes Sociales
  //           </button>
  //         </div>
  
  //         <div className='py-4'>
  //           {isPurpleOpen && (
  //             <div className='p-2 rounded flex justify-between'>
  //               {/* hacer map aqui despues */}
  //               <p className='bg-amber-500 rounded-full h-8 w-8 m-1'>
  //                 <img className='p-1 w-8' src={Bag} alt='#' />
  //               </p>
  //               <p className=' bg-teal-500 rounded-full h-8 w-8 m-1'>
  //                 <img className='p-1 w-8' src={Car} alt='#' />
  //               </p>
  //               <p className='bg-red-500 rounded-full h-8 w-8 m-1'>
  //                 <img className='p-1 w-8' src={Emergency} alt='#' />
  //               </p>
  //               <p className='bg-cyan-500 rounded-full h-8 w-8 m-1'>
  //                 <img className='p-1 w-8' src={Shower} alt='#' />
  //               </p>
  //               <p className='bg-green-500 rounded-full h-8 w-8 m-1'>
  //                 <img className='p-1 w-8' src={Local24} alt='#' />
  //               </p>
  //             </div>
  //           )}
  
  //           {isLilacOpen && (
  //             <div className='p-2 rounded flex'>
  //               <a href={props.infoCard.redesSociales.facebook}>
  //                 <img
  //                   src={Facebook}
  //                   alt={props.infoCard.redesSociales.facebook}
  //                   className='mx-2 cursor-pointer'
  //                 />
  //               </a>
  //               <a href={props.infoCard.redesSociales.instagram}>
  //                 <img
  //                   src={Instagram}
  //                   alt={props.infoCard.redesSociales.instagram}
  //                   className='mx-2 cursor-pointer'
  //                 />
  //               </a>
  //               <a href={""}>
  //                 <img src={Whatsapp} alt='' className='mx-2 cursor-pointer' />
  //               </a>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
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
