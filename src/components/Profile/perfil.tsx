import React, { useEffect, useState } from 'react'
import Vet from '../../images/localVet.jpg'
import provinciasJSON from "../../provincias.json";
import departamentosJSON from "../../departamentos.json";
import axios from "axios"

//import userJSON from "./user.json" 
import { useLoginState } from '../Context/Context';
import { UserVet } from '../Context/Type';



interface CheckboxState {
    value: string;
    isChecked: boolean;
  }
  
  interface Depart {
      properties: {
          nombre: string;
          id: string;
          provincia: {
              nombre: string;
              id: string;
            };
        };
    }
    
    export default function Perfil(){
        
    const [toggleEdit, setToggleEdit] = useState(false)
    
    const [vet, setVet] = useState({})
    const [changeUser, setChangeUser] = useState({});
    const [checkboxes, setCheckboxes] = useState<CheckboxState[]>([
        { value: "Baño y corte", isChecked: false },
        { value: "Guarderia", isChecked: false },
        { value: "Cirugias", isChecked: false },
    ]);
    let [imgBase64, setImgBase64] = useState("");
    const [arrayDepart, setArrayDepart] = useState<Depart[]>([]);
    
    const login = useLoginState()
    
    // const userJSON = login?.user

    //por que usando el useEffect esto se muere????????
    let usuario = localStorage.getItem('vet')
    let userJSON: UserVet
    
    if(usuario !== null && usuario !== ""){
        userJSON = JSON.parse(usuario)
    }   

    //-----------------

    function edit(){
        setToggleEdit(!toggleEdit);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "checkbox") {
          const { value, checked } = e.target;
          const updatedCheckboxes = checkboxes.map((checkbox) =>
            checkbox.value === value
              ? { ...checkbox, isChecked: checked }
              : checkbox
          );
          setCheckboxes(updatedCheckboxes);
          setVet({ ...vet, service: updatedCheckboxes });
        } else if (e.target.type === "file") {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              const base64String = reader.result as string;
              // Hacer algo con la cadena codificada en base64
              imgBase64 = base64String.split(",")[1];
              setImgBase64(imgBase64);
              setVet({ ...vet, image: imgBase64 });
            };
          }
        } else {
          setVet({ ...vet, [e.target.name]: e.target.value, service: [] });
        }
      };

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    // console.log(departamentosJSON);

    let arrayDepartamentos = departamentosJSON.features.filter(
        (depart) => depart.properties.provincia.id === e.target.value
    );
    setArrayDepart(arrayDepartamentos);

    setVet({
        ...vet,
        ["province"]: arrayDepartamentos[0].properties.provincia.nombre,
    });
    };

    const selectDepart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let departSelect = arrayDepart.filter(
        (departSelected) => departSelected.properties.id === e.target.value
    );

    setVet({
        ...vet,
        ["departament"]: departSelect[0].properties.nombre,
    });
    };

    const handleSubmit = () =>{
        setChangeUser({["vet"]: vet })
        console.log(changeUser)
    }

    function changeForInfo(){

        return (
            <div>
                <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                    <p className="font-semibold text-vet-blue text-2xl text-center">PERFIL DE USUARIO</p>
                    <div>
                        <p className="m-1 font-semibold text-center">Correo Electronico: <span className="font-normal">{userJSON ? userJSON.email : ""}</span> </p>
                        <p className="m-1 font-semibold text-center">Contraseña: <span className="font-normal">{userJSON ? userJSON.password : ""}</span></p>
                    </div>
                </div>

                <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
                    <p className="font-semibold text-vet-blue text-2xl text-center m-1">PERFIL DE LOCAL</p>
                        <div className='w-1/3 m-auto p-1'> <img src={userJSON ? userJSON.vet.image : ""} alt="#" /> </div>
                    <div>
                        <p className="m-1 font-semibold w-64" >Nombre: <span className="font-normal">{userJSON ? userJSON.vet.nameLocal : ""}</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Titular: <span className="font-normal">{userJSON ? userJSON.vet.ownerVet : ""}</span></p>
                        <p className="m-1 font-semibold w-64" >Matricula: <span className="font-normal">{userJSON ? userJSON.vet.numMatricula : ""}</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Provincias: <span className="font-normal">{userJSON ? userJSON.vet.province : ""}</span></p>
                        <p className="m-1 font-semibold w-64" >Localidad: <span className="font-normal">{userJSON ? userJSON.vet.departament : ""}</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Direccion: <span className="font-normal">{userJSON ? userJSON.vet.address : ""}</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold w-64" >Contacto: <span className="font-normal">{userJSON ? userJSON.vet.tel : ""}</span></p>
                        <p className="m-1 font-semibold w-64" >WathsApp: <span className="font-normal">{userJSON ? userJSON.vet.telWp : ""}</span></p>
                    </div>
                    <div className="flex justify-between flex-wrap max-sm:flex-col">
                        <p className="m-1 font-semibold" >Pagina: <span className="font-normal">{userJSON ? userJSON.vet.web : ""}</span></p>
                        <p className="m-1 font-semibold" >Instagram: <span className="font-normal">{userJSON ? userJSON.vet.instagram : ""}</span></p>
                        <p className="m-1 font-semibold" >Facebook: <span className="font-normal">{userJSON ? userJSON.vet.facebook : ""}</span></p>
                        <p className="m-1 font-semibold" >Tiktok: <span className="font-normal">{userJSON ? userJSON.vet.tiktok : ""}</span></p>
                    </div>
                    <div className="m-2">
                        <p>Servicios:</p>
                        <div className="flex flex-wrap">
                            {/* {
                                userJSON ? userJSON.vet.service.map( (element, index) => 
                                    <div key={index} className={element.isChecked ? "m-1 border-2 border-vet-purple rounded-lg w-40" : "hidden"}> 
                                        <p className=" text-center px-3 py-1 text-vet-purple" > {element.value} </p>
                                    </div>
                                ) : ""
                            } */}
                            
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button onClick={(event) => {event.preventDefault; edit()}} className="min-w-[120px] mx-1 duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">Editar</button>
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
                        <input
                            required
                            type="text"
                            placeholder="Nombre de la Veterinaria"
                            className="my-3 mx-3 border-b-2 border-vet-purple-light"
                        />
                        <div className="flex justify-between flex-wrap">
                        <input
                            required
                            onChange={handleChange}
                            name="ownerVet"
                            type="text"
                            placeholder="Titular de la Veterinaria"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                        />
                        <input
                            required
                            onChange={handleChange}
                            name="numMatricula"
                            type="number"
                            placeholder="Numero de Matricula"
                            className=" my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        </div>
                        <div className="flex justify-between flex-wrap  min-w-[200px] max-[500px]:w-full w-auto">
                        <div className="flex flex-wrap justify-between min-w-[200px] max-[500px]:w-full w-auto">
                            <select
                            required
                            className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                            onChange={selectChange}
                            >
                            <option value=""> Selecciona una Provincia </option>
                            {provinciasJSON.features.map((option) => (
                                <option
                                key={option.properties.id}
                                value={option.properties.id}
                                >
                                {option.properties.nombre}
                                </option>
                            ))}
                            </select>

                            <select
                            className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                            required
                            onChange={selectDepart}
                            >
                            <option value="">Seleccione su Localidad</option>
                            {arrayDepart.map((element) => (
                                <option
                                key={element.properties.id}
                                value={element.properties.id}
                                >
                                {element.properties.nombre}
                                </option>
                            ))}
                            </select>
                        </div>

                        <input
                            required
                            onChange={handleChange}
                            name="address"
                            type="text"
                            placeholder="Direccion"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        </div>
                        <div className="flex justify-between flex-wrap">
                        <input
                            required
                            onChange={handleChange}
                            name="tel"
                            type="number"
                            placeholder="Numero de Contacto"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        <input
                            required
                            onChange={handleChange}
                            name="telWp"
                            type="number"
                            placeholder="Numero de WhatsApp"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        </div>
                        <p>Redes Solciales</p>
                        <div className="flex justify-between flex-wrap">
                        <input
                            required
                            onChange={handleChange}
                            name="web"
                            type="text"
                            placeholder="Pagina Web"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        <input
                            required
                            onChange={handleChange}
                            name="instagram"
                            type="text"
                            placeholder="Instagram"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        </div>
                        <div className="flex justify-between flex-wrap">
                        <input
                            required
                            onChange={handleChange}
                            name="facebook"
                            type="text"
                            placeholder="Facebook"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        <input
                            required
                            onChange={handleChange}
                            name="tiktok"
                            type="text"
                            placeholder="Tiktok"
                            className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
                        />
                        </div>
                        <p>Selecciones todos los servicios que brinda</p>
                        <div className="flex flex-wrap">
                        {checkboxes.map((checkbox) => (
                            <label key={checkbox.value} className="mx-2">
                            <input
                                type="checkbox"
                                value={checkbox.value}
                                checked={checkbox.isChecked}
                                onChange={handleChange}
                            />
                            {checkbox.value}
                            </label>
                        ))}
                        </div>
                        
                        <div className="flex justify-center">
                            <button onClick={() => handleSubmit()} className="min-w-[120px] mx-1 duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">Guarda Cambios</button>
                            <button onClick={(event) => {event.preventDefault; edit()}} className="min-w-[120px] mx-1 duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">Cancelar</button>
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

