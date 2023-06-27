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
    <div className="flex justify-center max-sm:w-11/12 max-sm:m-auto">
      <div className="max-sm:w-full max-sm:mx-0 mx-8 relative drop-shadow-lg border-vet-purple-light text-vet-blue rounded-lg mt-10 max-w-sm border-4 border-spacing-40 flex flex-col text-center justify-center items-center bg-white p-4">
        <p className="font-semibold text-lg my-1 ">
          Ingresa el ID de tu libreta
        </p>
        <p className="text-vet-blue text-xs my-1">
          TODA LA INFORMACION DE TU MASCOTA A UN CLICK
        </p>
        <span className=" text-sm text-red-600"> {mensaje} </span>
        <input
          onChange={handleChange}
          value={idLibreta}
          minLength={6}
          placeholder="Ej: 489465"
          className="border-vet-purple border-2 rounded-lg my-2 max-w-[300px] m-auto px-2"
          type="number"
        />
        <Link to={idLibreta.length >= 6 && status ? `historiaClinica?search=${idLibreta}` : ""}>
          <button onClick={()=> verifyId()} className="disabled:opacity-75 w-24 m-auto mx-1 duration-300 text-xs px-4 h-6 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50">
            BUSCAR
          </button>
        </Link>
        <img
          src={Arrow}
          className="absolute right-[-40%] top-[-30%] max-sm:hidden"
        />
      </div>

      <div className="mx-8 w-52 max-sm:hidden drop-shadow-lg border-vet-purple-light text-vet-blue rounded-lg mt-10 border-4 border-spacing-40 flex flex-col justify-center items-center bg-white p-4">
        <p className="text-sm">
          Historia Clinica <br />
          Fechas de Vacunaciones <br />
          Seguimiento <br />
          Desparasitaciones <br />
          Hisotrial de Agresiones <br />
          Listado de alergias <br />
          ¡Y mucho mas!...
        </p>
      </div>
    </div>
  );
}
