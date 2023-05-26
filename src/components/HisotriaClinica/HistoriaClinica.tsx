
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface HistoriaClinica {
    
}

const HistoriaClinica: React.FC = () => {
  const [historiaClinica, setHistoriaClinica] = useState<HistoriaClinica>({
    // Inicializar la historia clínica con los valores predeterminados o vacíos
  });

  const [searchParams] = useSearchParams()
  console.log(searchParams.get('search'))

  useEffect(() => {
    // Lógica adicional que se ejecuta después de que el componente se monta o actualiza
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lógica para manejar los cambios en los campos de entrada
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para enviar la historia clínica o realizar otras operaciones
  };

  return (
    <div>
      {/* Estructura del JSX para la representación visual de la historia clínica */}
    </div>
  );
};

export default HistoriaClinica