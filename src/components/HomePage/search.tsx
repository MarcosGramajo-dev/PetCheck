import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Arrow from "../../images/arrow.png";
import { LoginContext, useLoginState } from "../Context/Context";
import Historiaclinica from "../HisotriaClinica/HistoriaClinica";
import { useNavigate } from 'react-router-dom';

import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Select, 
  Option,
  Alert
} from "@material-tailwind/react";



export default function search() {
  const [toggleButton, setToggleButton] = useState(false);
  const [idLibreta, setIdLibreta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState(false);
  const [stateSelect, setStateSelectet] = useState<any>("id");
  
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
      await axios.get(`${login?.authContext.URL}/HistoryClinic/${stateSelect}/${idLibreta}`)
      .then( res => {
        login?.authContext.addHC(res.data)
        setStatus(true)
        navigate("/historiaClinica")
      })
      .catch(error => {
        console.log(error)
        setStatus(false)
      })
  }

  return (
    <div className="w-full max-w-[800px] max-[1100px]:m-auto ">
      <div className="w-full max-w-[500px] m-auto max-sm:m-auto max-sm:my-[20px] border backdrop-blur-sm shadow-2xl text-vet-blue rounded-lg mt-8 flex flex-col z-20 p-4">
        <p className="font-semibold text-xl my-1 text-left ">
          Ingresa el ID de tu libreta
        </p>
        <p className="text-vet-blue text-xs my-1 text-center">
          TODA LA INFORMACION DE TU MASCOTA A UN CLICK
        </p>
        <div className="relative flex w-full max-w-[24rem] mt-4">
          <Menu placement="bottom-start">
              <Select label="Tipo de Codigo" className="rounded-r-none max-w-36" name="type" onChange={(event) => setStateSelectet(event)}>
                <Option value='id'>Numero de Libreta</Option>
                <Option value='dni'>DNI</Option>
                <Option value='nChip'>N° Chip</Option>
              </Select>
          </Menu>
          <Input
          onChange={handleChange}
          value={idLibreta}
          type="number"
          placeholder="Ingresa su codigo"
          className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
          min="0"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        />
      </div>
        
      <div className="flex justify-end items-center h-16">
        { mensaje != '' ? <Alert className="rounded-none border-l-4 border-[#c92e3b] bg-[#c92e3b]/10 font-medium text-[#c92e3b]"> {mensaje} </Alert> : null}
          <Link to={idLibreta.length >= 6 && status ? `historiaClinica?search=${idLibreta}` : ""} className="text-right">
          {/* className="disabled:opacity-75 m-auto mx-1 duration-300 px-6 h-8 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50" */}

            <Button onClick={()=> verifyId()} className="bg-vet-blue hover:bg-vet-blue/50" >
              BUSCAR
            </Button>
          </Link>
      </div>
      </div>
    </div>
  );
}

{/* <div className="text-center">
  <select onChange={(event) => setStateSelectet(event.target.value)} name="type" className="border-vet-purple border my-2 m-auto px-2 h-8">
    <option value="id">ID</option>
    <option value="dni">DNI</option>
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
</div> */}
