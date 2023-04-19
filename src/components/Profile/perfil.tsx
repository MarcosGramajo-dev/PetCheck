import React, { useState } from 'react'
import Vet from '../../images/localVet.jpg'
import Provincias from '../Register/provincias'

export default function Perfil(){

    const [toggleEdit, setToggleEdit] = useState(false)

    function changeState(){
        setToggleEdit(!toggleEdit);
    }

    function changeForInfo(){

        return (
            <div>
                <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                    <p className="font-semibold text-vet-blue text-2xl text-center">PERFIL DE USUARIO</p>
                    <div>
                        <p className="m-1 font-semibold text-center">Correo Electronico: <span className="font-normal">Correo Electronico</span> </p>
                        <p className="m-1 font-semibold text-center">Contraseña: <span className="font-normal">Contraeña</span></p>
                    </div>
                </div>

                <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                    <p className="font-semibold text-vet-blue text-2xl text-center m-1">PERFIL DE LOCAL</p>
                        <div className='w-1/3 m-auto p-1'> <img src={Vet} alt="#" /> </div>
                    <div>
                        <p className="m-1 font-semibold w-64" >Nombre: <span className="font-normal">Mundo Animal</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Titular: <span className="font-normal">Titular de la Veterinaria</span></p>
                        <p className="m-1 font-semibold w-64" >Matricula: <span className="font-normal">841456</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Provincias: <span className="font-normal">Tucuman</span></p>
                        <p className="m-1 font-semibold w-64" >Localidad: <span className="font-normal">San Miguel de Tucuman</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Direccion: <span className="font-normal">Av. America 123</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Contacto: <span className="font-normal">381456987</span></p>
                        <p className="m-1 font-semibold w-64" >WathsApp: <span className="font-normal">381456987</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold" >Pagina: <span className="font-normal">-</span></p>
                        <p className="m-1 font-semibold" >Instagram: <span className="font-normal">intagram.com/MundoAnimal</span></p>
                        <p className="m-1 font-semibold" >Facebook: <span className="font-normal">facebook.com/MundoAnimal</span></p>
                        <p className="m-1 font-semibold" >Tiktok: <span className="font-normal">tiktok.com/MundoAnimal</span></p>
                    </div>
                    <div className="m-2">
                        <p>Servicios:</p>
                        <div className="flex flex-wrap">
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Baño y Corte</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Guarderia</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Cirugias</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Traslados</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Emergencias</p> </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button onClick={(event) => {event.preventDefault; changeState()}} className="min-w-[120px] mx-1 duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">Editar</button>
                    </div>
                </div>

            </div>
        )
    }

    function changeForInput(){

        return (
            <div>
                <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                    <p className="font-semibold text-vet-blue text-2xl text-center">PERFIL DE USUARIO</p>
                    <div className="my-2 flex justify-center flex-col">
                        <div className='flex justify-center'>
                            <label htmlFor="email">Correo Electronico:</label>
                            <input type="email" id='email' className="m-1 font-semibold border-2 border-vet-purple"/>
                        </div>
                        <div className='flex justify-center'>
                            <label htmlFor="pass">Contraseña Actual: </label>
                            <input type="password" id='pass' className="m-1 font-semibold border-vet-purple border-2"/>
                        </div>
                        <div className='flex justify-center'>
                            <label htmlFor='newPass'> Contraseña Nueva: </label>
                            <input type="password" id='newPass' className="m-1 font-semibold border-vet-purple border-2" />
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="min-w-[120px] m-2 duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50" > Guardar nueva contraseña </button>
                        </div>
                    </div>
                </div>

                <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                    <p className="font-semibold text-vet-blue text-2xl text-center m-1">PERFIL DE LOCAL</p>
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
                                <input type="checkbox" id='Baño y Corte'/>
                                <label htmlFor='Baño y Corte' > Baño y Corte </label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id='Guarderia'/>
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
                        <div className="flex justify-center">
                            <button onClick={(event) => {event.preventDefault; changeState()}} className="min-w-[120px] mx-1 duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">Guarda Cambios</button>
                            <button onClick={(event) => {event.preventDefault; changeState()}} className="min-w-[120px] mx-1 duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">Cancelar</button>
                        </div>
                    
                    </form>
                </div>

            </div>
        )
    }

    return(
        <div className="w-full h-full flex justify-center items-center ">
            { toggleEdit ? changeForInput() : changeForInfo()}
        </div>
    )
}

