import React, { Attributes, ChangeEvent, FormEvent, useState } from "react";
import provinciasJSON from "../../provincias.json";
import Provincias from "./provincias";
import departamentosJSON from "../../departamentos.json";
import axios from "axios";
import { UserVet } from "../Context/Type";
import { useLoginState } from "../Context/Context";
import { MultiSelect } from "react-multi-select-component";

import { useNavigate  } from "react-router-dom";

import {
  Input,
  Button,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react'

interface CheckboxState {
  label: string;
  value: string;
}

interface Depart {
  properties: {
    nombre: string;
    id: string;
    provincia: {
      nombre: string;
      id: string;
    };
  };
}

export default function Register() {
  const navigate = useNavigate();
  const [stateForm, setStateForm] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordComparation: "",
  });
  const options = [
    { label: "Baño y corte", value: "Baño y corte" },
    { label: "Guarderia", value: "Guarderia" },
    { label: "Cirugias", value: "Cirugias" },
    { label: "Venta", value: "Venta" },
    { label: "Consulta", value: "Consulta" },
    { label: "Hospedaje", value: "Hospedaje" },
    { label: "Estetica", value: "Estetica" },
  ];
  const [selected, setSelected] = useState([]);
  const [vet, setVet] = useState({
    address: "",
    departament: "",
    nameLocal: "",
    numMatricula: "",
    ownerVet: "",
    province: "",
    service: [],
    tel: "",
    telWp: "",
    redesSociales: {
      web: "",
      facebook: "",
      instagram: "",
      tiktok: "",
    },
  });
  const [newUser, setNewUser] = useState({});
  let [imgBase64, setImgBase64] = useState("");
  const [arrayDepart, setArrayDepart] = useState<Depart[]>([]);
  const [message, setMessage] = useState("");
  const [messagePass, setMessagePass] = useState("");
  const [stateBtnNext, setStateBtnNext] = useState(false);
  const [classNameInput, setClassNameInput] = useState(
    "my-1 border-vet-blue border rounded-md w-full px-2 drop-shadow"
  );
  const [stateEmail, setStateEmail] = useState(false);
  const [statePass, setStatePass] = useState(false);
  const [file, setFile] = useState<File>();

  const [isDisabled, setIsDisabled] = useState(false)

  const login = useLoginState();
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (file) {
      formDataToSend.append("image", file);
    }
    if (selected) {
      vet.service = [...selected];
    }
    formDataToSend.append("datos", JSON.stringify(vet));
    formDataToSend.append("usuario", JSON.stringify(user));

    Object.entries(vet.redesSociales).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      // Realiza la solicitud POST con Axios
      setIsDisabled(!isDisabled);
      setMessage("Procesando registro...");
      const response = await axios.post(`${login?.authContext.URL}/auth/registro`,
        formDataToSend
      );

      if(response.request.status === 201){
        // console.log(response) 
        setMessage("¡Cuenta creada!");

        setTimeout(() => {
          setMessage("Redireccionando a la pagina Principal");
        }, 2000);

        setTimeout(()=>{
          navigate("/");
        }, 2000)

      }

      // console.log(formDataToSend)
      // console.log(user)
      // console.log(vet)

      // console.log("Solicitud exitosa:", response.data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  //informacion del Usuario, Email y Contraseña
  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(() => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
    // console.log(user)
    setMessagePass("");

    if (e.target.name === "email") {
      if (regexEmail.test(e.target.value)) {
        //console.log("es un email valido")
        setClassNameInput(
          "my-1 border-vet-blue border rounded-md w-full px-2 drop-shadow border-green-600"
        );
      } else {
        setMessagePass("Email Invalido");
        setClassNameInput(
          "my-1 border-vet-blue border rounded-md w-full px-2 drop-shadow border-red-600"
        );
        setStateBtnNext(false);
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 6 && e.target.value.length >= 1) {
        setMessagePass("La contraseña debe tener como minimo 6 caracteres");
        setStateBtnNext(false);
      }
    }
    if (e.target.name === "passwordComparation") {
      if (e.target.value === user.password) {
        setMessagePass("");
        //console.log("Son iguales")
        setStateBtnNext(true);
        //console.log(e.target.classList)
      } else {
        setStateBtnNext(false);
        setMessagePass("Las contraseñas no coinciden");
      }
    }
  };

  //Informacion de la Vet, Datos, fotos, horarios y especialidades
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "direccionWeb") {
      let copia = structuredClone(vet);
      copia.redesSociales.web = e.target.value;
      setVet(copia);
    } else if (e.target.id === "direccionInstagram") {
      let copia = structuredClone(vet);
      copia.redesSociales.instagram = e.target.value;
      setVet(copia);
    } else if (e.target.id === "direccionFacebook") {
      let copia = structuredClone(vet);
      copia.redesSociales.facebook = e.target.value;
      setVet(copia);
    } else if (e.target.id === "direccionTiktok") {
      let copia = structuredClone(vet);
      copia.redesSociales.tiktok = e.target.value;
      setVet(copia);
    } else {
      // console.log({ ...vet });
      setVet({ ...vet, [e.target.name]: e.target.value });
    }
    // console.log(vet)
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  const selectChange = (e:any) => {
    let arrayDepartamentos = departamentosJSON.features.filter(
      (depart) => depart.properties.provincia.id === e
    );
    setArrayDepart(arrayDepartamentos);

    setVet({
      ...vet,
      ["province"]: arrayDepartamentos[0].properties.provincia.nombre,
    });
  };

  const selectDepart = (e: any) => {
    let departSelect = arrayDepart.filter(
      (departSelected) => departSelected.properties.id === e
    );

    setVet({
      ...vet,
      ["departament"]: departSelect[0].properties.nombre,
    });
  };

  return (
    <div className='w-full h-full flex justify-center items-center '>
      <div className='max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-40 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center'>
        <div className='max-w-[500px] m-auto w-full'>
          <Typography variant="h4" className="text-center text-vet-blue my-3">
            REGISTRO DE VETERINARIA
          </Typography>
          <form
            onSubmit={handleSubmit}
            className='flex justify-center flex-col'>
            <div className={!stateForm ? "hidden" : ""}>
              <Typography variant="h5">
                Datos del Usuario
              </Typography>

              <div className='flex justify-between flex-wrap flex-col w-full gap-3'>
                <Input
                  id='emailRegister'
                  onChange={handleChangeUser}
                  type='email'
                  name='email'
                  className={classNameInput}
                  label='Correo ELectronico'
                />
                <Input
                  id='passRegister'
                  onChange={handleChangeUser}
                  name='password'
                  type='password'
                  className='my-1 border-vet-blue border rounded-md w-full px-2 drop-shadow'
                  label='Contraseña'
                />

                <Input
                  id='passComparationRegister'
                  onChange={handleChangeUser}
                  name='passwordComparation'
                  type='password'
                  className='my-1 border-vet-blue border rounded-md w-full px-2 drop-shadow'
                  label='Contraseña'
                />
                <div className='my-2 h-4'>
                  <p className='text-red-600'>{messagePass}</p>
                </div>
                <Button
                  id='nextRegister'
                  // className='my-2 m-auto duration-300 text-lg px-6 py-1 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple'
                  variant="outlined"
                  className="border border-vet-purple text-vet-purple"
                  onClick={() =>
                    stateBtnNext
                      ? setStateForm(!stateForm)
                      : setMessagePass("Completa los campos para continuar")
                  }>
                  Siguiente
                </Button>
              </div>
            </div>

            <div className={stateForm ? "hidden" : ""}>
              <Typography variant="h6">Datos de la Veterinaria</Typography>
              <div
                className='h-[100px] flex justify-left items-center'
                onChange={handleImageChange}>
                <input type='file' id='img' className='hidden' />
                <label
                  htmlFor='img'
                  className='text-center cursor-pointer w-full border-dashed border-2 border-vet-purple px-2 py-6'>
                  {" "}
                  Foto del Local{" "}
                </label>
              </div>
              <div className="my-3">
                <Input
                  required
                  id='nameLocalRegister'
                  onChange={handleChange}
                  type='text'
                  label='Nombre de la Veterinaria'
                  name='nameLocal'
                  // className='my-3 mx-3 border-b-2 border-vet-purple-light w-[95%]'
                />
              </div>
              <div className='flex justify-between flex-wrap'>
                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                  id='ownerVetRegister'
                  required
                  onChange={handleChange}
                  name='ownerVet'
                  type='text'
                  label='Titular de la Veterinaria'
                  // className='my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light'
                  />
                </div>
                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                    id='numMatriculaRegister'
                    required
                    onChange={handleChange}
                    name='numMatricula'
                    type='number'
                    min="0"
                    label='Numero de Matricula'
                    // className=' my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                  />
                </div>
              </div>

              <div className='flex justify-between flex-wrap my-3'>
                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Select
                    id='provinciatRegister'
                    label="Selecciona una Provincia"
                    onChange={(event) => selectChange(event)}>
                    {provinciasJSON.features.map((option) => (
                      <Option
                        key={option.properties.id}
                        value={option.properties.id}
                        id={option.properties.id}>
                        {option.properties.nombre}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Select
                    id='departRegister'
                    label="Seleccione su Localidad"
                    onChange={(event) => selectDepart(event)}
                    >
                    {arrayDepart.map((element) => (
                      <Option
                        key={element.properties.id}
                        value={element.properties.id}
                        id={element.properties.id}>
                        {element.properties.nombre}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="my-3">
                <Input
                  id='direccionRegister'
                  required
                  onChange={handleChange}
                  name='address'
                  type='text'
                  label='Direccion'
                />
              </div>
              <div className='flex justify-between flex-wrap gap-3'>
                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                    id='direccionTel'
                    required
                    onChange={handleChange}
                    name='tel'
                    type='number'
                    min="0"
                    label='Numero de Contacto'
                  />
                </div>
                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                    id='direccionTelWp'
                    required
                    onChange={handleChange}
                    name='telWp'
                    type='number'
                    min="0"
                    label='Numero de WhatsApp'
                  />
                </div>
              </div>

              <div className='my-4'>
                <Typography variant="h6">¿Que servicios ofrece?</Typography>
                <div className='flex flex-wrap '>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy='Selecciona tus servicios'
                    className='w-full'
                  />
                </div>
              </div>

              <Typography variant="h6">Redes Sociales</Typography>
              <div
                className='flex justify-between flex-wrap gap-3'
                id='redesSociales'>

                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                    id='direccionWeb'
                    onChange={handleChange}
                    name='web'
                    type='text'
                    placeholder='Pagina Web'
                  />
                </div>
                  <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                    id='direccionInstagram'
                    onChange={handleChange}
                    name='instagram'
                    type='text'
                    placeholder='Instagram'
                  />
                </div>
                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                    id='direccionFacebook'
                    onChange={handleChange}
                    name='facebook'
                    type='text'
                    placeholder='Facebook'
                  />
                </div>
                <div className="w-full mb-3 md:w-auto md:m-0 ">
                  <Input
                    id='direccionTiktok'
                    onChange={handleChange}
                    name='tiktok'
                    type='text'
                    placeholder='Tiktok'
                  />
                </div>
              </div>
              <div className='flex justify-between flex-wrap'></div>
              <div className=' flex justify-between items-center mt-3'>
                
                <div>
                  <Typography className='text-red-600'> {message} </Typography>
                </div>
                <div className="flex gap-3">
                  <div>
                    <Button
                      onClick={() => setStateForm(true)}
                      variant="outlined"
                      >
                      Atras
                    </Button>
                  </div>
                  <div>
                    <Button
                      id='submitRegister'
                      type='submit'
                      className="bg-vet-purple"
                      disabled= {isDisabled}
                      >
                      Registrarse
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
