import Provincia from "../Register/provincias";
import { useState, FormEvent, JSXElementConstructor,useRef } from "react";
import provinciasJSON from "../../provincias.json";
import departamentosJSON from "../../departamentos.json";
import React from "react";
import {
  dataOwnerPet,
  dataPet,
  History,
  Registro
} from "../Context/Type";
import axios from "axios";
import { useLoginState } from "../Context/Context";

import {
  Button,
  Select,
  Input,
  Typography,
  Option,
  Alert,
  Textarea
} from '@material-tailwind/react'

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

interface Vacuna {
  Certification: number;
  DataVacuna: string;
  Vacuna: string;
  fecha: string;
  nameAndMatricule: string;
}

// interface Data {
//   [key: string]: {
//     [key: string]: string;
//   };
// }

export default function NuevaHistoria() {
  // let [imgBase64, setImgBase64] = useState("");

  const [arrayDepart, setArrayDepart] = useState<Depart[]>([]);
  const [Message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const [date, setdate] = useState(new Date().toLocaleDateString())

  const [newHC, setNewHC] = useState<History>({
    Vacunas: [
      {
        Certification: 0,
        DataVacuna: "",
        Vacuna: "",
        fecha: "",
        nameAndMatricule: "",
      },
    ],
    Registros: [
      {
        info: "",
        registro: "",
        fecha: "",
      },
    ],
    DataPet: {
      image: "",
      NombreMascota: "",
      Especie: "",
      Sexo: "",
      Nchip: 0,
      Pedigree: 0,
      Date: "",
      detalles: "",
    },
    ownerPet: {
      NombreDueno: "",
      DNI: 0,
      Telefono: 0,
      Direccion: "",
      province: "",
      departament: "",
    },
    id: '',
  });

  const [dataPet, setDataPet] = useState<dataPet>({
    image: "",
    NombreMascota: "",
    Especie: "",
    Sexo: "",
    Nchip: 0,
    Pedigree: 0,
    Date: "",
    detalles: "",
  });

  const [vacunaSelected, setVacunaSelected] = useState("");
  const [dataVacunas, setDataVacunas] = useState<Vacuna>({
    Certification: 0,
    DataVacuna: "",
    Vacuna: "",
    fecha: "",
    nameAndMatricule: "",
  });
  const [booleanVacunas, setBooleanVacunas] = useState(false);

  const [dataOwnerPet, setDataOwnerPet] = useState<dataOwnerPet>({
    NombreDueno: "",
    DNI: 0,
    Telefono: 0,
    Direccion: "",
    province: "",
    departament: "",
  });

  const [registerSelected, setRegisterSelected] = useState("");
  const [dataRegister, setDataRegister] = useState<Registro>(
    {
      info: "",
      registro: "",
      fecha: "",
    });

  const [idLibreta, setIdLibreta] = useState('');

  const [file, setFile] = useState<File>();

  const login = useLoginState();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function diaMesAño() {
    const tiempoTranscurrido = Date.now();

    const hoy = new Date(tiempoTranscurrido);

    return hoy.toLocaleDateString();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    if (e.target.name === "IDLibreta") {
      console.log(e.target.value)
      setIdLibreta(e.target.value);
    } else {
      setDataOwnerPet({ ...dataOwnerPet, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    // console.log(event.target.files)
  };
  const selectChange = (e: any) => {
    let arrayDepartamentos = departamentosJSON.features.filter(
      (depart) => depart.properties.provincia.id === e
    );
    setArrayDepart(arrayDepartamentos);
    setDataOwnerPet({
      ...dataOwnerPet,
      province: arrayDepartamentos[0].properties.provincia.nombre,
    });
  };
  const selectDepart = (e: any) => {
    let departSelect = arrayDepart.filter(
      (departSelected) => departSelected.properties.id === e
    );

    setDataOwnerPet({
      ...dataOwnerPet,
      departament: departSelect[0].properties.nombre,
    });
  };

  const handleChangePet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPet({ ...dataPet, [e.target.name]: e.target.value });
  };

  const handleChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataOwnerPet({ ...dataOwnerPet, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataRegister({ ...dataRegister, [e.target.name]: e.target.value });
  }

  const handleChangeVacunas = (e: any) => {
    // console.log(e.target.value)
      setVacunaSelected(e);
      setDataVacunas({ ...dataVacunas, 'Vacuna': e, 'fecha': date });
  };

  const handleChangeRegister = (e: any) => {
    setdate(new Date().toLocaleString())
      setRegisterSelected(e);
      setDataRegister({ ...dataRegister, 'registro': e, 'fecha': date });
  };

  const handleChangeVac = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataVacunas({ ...dataVacunas, [e.target.name]: e.target.value });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newHC: History = {
      Vacunas: [dataVacunas],
      Registros: [dataRegister],
      DataPet: dataPet,
      ownerPet: dataOwnerPet,
      id: idLibreta,
    };


    setNewHC(newHC);
    const formDataToSend = new FormData();

    if (file) {
      formDataToSend.append("image", file);
    }

    if (newHC) {
      const datos = JSON.stringify(newHC);
      formDataToSend.append("HistoriaClinica", datos);
      
      console.log(newHC)
    }


    // =======================DESCOMENTAR==================
    axios
      .post(`${login?.authContext.URL}/auth/newHistory`, formDataToSend)
      .then((res) => {
        setMessage(res.data)
        setTimeout(()=> {
          setMessage("")

          formRef.current?.reset()
          
        }, 3000)
      })
      .catch((err) => setMessage(err.response.data));
  };

  const toggleSelectedVacuna = () => {
    if (vacunaSelected != "") {
      return (
        <div className="flex flex-wrap justify-around gap-3 w-full">
          <div className="w-full">
            <Input type="text" name="fecha" onChange={handleChangeVac} disabled value={`${date}`} />
          </div>
          <div className="w-full">
            <Input
              id='dataVacunasNewHC'
              onChange={handleChangeVac}
              name='DataVacuna'
              type='text'
              label='Detalle la Vacuna'
            />
          </div>
          <div className="w-full">
            <Input
              id='certificationNewHC'
              onChange={handleChangeVac}
              name='Certification'
              type='number'
              label='N° de Certificacion'
            />
          </div>
          <div className="w-full">  
            <Input
              id='nameAndMatriculeNewHC'
              onChange={handleChangeVac}
              name='nameAndMatricule'
              type='text'
              label='Nombre y Matricula del Doctor'   
            />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const toggleSelectedRegister = () => {
    if (registerSelected != "") {
      return (
        <div className="flex flex-wrap justify-around w-full gap-3">
          <Input type="text" name="fecha" disabled value={`${date}`} />
          <Textarea label="Message"
            id='textAreaNewHC'
            onChange={handleChangeTextArea}
            name='info'
            cols={40}
            rows={10}
            />
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className='w-full p-5 m-auto my-20 bg-white flex flex-col justify-center'>
      <div className='w-full md:w-3/4 m-auto flex flex-col justify-center lg:mt-14'>
        <Typography variant="h4" className='text-left my-3 text-vet-purple'>
          NUEVA HISTORIA CLINICA
        </Typography>
        <form ref={formRef} className='flex justify-center flex-col' onSubmit={submit}>
          <div className="w-full flex flex-wrap flex-col md:flex-row md:max-h-48">
            <div className='w-full md:w-1/2 px-3 '>
              <label
                htmlFor='img'
                className='text-center cursor-pointer w-full max-h-48 md:h-full flex justify-center items-center border-dashed border-2 border-vet-purple px-2 py-6'>
                Foto de la mascota
              </label>
              <input
                type='file'
                id='img'
                className='hidden'
                
                name='img'
                onChange={handleImageChange}
              />
              
            </div>
            <br/>
            <div className="w-full md:w-1/2 px-3 flex flex-wrap justify-center items-center border">
              {imageUrl && (
                <div className="flex flex-wrap justify-center items-center w-full md:max-h-48">
                  <img src={imageUrl} alt="Preview" className="md:max-h-48"/>
                </div>
              )}
            </div>
          </div>
          <br/>
          <div className="flex flex-wrap">
            <div className="w-full border-0 md:w-1/2 md:border-vet-purple md:border-r">
              <Typography variant="h6" className='m-3'>DATOS DEL PROPIETARIO</Typography>
              <div className='flex flex-wrap justify-around  gap-3  w-full min-h-72'>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='idLibretaNewHC'
                    type='number'
                    onChange={handleChange}
                    required
                    name='IDLibreta'
                    label='ID de la Libreta'  
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    onChange={handleChangeOwner}
                    required
                    name='NombreDueno'
                    type='text'
                    id='NombreNewHC'
                    label='Nombre'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    onChange={handleChangeOwner}
                    required
                    name='DNI'
                    type='number'
                    id='DNINewHC'
                    label='D.N.I'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    onChange={handleChangeOwner}
                    name='Telefono'
                    type='number'
                    id='telefonoNewHC'
                    label='Telefono'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Select
                    id='provinciaNewHC'
                    label="Selecionar provincia"
                    onChange={(event)=>selectChange(event)}>
                    {provinciasJSON?.features.map((option) => (
                      <Option
                        key={option.properties.id}
                        value={option.properties.id}>
                        {option.properties.nombre}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="w-full xl:w-auto mx-3">
                  <Select
                    id='departamentNewHC'
                    label="Selecionar departamento"
                    onChange={(event)=>selectDepart(event)}>
                    {arrayDepart?.map((element) => (
                      <Option
                        key={element.properties.id}
                        value={element.properties.id}>
                        {element.properties.nombre}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    onChange={handleChangeOwner}
                    name='Direccion'
                    type='text'
                    id='direccionNewHC'
                    label='Direccion'
                  />
                </div>
              </div>
              
            </div>
            <div className="w-full border-0 md:w-1/2 md:border-vet-purple md:border-l">
              <Typography variant="h6" className="m-3">DATOS DE LA MASCOTA</Typography>
              <div className='flex flex-wrap justify-around gap-3 w-full min-h-72'>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='nombreMascotaNewHC'
                    onChange={handleChangePet}
                    type='text'
                    required
                    name='NombreMascota'
                    label='Nombre'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='especieNewHC'
                    onChange={handleChangePet}
                    type='text'
                    required
                    name='Especie'
                    label='Especie'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='sexoNewHC'
                    onChange={handleChangePet}
                    type='text'
                    required
                    name='Sexo'
                    label='Sexo'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='NchipNewHC'
                    onChange={handleChangePet}
                    type='number'
                    name='Nchip'
                    label='N° Chip'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='pedigreeNewHC'
                    onChange={handleChangePet}
                    type='number'
                    name='Pedigree'
                    label='Registro Pedigree'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='dateNewHC'
                    onChange={handleChangePet}
                    type='date'
                    required
                    name='Date'
                    label='Fecha de nacimiento'
                  />
                </div>
                <div className="w-full xl:w-auto mx-3">
                  <Input
                    id='detallesNewHC'
                    onChange={handleChangePet}
                    type='text'
                    name='detalles'
                    label='Marcas Particulares'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">

            <div className='w-full border-0 md:w-1/2 md:border-vet-purple md:border-r'>
              <Typography variant="h6" className="m-3">VACUNAS</Typography>
              <div className='flex flex-wrap justify-around gap-3 w-full min-h-72'>
                <div className=' w-full mx-3 flex flex-wrap justify-around gap-3'>
                  <Select
                    id='vacunasNewHC'
                    onChange={handleChangeVacunas}
                    label="Selecciona el tipo de Vacuna"
                    name="vacuna"
                    >
                    <Option value=''>Ninguno</Option>
                    <Option value='VacunaAntirrabica'>Vacuna Antirrabica</Option>
                    <Option value='QuintupleFelina'>Quintuple Felina</Option>
                  </Select>
                  <div className="w-full gap-3 h-72">
                    {toggleSelectedVacuna()}
                  </div>
                </div>
              </div>
            </div>
          <div className='w-full border-0 md:w-1/2 md:border-vet-purple md:border-l '>
            <Typography variant="h6" className="m-3">REGISTRO</Typography>
            <div className='flex flex-wrap justify-around gap-3 w-full min-h-72'>
              <div className=' w-full mx-3 flex flex-wrap justify-around gap-3'>
                <Select
                  id='RegistroNewHC'
                  onChange={handleChangeRegister}
                  name="registro"
                  label="Selecciona el tipo de Registro"
                  // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                  >
                  <Option value=''>Ninguno</Option>
                  <Option value='Agresiones'>Agresiones</Option>
                  <Option value='EnfermedadesCronicas'>
                    Enfermedades Cronicas
                  </Option>
                  <Option value='Lesiones'>Lesiones</Option>
                </Select>
                <div className="w-full gap-3 h-60">
                  {toggleSelectedRegister()}
                </div>
              </div>
            </div>
          </div>
          
          </div>
          
          <div className='flex flex-col md:flex-row justify-between my-3'>
            <div className="w-full md:w-3/5">
              {
                Message === 'Se registró con éxito!' ? 
                <Alert
                  className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                >
                  {Message}
                </Alert>
                :
                null
              }

              {
                Message != 'Se registró con éxito!' && Message != '' ? <Alert 
                className="rounded-none border-l-4 border-[#c92e3b] bg-[#c92e3b]/10 font-medium text-[#c92e3b]"
                >
                  {Message}
                </Alert> 
                :
                null
              }
            </div>
            <div className="w-full my-3 md:w-2/5 flex justify-end">
              <Button
                id='SubmitNewHC'
                type="submit"
                className="bg-vet-purple"
                >
                Crear Nueva Historia Clinica
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
