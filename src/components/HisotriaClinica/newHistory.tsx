import Provincia from '../Register/provincias'

export default function NuevaHistoria(){
    
    return(
        <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">

            <div className="w-full m-auto flex flex-col justify-center">
                <p className="text-center text-vet-purple text-xl my-5">NUEVA HISTORIA CLINICA</p>
                <form className="flex justify-center flex-col">
                    <div className='h-[100px] flex justify-left items-center flex-col'>
                        <input type="file" id="img" className='hidden'/>
                        <label htmlFor="img" className="text-center cursor-pointer w-full border-dashed border-2 border-vet-purple px-2 py-6"> Foto de la mascota </label>
                        <input type="number" className="m-1 my-4 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="ID de la Libreta"/>
                    </div>
                    <p className="py-2">DATOS DEL PROPIETARIO</p>
                    <div className="flex flex-wrap justify-around border-b-2 border-vet-purple py-2 border-dashed">
                        <input type="text" id='Nombre' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Nombre"/>
                        <input type="number" id='DNI' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="D.N.I"/>
                        <input type="number" id='telefono' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Telefono"/>
                        <input type="text" id='direccion' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Direccion"/>
                        <Provincia/>
                    </div>

                    <p className="py-2">DATOS DE LA MASCOTA</p>
                    <div className="flex flex-wrap justify-around border-b-2 border-vet-purple py-2 border-dashed">
                        <input type="text" id='Nombre' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Nombre"/>
                        <input type="text" id='especie' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Especie"/>
                        <input type="text" id='sexo' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Sexo"/>
                        <input type="number" id='Nchip' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="N° Chip"/>
                        <input type="number" id='pedigree' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Registro Pedigree"/>
                        <input type="date" id='date' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Fecha de nacimiento"/>
                        <input type="text" id='detalles' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Marcas Particulares"/>
                    </div>

                    <div className="flex flex-col justify-around border-b-2 border-vet-purple py-2 border-dashed">
                        <p>VACUNAS</p>
                        <div  className=" w-3/4 m-auto flex flex-wrap justify-around">
                            <select id="" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light">
                                <option value="">Selecciona el tipo de Vacuna</option>
                                <option value="">Vacuna Antirrabica</option>
                                <option value="">Quintuple Felina</option>
                            </select>
                            <div>
                                <input type="text" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Detalle la Vacuna" />
                                <input type="date" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Detalle la Vacuna" />
                                <input type="number" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="N° de Certificacion" />
                                <input type="text" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Nombre y Matricula del Doctor" />
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col justify-around border-b-2 border-vet-purple p-2 border-dashed">
                        <p>REGISTRO</p>
                        <div  className=" w-3/4 m-auto flex flex-col justify-center items-center">
                            <select id="" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light">
                                <option value="">Selecciona el tipo de Registro</option>
                                <option value="">Agresiones</option>
                                <option value="">Enfermedades Cronicas</option>
                                <option value="">Lesiones</option>
                            </select>
                            <div>
                                <textarea name="" id="" cols={40} rows={10} className="p-1 border-2 border-vet-purple-light"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="min-w-[120px] my-3 m-auto duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50 max-sm:hidden"> Crear Nueva Historia Clinica </button>
                    </div>
                </form>
            </div>
        </div>
    )
}