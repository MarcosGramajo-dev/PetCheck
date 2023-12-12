
import { Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoginState } from '../Context/Context';
import { History } from '../Context/Type';


export default function HistoriaClinica() {
  const [historiaClinica, setHistoriaClinica] = useState({});
  const [localHC, setLocalHC] = useState<History>({
    Vacunas: [{
      Certification: 0,
      DataVacuna: "",
      Vacuna: "",
      fecha: "",
      nameAndMatricule: ""
    }],
    Registros: [{
      Info: "",
      Registro: "",
      fecha: ""
    }],
    DataPet: {
        image: "",
        NombreMascota: "",
        Especie: "",
        Sexo: "",
        Nchip: 0,
        Pedigree: 0,
        Date: "",
        detalles: ""
    },
    ownerPet: {
        NombreDueño: "",
        DNI: 0,
        Telefono: 0,
        Direccion: "",
        province: "",
        departament: ""
    },
    id: 0
  })

  const login = useLoginState( )
  const HC = login?.authContext.HC

  function asignValue(){

  }

  // const [searchParams] = useSearchParams()
  // console.log(searchParams.get('search'))

  useEffect(() => {
    
  }, []);

  function handleChange() {
    // Lógica para manejar los cambios en los campos de entrada
    console.log(login?.authContext.HC)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para enviar la historia clínica o realizar otras operaciones
  };

  return (
    <div>
      <div>
        <div className="bg-white pt-10 md:pt-20 ">
          
          <div className="w-full max-sm:border-0 p-5 m-auto my-10 bg-white max-w-[900px] flex flex-wrap justify-between gap-3">
            <div>
              <Typography variant="h5" className="font-semibold text-vet-blue text-left">DATOS DEL DUEÑO</Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Nombre: <span className="font-normal">{HC?.ownerPet.NombreDueño}</span> </Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">DNI: <span className="font-normal">{HC?.ownerPet.DNI}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Direccion: <span className="font-normal">{HC?.ownerPet.Direccion}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Telefono: <span className="font-normal">{HC?.ownerPet.Telefono}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Provincia: <span className="font-normal">{HC?.ownerPet.province}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Localidad: <span className="font-normal">{HC?.ownerPet.departament}</span></Typography>
            </div>
            <div>
              <Typography variant="h5" className="font-semibold text-vet-blue text-left">DATOS DE LA MASCOTA</Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Nombre: <span className="font-normal">{HC?.DataPet.NombreMascota}</span> </Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Sexo: <span className="font-normal">{HC?.DataPet.Sexo}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Fecha de Nac: <span className="font-normal">{HC?.DataPet.Date}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Pedigree: <span className="font-normal">{HC?.DataPet.Pedigree}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Nchip: <span className="font-normal">{HC?.DataPet.Nchip}</span></Typography>
              <Typography variant="paragraph" className="m-1 font-semibold">Detalle: <span className="font-normal">{HC?.DataPet.detalles}</span></Typography>
            </div>
            <div className="w-full flex justify-center items-center sm:w-auto">
              <img className="w-[200px]" src={HC?.DataPet.image} alt="foto mascota"/>
            </div>
          </div>
          <div className="w-full max-sm:border-0 p-5 m-auto my-10 bg-white border-8 max-w-[900px] flex justify-around items-center">
            <div>
              <p className="font-semibold text-vet-blue text-2xl text-left">RESUMEN CLINICO</p>
              <p className="m-1 font-semibold text-vet-blue">Vacunacion</p>
              {HC?.Vacunas.map((element) =>(
                <div>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.Vacuna}</span></p>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.DataVacuna}</span></p>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.fecha}</span></p>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.Certification}</span></p>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.nameAndMatricule}</span></p>
                </div>
              ))}
            </div>
            <div>
            <p className="m-1 font-semibold text-vet-blue">Historia Clinica</p>
              {HC?.Registros.map((element) =>(
                <div>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.Registro}</span></p>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.fecha}</span></p>
                  <p className="m-1 font-semibold"><span className="font-normal">{element.Info}</span></p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
