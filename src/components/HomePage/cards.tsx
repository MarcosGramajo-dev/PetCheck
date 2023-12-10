import Bag from "../../images/icons/bag.svg";
import Car from "../../images/icons/car.svg";
import Emergency from "../../images/icons/emergency.svg";
import Local24 from "../../images/icons/local_24.svg";
import Shower from "../../images/icons/shower.svg";
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
                
                {/* { props.infoCard.servicios.map((item) => (
                    <Tooltip content="Servicio a domicilio">
                      <span className="cursor-pointer rounded-full border border-gray-900/5 bg-light-blue-300 p-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-light-blue-100 hover:!opacity-100 group-hover:opacity-70">
                        <img src={item} alt="car"/>
                      </span>
                    </Tooltip>
                )) } */}
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
            <Button size="lg" fullWidth={true} className="m-1 bg-[#6c74bb]">
                <img src={FFacebook} alt="wp"/>
            </Button> : null }

            { props.infoCard.redesSociales.instagram != '' ?  
            <Button size="lg" fullWidth={true} className="m-1 bg-gradient-to-b from-[#7722ba] to-[#db8e3f]">
                <img src={Insta} alt="wp"/>
            </Button> : null }
            
            
            <Button size="lg" fullWidth={true} className="m-1 bg-gray-200">
                <img src={Laptop} alt="wp"/>
            </Button>
            <Button size="lg" fullWidth={true} className="m-1 bg-[#25D366]">
                <img src={Whatsapp} alt="wp"/>
            </Button>
          </CardFooter>
        </Card>
  )
}

  export default Cards;