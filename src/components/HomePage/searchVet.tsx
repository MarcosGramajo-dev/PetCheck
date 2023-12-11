import { Button } from "@material-tailwind/react";

import Car from "../../images/icons/car.svg";
import Bag from "../../images/icons/bag.svg";
import Emergency from "../../images/icons/emergency.svg";
import Local24 from "../../images/icons/local_24.svg";
import Shower from "../../images/icons/shower.svg";

export default function SearchVet(){
    return(
        <div className="flex flex-wrap justify-around mt-4 text-white">
            <Button className="flex flex-wrap items-center justify-center mt-8 text-white bg-light-blue-300 mx-2">
                <span> <img src={Car} alt="car"/> </span>
                <span className="mx-2 hidden md:block" >Servicio a domicilio</span>
            </Button>
            <Button className="flex flex-wrap items-center justify-center mt-8 text-white bg-orange-400 mx-2">
                <span> <img src={Bag} alt="car"/> </span>
                <span className="mx-2 hidden md:block" >Compras</span>
            </Button>
            <Button className="flex flex-wrap items-center justify-center mt-8 text-white bg-red-400 mx-2">
                <span> <img src={Emergency} alt="car"/> </span>
                <span className="mx-2 hidden md:block" >Cirugias</span>
            </Button>
            <Button className="flex flex-wrap items-center justify-center mt-8 text-white bg-green-400 mx-2">
                <span> <img src={Local24} alt="car"/> </span>
                <span className="mx-2 hidden md:block" >24Hs</span>
            </Button>
            <Button className="flex flex-wrap items-center justify-center mt-8 text-white bg-teal-400 mx-2">
                <span> <img src={Shower} alt="car"/> </span>
                <span className="mx-2 hidden md:block" >Baño y Corte</span>
            </Button>
        </div>
    )
}