import provinciasJSON from '../../provincias.json'
import { options } from '../Gestion/gestion';


  
  // Utilizamos el componente en otro componente
  const provincias = (): JSX.Element => {
    // Renderizamos el array de elementos JSX devuelto por MyComponent
    return (
      <select className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light">
        <option value="null"> Selecciona una Provincia </option>
        {provinciasJSON.features.map((option) => (
        <option key={option.properties.id} value={option.properties.nombre}>{option.properties.nombre}</option>
        ))}
      </select>
    );
  };

export default provincias