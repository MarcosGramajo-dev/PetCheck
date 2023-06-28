
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoginState } from '../Context/Context';
import { History } from '../Context/Type';



interface HistoriaClinica {
    
}

const HistoriaClinica: React.FC = () => {
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
          <p>ID: {HC?.id}</p>
          <p>Dueño de la Mascota</p>
          <p>{HC?.ownerPet.NombreDueño}</p>
          <p>{HC?.ownerPet.DNI}</p>
          <p>{HC?.ownerPet.Direccion}</p>
          <p>{HC?.ownerPet.Telefono}</p>
          <p>{HC?.ownerPet.province}</p>
          <p>{HC?.ownerPet.departament}</p>
        </div>
        <div>
          <p>Mascota</p>
          <img src={HC?.DataPet.image} alt="foto mascota"/>
          <p>{HC?.DataPet.NombreMascota}</p>
          <p>{HC?.DataPet.Sexo}</p>
          <p>{HC?.DataPet.Date}</p>
          <p>{HC?.DataPet.Pedigree}</p>
          <p>{HC?.DataPet.Nchip}</p>
          <p>{HC?.DataPet.detalles}</p>
        </div>
        <div>
          <p>Resumen Clinico</p>
          <p>Vacunacion</p>
          {HC?.Vacunas.map((element) =>(
              <div>
                <p>{element.Vacuna}</p>
                <p>{element.DataVacuna}</p>
                <p>{element.fecha}</p>
                <p>{element.Certification}</p>
                <p>{element.nameAndMatricule}</p>
              </div>
          ))}

          {HC?.Registros.map((element) =>(
              <div>
                <p>{element.Registro}</p>
                <p>{element.fecha}</p>
                <p>{element.Info}</p>
              </div>
          ))}
        </div>
      </div>
      <button onClick={() => handleChange()}> Presiona </button>
    </div>
  );
};

export default HistoriaClinica