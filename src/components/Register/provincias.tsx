import { useState } from 'react';
import provinciasJSON from '../../provincias.json'
import departamentosJSON from '../../departamentos.json'

  
function provincias(){
  // let value:string;
  
    // const [selectedOption, setSelectedOption] = useState('');
    // const [departamentosFiltrados, setDepartamentosFiltrados] = useState([]);
  
    function handleChange () {
      // const { value } = event.target;
      // setSelectedOption(value);
      // console.log(value);

      // const departamentosFiltrados = handleDepartaments(value);
      // setDepartamentosFiltrados(departamentosFiltrados);
    }

    // function handleDepartaments(value:any){
    //   const filteredDepartaments = departamentosJSON.features.filter( departament => departament.properties.provincia.id === value );
    //   console.log(filteredDepartaments);
    //   return filteredDepartaments;
    // }

    // console.log(departamentosFiltrados)

    return (
      <div className='flex flex-wrap min-w-[200px] max-[500px]:w-full w-auto'>
        <select className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light" onChange={handleChange}>
          <option value=""> Selecciona una Provincia </option>
          {provinciasJSON.features.map((option) => (
          <option key={option.properties.id} value={option.properties.id}>{option.properties.nombre}</option>
          ))}
        </select>

        <select className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light">
            <option value="hola">Seleccione su Localidad</option>
        </select>
      </div>
    );
  };

export default provincias