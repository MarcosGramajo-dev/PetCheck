import Tienda from "../../images/icons/bag.svg";
import Traslado from "../../images/icons/car.svg";
import Cirugia from "../../images/icons/emergency.svg";
import Guarderia from "../../images/icons/local_24.svg";
import Peluqueria from "../../images/icons/shower.svg";
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

  // console.log(props)

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
                      ${item == 'Peluqueria' ? 'bg-light-blue-300 p-1 hover:bg-light-blue-100' : ''}
                      ${item == 'Guarderia' ? 'bg-orange-400 p-1 hover:bg-orange-200' : ''}
                      ${item == 'Cirugia' ? 'bg-red-400 p-1 hover:bg-red-200' : ''}
                      ${item == 'Tienda' ? 'bg-green-400 p-1 hover:bg-green-200' : ''}
                      ${item == 'Traslado' ? 'bg-teal-400 p-1 hover:bg-teal-200' : ''}
                      `}>
                        {item == 'Peluqueria' ? <img src={Peluqueria} alt={item}/> : null}
                        {item == 'Guarderia' ? <img src={Guarderia} alt={item}/> : null}
                        {item == 'Cirugia' ? <img src={Cirugia} alt={item}/> : null}
                        {item == 'Tienda' ? <img src={Tienda} alt={item}/> : null}
                        {item == 'Traslado' ? <img src={Traslado} alt={item}/> : null}
                      </span>
                    </Tooltip>
                  </div>
                )) }
              
            </div>
          </CardBody>
          <CardFooter className="flex pt-3">
            { props.infoCard.redesSociales.facebook != '' ? 
            <Button onClick={()=>  window.open(props.infoCard.redesSociales.facebook, '_blank') } size="lg" fullWidth={true} className="flex justify-center items-center m-1 bg-[#6c74bb]">
                <img src={FFacebook} alt="wp" className="max-w-[30px]"/>
            </Button> : null }

            { props.infoCard.redesSociales.instagram != '' ?  
            <Button onClick={()=>  window.open(props.infoCard.redesSociales.instagram, '_blank') } size="lg" fullWidth={true} className="flex justify-center items-center m-1 bg-gradient-to-b from-[#7722ba] to-[#db8e3f]">
                <img src={Insta} alt="wp" className="max-w-[30px]" />
            </Button> : null }
            
            { props.infoCard.redesSociales.webpage != '' ?  
            <Button onClick={()=>  window.open(props.infoCard.redesSociales.webpage, '_blank') } size="lg" fullWidth={true} className="flex justify-center items-center m-1 bg-gray-200">
                <img src={Laptop} alt="wp" className="max-w-[30px]"/>
            </Button> : null }

            { props.infoCard.telCelular != '' ?  
            <Button onClick={()=>  window.open(`https://wa.me/54${props.infoCard.telCelular}`, '_blank') } size="lg" fullWidth={true} className="flex justify-center items-center m-1 bg-[#25D366]">
                <img src={Whatsapp} alt="wp" className="max-w-[30px]"/>
            </Button> : null }
          </CardFooter>
        </Card>
  )
}

  export default Cards;