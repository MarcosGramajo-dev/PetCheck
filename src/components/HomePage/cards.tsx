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
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
  } from "@material-tailwind/react";

interface IProps{
    infoCard: UserVet
}


export default function Cards(props:IProps){
    return(
        <Card className="hover:h-52 duration-300 max-sm:w-4/5 w-2/5 h-36 border-4 border-vet-purple-light bg-white rounded-lg shadow-xl m-3 overflow-hidden">
            <div className="flex h-36">
                <CardHeader floated={false} ><img src={props.infoCard.vet.image} alt="#" className="h-36"/></CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4 " className="mb-2">{props.infoCard.vet.nameLocal}</Typography>
                    <div className="relative w-full">
                    <Button className="w-full py-3  bg-vet-purple-light hover:bg-vet-purple-dark">
                        Servicios
                    </Button>
                    <ul className="absolute flex justify-between py-3 left-0 w-full mt-2 p-2 bg-white rounded-lg shadow-md hidden">
                        {/* hacer map aqui despues */}
                        <div className="bg-amber-500 rounded-full m-1"><img className="p-1 w-8" src={Bag} alt="#" /></div>
                        <div className=" bg-teal-500 rounded-full m-1"><img className="p-1 w-8" src={Car} alt="#" /></div>
                        <div className="bg-red-500 rounded-full m-1"><img className="p-1 w-8" src={Emergency} alt="#" /></div>
                        <div className="bg-cyan-500 rounded-full m-1"><img className="p-1 w-8"src={Shower} alt="#" /></div>
                        <div className="bg-green-500 rounded-full m-1"><img className="p-1 w-8" src={Local24} alt="#" /></div>
                    </ul>
                    </div>
                </CardBody>
            </div>
            <CardFooter className="flex justify-between py-3">
                <Typography className="font-medium">{props.infoCard.vet.address}</Typography>
                <Button className="w-full py-3  bg-vet-purple-light hover:bg-vet-purple-dark">
                 Redes Sociales
                 </Button>
                <div className="flex pr-2">
                    <img src={Facebook} alt={props.infoCard.vet.facebook} className="mx-1 cursor-pointer" />
                    <img src={Instagram} alt={props.infoCard.vet.instagram} className="mx-1 cursor-pointer"/>
                    <img src={Whatsapp} alt="" className="mx-1 cursor-pointer"/>
                </div>
            </CardFooter>
        </Card>
    )
}

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