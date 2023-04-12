import Bag from '../../images/icons/bag.svg'
import Car from '../../images/icons/car.svg'
import Emergency from '../../images/icons/emergency.svg'
import Local24 from '../../images/icons/local_24.svg'
import Shower from '../../images/icons/shower.svg'
import Vet from '../../images/localVet.jpg'
import Facebook from '../../images/redes/Facebook.svg'
import Instagram from '../../images/redes/Instagram.svg'
import Whatsapp from '../../images/redes/Whatsapp.svg'

export default function Card(){
    return(
        <div className="hover:h-52 duration-300 max-sm:w-4/5 w-2/5 h-36 border-4 border-vet-purple-light bg-white rounded-lg shadow-xl m-3 overflow-hidden">
            <div className="flex h-36">
                <div className="w-1/2 h-full relative" ><img src={Vet} alt="#" className="absolute h-36"/></div>
                <div className="w-1/2 flex flex-col justify-around">
                    <p className="text-center font-semibold">MUNDO ANIMAL</p>
                    <p className=" text-[10px] px-1">Horarios:</p>
                    <p className="text-xs px-1">Lun a Vier 9:00am a 7:00pm <br/> Sáb 9:00am a 2:00pm</p>
                    <p className="text-[10px] px-1">Servicios:</p>
                    <div className="flex pb-2">
                        <div className="bg-amber-500 rounded-full m-1"><img className="p-1 w-8" src={Bag} alt="#" /></div>
                        <div className=" bg-teal-500 rounded-full m-1"><img className="p-1 w-8" src={Car} alt="#" /></div>
                        <div className="bg-red-500 rounded-full m-1"><img className="p-1 w-8" src={Emergency} alt="#" /></div>
                        <div className="bg-cyan-500 rounded-full m-1"><img className="p-1 w-8"src={Shower} alt="#" /></div>
                        <div className="bg-green-500 rounded-full m-1"><img className="p-1 w-8" src={Local24} alt="#" /></div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between py-3">
                <p className="pl-2">Av. America 1123</p>
                <div className="flex pr-2">
                    <img src={Facebook} alt="#" className="mx-1 cursor-pointer" />
                    <img src={Instagram} alt="#" className="mx-1 cursor-pointer"/>
                    <img src={Whatsapp} alt="" className="mx-1 cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}