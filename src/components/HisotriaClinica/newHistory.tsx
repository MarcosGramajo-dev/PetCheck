import Provincia from '../Register/provincias'
import {useState, FormEvent} from 'react'
import provinciasJSON from "../../provincias.json";
import departamentosJSON from "../../departamentos.json";

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


export default function NuevaHistoria(){
  let [imgBase64, setImgBase64] = useState("");
  const [arrayDepart, setArrayDepart] = useState<Depart[]>([]);
  let [newHC, setNewHC] = useState({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          imgBase64 = base64String.split(",")[1];
          setImgBase64(imgBase64);
          setNewHC({ ...newHC, image: imgBase64 });
        };
      }
    } else {
        setNewHC({ ...newHC, [e.target.name]: e.target.value,});
    }

  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    // console.log(departamentosJSON);

    let arrayDepartamentos = departamentosJSON.features.filter(
      (depart) => depart.properties.provincia.id === e.target.value
    );
    setArrayDepart(arrayDepartamentos);

    setNewHC({
      ...newHC,
      ["province"]: arrayDepartamentos[0].properties.provincia.nombre,
    });
  };

  const selectDepart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let departSelect = arrayDepart.filter(
      (departSelected) => departSelected.properties.id === e.target.value
    );

    setNewHC({
      ...newHC,
      ["departament"]: departSelect[0].properties.nombre,
    });
  };

  const submit = (e: FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
    console.log(newHC)
  }
    
    return(
        <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">

            <div className="w-full m-auto flex flex-col justify-center">
                <p className="text-center text-vet-purple text-xl my-5">NUEVA HISTORIA CLINICA</p>
                <form className="flex justify-center flex-col" onSubmit={submit}>
                    <div className='h-[100px] flex justify-left items-center flex-col'>
                        <input type="file" id="img" className='hidden' onChange={handleChange}/>
                        <label htmlFor="img" className="text-center cursor-pointer w-full border-dashed border-2 border-vet-purple px-2 py-6"> Foto de la mascota </label>
                        <input type="number" onChange={handleChange} name='IDLibreta' className="m-1 my-4 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="ID de la Libreta"/>
                    </div>
                    <p className="py-2">DATOS DEL PROPIETARIO</p>
                    <div className="flex flex-wrap justify-around border-b-2 border-vet-purple py-2 border-dashed">
                        <input onChange={handleChange} name='NombreDueño' type="text" id='Nombre' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Nombre"/>
                        <input onChange={handleChange} name='DNI' type="number" id='DNI' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="D.N.I"/>
                        <input onChange={handleChange} name='Telefono' type="number" id='telefono' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Telefono"/>
                        <input onChange={handleChange} name='Direccion' type="text" id='direccion' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Direccion"/>
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
                    </div>

                    <p className="py-2">DATOS DE LA MASCOTA</p>
                    <div className="flex flex-wrap justify-around border-b-2 border-vet-purple py-2 border-dashed">
                        <input onChange={handleChange} type="text" id='NombreMascota' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Nombre"/>
                        <input onChange={handleChange} type="text" id='especie' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Especie"/>
                        <input onChange={handleChange} type="text" id='sexo' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Sexo"/>
                        <input onChange={handleChange} type="number" id='Nchip' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="N° Chip"/>
                        <input onChange={handleChange} type="number" id='pedigree' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Registro Pedigree"/>
                        <input onChange={handleChange} type="date" id='date' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Fecha de nacimiento"/>
                        <input onChange={handleChange} type="text" id='detalles' className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Marcas Particulares"/>
                    </div>

                    <div className="flex flex-col justify-around border-b-2 border-vet-purple py-2 border-dashed">
                        <p>VACUNAS</p>
                        <div  className=" w-3/4 m-auto flex flex-wrap justify-around">
                            <select className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light">
                                <option value="">Selecciona el tipo de Vacuna</option>
                                <option value="">Vacuna Antirrabica</option>
                                <option value="">Quintuple Felina</option>
                            </select>
                            <div>
                                <input onChange={handleChange} type="text" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Detalle la Vacuna" />
                                <input onChange={handleChange} type="date" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Detalle la Vacuna" />
                                <input onChange={handleChange} type="number" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="N° de Certificacion" />
                                <input onChange={handleChange} type="text" className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light" placeholder="Nombre y Matricula del Doctor" />
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col justify-around border-b-2 border-vet-purple p-2 border-dashed">
                        <p>REGISTRO</p>
                        <div  className=" w-3/4 m-auto flex flex-col justify-center items-center">
                            <select className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light">
                                <option value="">Selecciona el tipo de Registro</option>
                                <option value="">Agresiones</option>
                                <option value="">Enfermedades Cronicas</option>
                                <option value="">Lesiones</option>
                            </select>
                            <div>
                                <textarea name="" cols={40} rows={10} className="p-1 border-2 border-vet-purple-light"></textarea>
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
