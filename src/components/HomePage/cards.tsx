import Venta from "../../images/icons/bag.svg";
import Consulta from "../../images/icons/car.svg";
import Cirugias from "../../images/icons/emergency.svg";
import Hospedaje from "../../images/icons/local_24.svg";
import Estetica from "../../images/icons/shower.svg";
import Vet from "../../images/localVet.jpg";
import Facebook from "../../images/redes/Facebook.svg";
import FFacebook from "../../images/redes/f-facebook.png";
import Instagram from "../../images/redes/Instagram.svg";
import Insta from "../../images/redes/insta.svg";
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
  telCelular:string;
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

  console.log(props)

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
              <Typography variant="h5" color="blue-gray" className="font-medium text-center">
                {props.infoCard.nombreVeterinaria}
              </Typography>
            </div>
              <Typography variant="h5" color="blue-gray" className="font-medium text-sm">
                {props.infoCard.direccion}
              </Typography>
            <div className="group mt-4 flex gap-3 min-h-[40px]">
                
                { props.infoCard.servicios.map((item) => (
                  <div className="flex w-10">
                    <Tooltip content={item} key={item} >
                      <span className={`cursor-pointer rounded-full border border-gray-900/5 text-gray-900 transition-colors hover:border-gray-900/10 hover:!opacity-100 group-hover:opacity-70
                      ${item == 'Cirugias' ? 'bg-light-blue-300 p-1 hover:bg-light-blue-100' : ''}
                      ${item == 'Venta' ? 'bg-orange-400 p-1 hover:bg-orange-200' : ''}
                      ${item == 'Consulta' ? 'bg-red-400 p-1 hover:bg-red-200' : ''}
                      ${item == 'Hospedaje' ? 'bg-green-400 p-1 hover:bg-green-200' : ''}
                      ${item == 'Estetica' ? 'bg-teal-400 p-1 hover:bg-teal-200' : ''}
                      `}>
                        {item == 'Cirugias' ? <img src={Cirugias} alt={item}/> : null}
                        {item == 'Venta' ? <img src={Venta} alt={item}/> : null}
                        {item == 'Consulta' ? <img src={Consulta} alt={item}/> : null}
                        {item == 'Hospedaje' ? <img src={Hospedaje} alt={item}/> : null}
                        {item == 'Estetica' ? <img src={Estetica} alt={item}/> : null}
                      </span>
                    </Tooltip>
                  </div>
                )) }
                {/* <Tooltip content="Servicio a domicilio">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-light-blue-300 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-light-blue-100 hover:!opacity-100 group-hover:opacity-70">
                    <img src={Car} alt="car"/>
                  </span>
                </Tooltip> */}
              {/* <div className="flex w-10">
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
              </div> */}
              
            </div>
          </CardBody>
          <CardFooter className="flex pt-3">
            { props.infoCard.redesSociales.facebook != '' ? 
            <Button onClick={()=>  window.open(props.infoCard.redesSociales.facebook, '_blank') } size="lg" fullWidth={true} className="m-1 bg-[#6c74bb]">
                <img src={FFacebook} alt="wp"/>
            </Button> : null }

            { props.infoCard.redesSociales.instagram != '' ?  
            <Button onClick={()=>  window.open(props.infoCard.redesSociales.instagram, '_blank') } size="lg" fullWidth={true} className="m-1 bg-gradient-to-b from-[#7722ba] to-[#db8e3f]">
                <img src={Insta} alt="wp"/>
            </Button> : null }
            
            { props.infoCard.redesSociales.webpage != '' ?  
            <Button onClick={()=>  window.open(props.infoCard.redesSociales.webpage, '_blank') } size="lg" fullWidth={true} className="m-1 bg-gray-200">
                <img src={Laptop} alt="wp"/>
            </Button> : null }

            { props.infoCard.telCelular != '' ?  
            <Button onClick={()=>  window.open(`https://wa.me/54${props.infoCard.telCelular}`, '_blank') } size="lg" fullWidth={true} className="m-1 bg-[#25D366]">
                <img src={Whatsapp} alt="wp"/>
            </Button> : null }
          </CardFooter>
        </Card>
  )
}

  export default Cards;