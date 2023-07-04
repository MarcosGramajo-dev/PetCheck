import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Arrow from "../../images/arrow.png";
import { LoginContext, useLoginState } from "../Context/Context";
import Historiaclinica from "../HisotriaClinica/HistoriaClinica";
import { useNavigate } from 'react-router-dom';



export default function search() {
  const [toggleButton, setToggleButton] = useState(false);
  const [idLibreta, setIdLibreta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState(false);
  
  const navigate = useNavigate();
  const login = useLoginState()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdLibreta(e.target.value);
    
    if (e.target.value.length >= 6) {
      setMensaje("");
    } else if (e.target.value.length >= 1 && e.target.value.length < 6) {
      setMensaje("El ID debe tener al menos 6 digitos");
    }
  };

  // debemos realizar una consulta al back para verificar que el numero de ID existe
  //si es correcto redireccionamos a "Historiaclinica", sino a la pestaña de "Error" pero con un mensaje mas personalizado "No se encontro la libreta"
  //la otra opcion es ponele un pequeño modal que salte diciendo que no se encontro

  const verifyId = async () => {
    // consultamos con axios al back, segun la repuesta utilizamos un boolean para manejar la redireccion
    await axios.get(`${login?.authContext.URL}HistoryClinic/${idLibreta}`)
    .then( res => {
      login?.authContext.addHC(res.data)
      setStatus(true)
      navigate("/historiaClinica")
    })
    .catch(error => {
      console.log(error)
      setStatus(false)
    })
  };

  return (
    <div className="w-full max-w-[800px] max-[1100px]:m-auto ">
      <div className="w-full max-w-[500px] m-auto max-sm:mx-5 backdrop-blur-md shadow-2xl text-vet-blue rounded-lg mt-8 flex flex-col z-20 p-4">
        <p className="font-semibold text-xl my-1 text-left ">
          Ingresa el ID de tu libreta
        </p>
        <p className="text-vet-blue text-xs my-1 text-center">
          TODA LA INFORMACION DE TU MASCOTA A UN CLICK
        </p>
        <div className="text-center">
          <select name="type" className="border-vet-purple border my-2 m-auto px-2 h-8">
            <option value="dni">DNI</option>
            <option value="id">ID</option>
            <option value="nChip">N° Chip</option>
          </select>
          <input
            onChange={handleChange}
            value={idLibreta}
            minLength={6}
            placeholder="Ej: 489465"
            className=" border-vet-purple border my-2 max-w-[300px] m-auto px-2 h-8"
            type="number"
          />
        </div>
        <span className=" text-sm text-red-600 text-center h-4"> {mensaje} </span>
        <Link to={idLibreta.length >= 6 && status ? `historiaClinica?search=${idLibreta}` : ""} className="text-right">
          <button onClick={()=> verifyId()} className="disabled:opacity-75 m-auto mx-1 duration-300 px-6 h-8 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">
            BUSCAR
          </button>
        </Link>
      </div>
    </div>
  );
}
