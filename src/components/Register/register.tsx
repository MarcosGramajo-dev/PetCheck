import { Attributes, useState } from 'react'
import Provincias from './provincias'

export default function Register(){


    return(
        <div className="w-full h-full flex justify-center items-center ">
            <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                <div className="max-w-[500px] m-auto">
                    <p className="text-center text-vet-purple text-xl my-5">REGISTRO DE VETERINARIA</p>
                    <form className="flex justify-center flex-col">
                        <p>Datos de la Veterinaria</p>
                        <div className='h-[100px] flex justify-left items-center'>
                            <input type="file" id="img" className='hidden'/>
                            <label htmlFor="img" className="text-center cursor-pointer w-full border-dashed border-2 border-vet-purple px-2 py-6"> Foto del Local </label>
                        </div>
                        <input required type="text" placeholder="Nombre de la Veterinaria" className="my-3 mx-3 border-b-2 border-vet-purple-light" />
                        <div className="flex justify-between flex-wrap">
                            <input type="text" placeholder="Titular de la Veterinaria" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"/>
                            <input type="number" placeholder="Numero de Matricula" className=" my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                        </div>
                        <div className="flex justify-between flex-wrap"> 
                            <Provincias />
                            
                            <input type="text" placeholder="Direccion" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                        </div>
                        <div className="flex justify-between flex-wrap">
                            <input type="text" placeholder="Numero de Contacto" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                            <input type="text" placeholder="Numero de WhatsApp" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                        </div>
                        <p>Redes Solciales</p>
                        <div className="flex justify-between flex-wrap">
                            <input type="text" placeholder="Pagina Web" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                            <input type="text" placeholder="Instagram" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                        </div>
                        <div className="flex justify-between flex-wrap">
                            <input type="text" placeholder="Facebook" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                            <input type="text" placeholder="Tiktok" className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"/>
                        </div>
                        <p>Selecciones todos los servicios que brinda</p>
                        <div className="flex flex-wrap">
                            <div className="flex items-center m-5">
                                <input type="checkbox" id='Baño y Corte' value="Baño y Corte"/>
                                <label htmlFor='Baño y Corte' > Baño y Corte </label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id='Guarderia' value="Guarderia"/>
                                <label htmlFor='Guarderia' >Guarderia</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id="Cirugias" />
                                <label htmlFor='Cirugias'>Cirugias</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id="Traslados" />
                                <label htmlFor='Traslados'>Traslados</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id="Emergencias" />
                                <label htmlFor='Emergencias' className='cursor-pointer' >Emergencias</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id="Atencion de animales exoticos" />
                                <label htmlFor='Atencion de animales exoticos' >Atencion de animales exoticos</label>
                            </div>
                        </div>
                        <button type='submit' className="my-2 m-auto duration-300 text-lg px-6 py-1 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple">Registrarse</button>
                    </form>
                </div>

            </div>
        </div>
    )
}