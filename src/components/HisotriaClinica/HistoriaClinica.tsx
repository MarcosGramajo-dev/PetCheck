
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
        <div>
          <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-10 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex justify-around items-center">
            <div>
              <img className="w-[200px]" src={HC?.DataPet.image} alt="foto mascota"/>
            </div>
            <div>
              <p className="font-semibold text-vet-blue text-2xl text-left">PERFIL DE LA MASCOTA</p>
              <p className="m-1 font-semibold">Nombre: <span className="font-normal">{HC?.DataPet.NombreMascota}</span> </p>
              <p className="m-1 font-semibold">Sexo: <span className="font-normal">{HC?.DataPet.Sexo}</span></p>
              <p className="m-1 font-semibold">Fecha de Nac: <span className="font-normal">{HC?.DataPet.Date}</span></p>
              <p className="m-1 font-semibold">Pedigree: <span className="font-normal">{HC?.DataPet.Pedigree}</span></p>
              <p className="m-1 font-semibold">Nchip: <span className="font-normal">{HC?.DataPet.Nchip}</span></p>
              <p className="m-1 font-semibold">Detalle: <span className="font-normal">{HC?.DataPet.detalles}</span></p>
            </div>
          </div>
          <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-10 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
            <div>
              <p className="font-semibold text-vet-blue text-2xl text-left">PERFIL DEL DUEÑO</p>
              <p className="m-1 font-semibold">Nombre: <span className="font-normal">{HC?.ownerPet.NombreDueño}</span> </p>
              <p className="m-1 font-semibold">DNI: <span className="font-normal">{HC?.ownerPet.DNI}</span></p>
              <p className="m-1 font-semibold">Direccion: <span className="font-normal">{HC?.ownerPet.Direccion}</span></p>
              <p className="m-1 font-semibold">Telefono: <span className="font-normal">{HC?.ownerPet.Telefono}</span></p>
              <p className="m-1 font-semibold">Provincia: <span className="font-normal">{HC?.ownerPet.province}</span></p>
              <p className="m-1 font-semibold">Localidad: <span className="font-normal">{HC?.ownerPet.departament}</span></p>
            </div>
          </div>
          <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-10 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex justify-around items-center">
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
