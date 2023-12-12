import Provincia from "../Register/provincias";
import { useState, FormEvent, JSXElementConstructor } from "react";
import provinciasJSON from "../../provincias.json";
import departamentosJSON from "../../departamentos.json";
import React from "react";
import {
  dataOwnerPet,
  dataPet,
  History,
  Registros,
  Vacunas,
} from "../Context/Type";
import axios from "axios";
import { useLoginState } from "../Context/Context";

import {
  Button,
  Select,
  Input,
  Typography,
  Option,
  Alert
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

// interface Data {
//   [key: string]: {
//     [key: string]: string;
//   };
// }

export default function NuevaHistoria() {
  // let [imgBase64, setImgBase64] = useState("");

  const [arrayDepart, setArrayDepart] = useState<Depart[]>([]);
  const [Message, setMessage] = useState("");

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
        Info: "",
        Registro: "",
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
      NombreDueño: "",
      DNI: 0,
      Telefono: 0,
      Direccion: "",
      province: "",
      departament: "",
    },
    id: 0,
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
  const [dataVacunas, setDataVacunas] = useState<Vacunas>([
    {
      Certification: 0,
      DataVacuna: "",
      Vacuna: "",
      fecha: "",
      nameAndMatricule: "",
    },
  ]);
  const [booleanVacunas, setBooleanVacunas] = useState(false);

  const [dataOwnerPet, setDataOwnerPet] = useState<dataOwnerPet>({
    NombreDueño: "",
    DNI: 0,
    Telefono: 0,
    Direccion: "",
    province: "",
    departament: "",
  });

  const [registerSelected, setRegisterSelected] = useState("");
  const [dataRegister, setDataRegister] = useState<Registros>([
    {
      Info: "",
      Registro: "",
      fecha: "",
    },
  ]);

  const [idLibreta, setIdLibreta] = useState(0);

  const [file, setFile] = useState<File>();

  const login = useLoginState();

  function diaMesAño() {
    const tiempoTranscurrido = Date.now();

    const hoy = new Date(tiempoTranscurrido);

    return hoy.toLocaleDateString();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* if (e.target.type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          imgBase64 = base64String;
          setImgBase64(imgBase64);
          setDataPet({ ...dataPet, image: imgBase64 });
        };
      }
    } else  */ if (e.target.name === "IDLibreta") {
      setIdLibreta(parseInt(e.target.value));
    } else {
      setDataOwnerPet({ ...dataOwnerPet, [e.target.name]: e.target.value });
    }
    // setNewHC({...newHC, "Vacunas": {dataVacunas}, "Registros": dataRegister, "DataPet": dataPet, "ownerPet": dataOwnerPet, "id": idLibreta });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let arrayDepartamentos = departamentosJSON.features.filter(
      (depart) => depart.properties.provincia.id === e.target.value
    );
    setArrayDepart(arrayDepartamentos);
    setDataOwnerPet({
      ...dataOwnerPet,
      province: arrayDepartamentos[0].properties.provincia.nombre,
    });
    console.log("province" + ":" + e.target.value);
  };

  const selectDepart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let departSelect = arrayDepart.filter(
      (departSelected) => departSelected.properties.id === e.target.value
    );

    setDataOwnerPet({
      ...dataOwnerPet,
      departament: departSelect[0].properties.nombre,
    });
  };

  const handleChangePet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPet({ ...dataPet, [e.target.name]: e.target.value });
    // setNewHC({...newHC, "Vacunas": [dataVacunas], "Registros": [dataRegister], "DataPet": dataPet, "ownerPet": dataOwnerPet, "id": idLibreta });
  };

  const handleChangeVacunas = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.type === "select-one") {
      setVacunaSelected(e.target.value);
    } else {
      setDataVacunas((dataVacunas) => ({
        ...dataVacunas,
        Vacuna: vacunaSelected,
        fecha: diaMesAño(),
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleChangeRegister = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.type === "select-one") {
      setRegisterSelected(e.target.value);
    } else {
      setDataRegister((dataRegister) => ({
        ...dataRegister,
        Registro: registerSelected,
        fecha: diaMesAño(),
        Info: e.target.value,
      }));
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newHC: History = {
      Vacunas: dataVacunas,
      Registros: dataRegister,
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
    }

    // =======================DESCOMENTAR==================
    axios
      .post(`${login?.authContext.URL}/auth/newHistory`, formDataToSend)
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage(err.response.data));
  };

  const toggleSelectedVacuna = () => {
    if (vacunaSelected != "") {
      return (
        <div>
          <input
            id='dataVacunasNewHC'
            onChange={handleChangeVacunas}
            name='DataVacuna'
            type='text'
            className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
            placeholder='Detalle la Vacuna'
          />
          <input
            id='certificationNewHC'
            onChange={handleChangeVacunas}
            name='Certification'
            type='number'
            className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
            placeholder='N° de Certificacion'
          />
          <input
            id='nameAndMatriculeNewHC'
            onChange={handleChangeVacunas}
            name='nameAndMatricule'
            type='text'
            className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
            placeholder='Nombre y Matricula del Doctor'
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const toggleSelectedRegister = () => {
    if (registerSelected != "") {
      return (
        <div>
          <textarea
            id='textAreaNewHC'
            onChange={handleChangeRegister}
            name=''
            cols={40}
            rows={10}
            className='p-1 border-2 border-vet-purple-light'></textarea>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className='w-full p-5 m-auto my-20 bg-white flex flex-col justify-center'>
      <div className='w-2/3 m-auto flex flex-col justify-center lg:mt-14'>
        <Typography variant="h4" className='text-center text-vet-purple'>
          NUEVA HISTORIA CLINICA
        </Typography>
        <form className='flex justify-center flex-col' onSubmit={submit}>
          <div className='h-[120px] flex justify-left items-center flex-col'>
            <label
              htmlFor='img'
              className='text-center cursor-pointer w-1/2 border-dashed border-2 border-vet-purple px-2 py-6'>
              Foto de la mascota
            </label>
            <input
              type='file'
              id='img'
              className='hidden'
              name='img'
              onChange={handleImageChange}
            />
            <div className="my-3">
              <Input
                id='idLibretaNewHC'
                type='number'
                onChange={handleChange}
                name='IDLibreta'
                // className='m-1 my-4 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='ID de la Libreta'  
              />
            </div>
          </div>
          <Typography variant="h6" className='gap-3'>DATOS DEL PROPIETARIO</Typography>
          <div className='flex flex-wrap justify-around border-vet-purple py-2 border-b'>
            <div>
              <Input
                onChange={handleChange}
                name='NombreDueno'
                type='text'
                id='NombreNewHC'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Nombre'
              />
            </div>
            <div>
              <Input
                onChange={handleChange}
                name='DNI'
                type='number'
                id='DNINewHC'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='D.N.I'
              />
            </div>
            <div>
              <Input
                onChange={handleChange}
                name='Telefono'
                type='number'
                id='telefonoNewHC'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Telefono'
              />
            </div>
            <div>
              <Input
                onChange={handleChange}
                name='Direccion'
                type='text'
                id='direccionNewHC'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Direccion'
              />
            </div>
            <div className='flex flex-wrap justify-center w-full my-3'>
              <div className="mx-3">
                <Select
                  id='provinciaNewHC'
                  label="Selecionar provincia"
                  // className='my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light'
                  onChange={()=>selectChange}>
                  {/* <Option value=''> Selecciona una Provincia </Option> */}
                  {provinciasJSON?.features.map((option) => (
                    <Option
                      key={option.properties.id}
                      value={option.properties.id}>
                      {option.properties.nombre}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mx-4">
                <Select
                  id='departamentNewHC'
                  // className='my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light'
                  label="Selecionar departamento"
                  onChange={()=>selectDepart}>
                  {arrayDepart?.map((element) => (
                    <Option
                      key={element.properties.id}
                      value={element.properties.id}>
                      {element.properties.nombre}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <Typography variant="h6" className="mt-3">DATOS DE LA MASCOTA</Typography>
          <div className='flex flex-wrap justify-around border-vet-purple py-5 border-b gap-3 '>
            <div>
              <Input
                id='nombreMascotaNewHC'
                onChange={handleChangePet}
                type='text'
                name='NombreMascota'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Nombre'
              />
            </div>
            <div>
              <Input
                id='especieNewHC'
                onChange={handleChangePet}
                type='text'
                name='Especie'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Especie'
              />
            </div>
            <div>
              <Input
                id='sexoNewHC'
                onChange={handleChangePet}
                type='text'
                name='Sexo'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Sexo'
              />
            </div>
            <div>
              <Input
                id='NchipNewHC'
                onChange={handleChangePet}
                type='number'
                name='Nchip'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='N° Chip'
              />
            </div>
            <div>
              <Input
                id='pedigreeNewHC'
                onChange={handleChangePet}
                type='number'
                name='Pedigree'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Registro Pedigree'
              />
            </div>
            <div>
              <Input
                id='dateNewHC'
                onChange={handleChangePet}
                type='date'
                name='Date'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Fecha de nacimiento'
              />
            </div>
            <div>
              <Input
                id='detallesNewHC'
                onChange={handleChangePet}
                type='text'
                name='detalles'
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                label='Marcas Particulares'
              />
            </div>
          </div>

          <div className='flex flex-col justify-around pb-3 border-vet-purple py-2 border-b'>
            <Typography variant="h6">VACUNAS</Typography>
            <div className=' w-3/4 m-auto flex flex-wrap justify-around'>
              <Select
                id='vacunasNewHC'
                onChange={() => handleChangeVacunas}
                label="Selecciona el tipo de Vacuna"
                // className='m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light'
                >
                <Option value=''>Ninguno</Option>
                <Option value='VacunaAntirrabica'>Vacuna Antirrabica</Option>
                <Option value='QuintupleFelina'>Quintuple Felina</Option>
              </Select>
              {toggleSelectedVacuna()}
            </div>
          </div>

          <div className='flex flex-col justify-around border-b border-vet-purple py-3'>
            <Typography variant="h6">REGISTRO</Typography>
            <div className=' w-3/4 m-auto flex flex-col justify-center items-center'>
              <Select
                id='RegistroNewHC'
                onChange={() => handleChangeRegister}
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
              {toggleSelectedRegister()}
            </div>
          </div>
          {/* <Typography variant="lead" className="text-center text-red-500" id='messageNewHC'>{Message}{'Test'}</Typography> */}
          
          <div className='flex justify-center my-3'>
            <Button
              id='SubmitNewHC'
              className="bg-vet-purple"
              // className='min-w-[120px] my-3 m-auto duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50 max-sm:hidden'
              >
              Crear Nueva Historia Clinica
            </Button>
          </div>
          <div>
          <Alert 
            className="rounded-none border-l-4 border-[#c92e3b] bg-[#c92e3b]/10 font-medium text-[#c92e3b]"
            // color="red"
            >
              An error alert for showing message.
          </Alert>

          <Alert
            className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
          >
            A simple alert for showing message.
          </Alert>
          </div>
        </form>
      </div>
    </div>
  );
}
