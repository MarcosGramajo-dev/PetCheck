import { Link } from 'react-router-dom'
import Arrow from '../../images/arrow.png'
import Historiaclinica from '../HisotriaClinica/HistoryForm'

export default function search(){
    return(
        <div className="flex justify-center max-sm:w-11/12 max-sm:m-auto">
            <div className="max-sm:w-full max-sm:mx-0 mx-8 relative drop-shadow-lg border-vet-purple-light text-vet-blue rounded-lg mt-10 max-w-sm border-4 border-spacing-40 flex flex-col text-center justify-center items-center bg-white p-4">
                <p className="font-semibold text-lg my-1 ">Ingresa el ID de tu libreta</p>
                <p className="text-vet-blue text-xs my-1">TODA LA INFORMACION DE TU MASCOTA A UN CLICK</p>
                <input minLength={6} placeholder='Ej: 489465' className=" border-vet-purple border-2 rounded-lg my-2 max-w-[300px] m-auto px-2" type="number" />
               <Link to="Historiaclinica"> <button className=" w-24 m-auto mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50"> BUSCAR</button></Link> 
                <img src={Arrow} className="absolute right-[-40%] top-[-30%] max-sm:hidden"/>
            </div>

            <div className="mx-8 w-52 max-sm:hidden drop-shadow-lg border-vet-purple-light text-vet-blue rounded-lg mt-10 border-4 border-spacing-40 flex flex-col justify-center items-center bg-white p-4">
                <p className="text-sm" >
                Historia Clinica <br/>
                Fechas de Vacunaciones <br/>
                Seguimiento <br/>
                Desparasitaciones <br/>
                Hisotrial de Agresiones <br/>
                Listado de alergias <br/>
                ¡Y mucho mas!...
                </p>
            </div>
        </div>
    )
}