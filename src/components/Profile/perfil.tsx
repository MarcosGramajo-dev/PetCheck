import Vet from '../../images/localVet.jpg'
export default function Perfil(){

    return(
        <div className="w-full h-full flex justify-center items-center ">
            <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                <div>
                    <p className="font-semibold text-vet-blue text-2xl text-center">PERFIL DE USUARIO</p>
                    <div>
                        <p className="m-1 font-semibold">Correo Electronico: <span className="font-normal">Correo Electronico</span> </p>
                        <p className="m-1 font-semibold">Contraseña: <span className="font-normal">Contraeña</span></p>
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-vet-blue text-2xl text-center">PERFIL DE LOCAL</p>
                    <div>
                        <div className='w-1/3'> <img src={Vet} alt="#" /> </div>
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
                    <div>
                        <p>Servicios:</p>
                        <div className="flex flex-wrap">
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Baño y Corte</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Guarderia</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Cirugias</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Traslados</p> </div>
                            <div className="m-1 border-2 border-vet-purple rounded-lg w-40" > <p className=" text-center px-3 py-1 text-vet-purple" >Emergencias</p> </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}