
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoginState } from '../Context/Context';
import { History } from '../Context/Type';



interface HistoriaClinica {
    
}

const HistoriaClinica: React.FC = () => {
  const [historiaClinica, setHistoriaClinica] = useState({});
  const [localHC, setLocalHC] = useState<History>({
    Vacunas: [{}],
    Registros: [{}],
    DataPet: {},
    ownerPet: {},
    id: 0
  })

  const login = useLoginState()



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
        <p>id: {login?.authContext.HC.id ? login?.authContext.HC.id : ""}</p>
      </div>
      <button onClick={() => handleChange()}> Presiona </button>
    </div>
  );
};

export default HistoriaClinica