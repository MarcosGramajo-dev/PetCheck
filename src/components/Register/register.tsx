import React, { Attributes, ChangeEvent, FormEvent, useState } from "react";
import provinciasJSON from "../../provincias.json";
import Provincias from "./provincias";
import departamentosJSON from "../../departamentos.json";
import axios from "axios";
import { UserVet } from "../Context/Type";
import { useLoginState } from "../Context/Context";
import { MultiSelect } from "react-multi-select-component";

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
      const response = await axios.post(
        "http://localhost:4000/auth/registro",
        formDataToSend
      );

      console.log("Solicitud exitosa:", response.data);
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
      console.log({ ...vet });
      setVet({ ...vet, [e.target.name]: e.target.value });
    }
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let arrayDepartamentos = departamentosJSON.features.filter(
      (depart) => depart.properties.provincia.id === e.target.value
    );
    setArrayDepart(arrayDepartamentos);

    setVet({
      ...vet,
      ["province"]: arrayDepartamentos[0].properties.provincia.nombre,
    });
  };

  const selectDepart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let departSelect = arrayDepart.filter(
      (departSelected) => departSelected.properties.id === e.target.value
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
          <p className='text-center text-vet-purple text-xl my-5'>
            REGISTRO DE VETERINARIA
          </p>
          <form
            onSubmit={handleSubmit}
            className='flex justify-center flex-col'>
            <div className={!stateForm ? "hidden" : ""}>
              <p className=' font-[600]'>Datos del Usuario</p>

              <div className='flex justify-between flex-wrap flex-col w-full'>
                <input
                  id='emailRegister'
                  onChange={handleChangeUser}
                  type='email'
                  name='email'
                  className={classNameInput}
                  placeholder='Correo ELectronico'
                />
                <input
                  id='passRegister'
                  onChange={handleChangeUser}
                  name='password'
                  type='password'
                  className='my-1 border-vet-blue border rounded-md w-full px-2 drop-shadow'
                  placeholder='Contraseña'
                />

                <input
                  id='passComparationRegister'
                  onChange={handleChangeUser}
                  name='passwordComparation'
                  type='password'
                  className='my-1 border-vet-blue border rounded-md w-full px-2 drop-shadow'
                  placeholder='Contraseña'
                />
                <div className='my-2 h-4'>
                  <p className='text-red-600'>{messagePass}</p>
                </div>
                <button
                  id='nextRegister'
                  className='my-2 m-auto duration-300 text-lg px-6 py-1 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple'
                  onClick={() =>
                    stateBtnNext
                      ? setStateForm(!stateForm)
                      : setMessagePass("Completa los campos para continuar")
                  }>
                  Siguiente
                </button>
              </div>
            </div>

            <div className={stateForm ? "hidden" : ""}>
              <p className='font-[600]'>Datos de la Veterinaria</p>
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
              <input
                required
                id='nameLocalRegister'
                onChange={handleChange}
                type='text'
                placeholder='Nombre de la Veterinaria'
                name='nameLocal'
                className='my-3 mx-3 border-b-2 border-vet-purple-light w-[95%]'
              />
              <div className='flex justify-between flex-wrap'>
                <input
                  id='ownerVetRegister'
                  required
                  onChange={handleChange}
                  name='ownerVet'
                  type='text'
                  placeholder='Titular de la Veterinaria'
                  className='my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light'
                />
                <input
                  id='numMatriculaRegister'
                  required
                  onChange={handleChange}
                  name='numMatricula'
                  type='number'
                  placeholder='Numero de Matricula'
                  className=' my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                />
              </div>
              <div className='flex justify-between flex-wrap  min-w-[200px] max-[500px]:w-full w-auto'>
                <div className='flex flex-wrap justify-between min-w-[200px] max-[500px]:w-full w-auto'>
                  <select
                    id='provinciatRegister'
                    required
                    className='my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light'
                    onChange={selectChange}>
                    <option value=''> Selecciona una Provincia </option>
                    {provinciasJSON.features.map((option) => (
                      <option
                        key={option.properties.id}
                        value={option.properties.id}
                        id={option.properties.id}>
                        {option.properties.nombre}
                      </option>
                    ))}
                  </select>

                  <select
                    id='departRegister'
                    className='my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light'
                    required
                    onChange={selectDepart}>
                    <option value=''>Seleccione su Localidad</option>
                    {arrayDepart.map((element) => (
                      <option
                        key={element.properties.id}
                        value={element.properties.id}
                        id={element.properties.id}>
                        {element.properties.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                id='direccionRegister'
                required
                onChange={handleChange}
                name='address'
                type='text'
                placeholder='Direccion'
                className='my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
              />
              <div className='flex justify-between flex-wrap'>
                <input
                  id='direccionTel'
                  required
                  onChange={handleChange}
                  name='tel'
                  type='number'
                  placeholder='Numero de Contacto'
                  className='my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                />
                <input
                  id='direccionTelWp'
                  required
                  onChange={handleChange}
                  name='telWp'
                  type='number'
                  placeholder='Numero de WhatsApp'
                  className='my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                />
              </div>
              <div className='my-4'>
                <p className='font-[600]'>¿Que servicios ofrece?</p>
                <div className='flex flex-wrap '>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    // hasSelectAll={false}
                    labelledBy='Selecciona tus servicios'
                    className='w-full'
                  />
                </div>
              </div>
              <p>Redes Sociales</p>
              <div
                className='flex justify-between flex-wrap border-2'
                id='redesSociales'>
                <input
                  id='direccionWeb'
                  onChange={handleChange}
                  name='web'
                  type='text'
                  placeholder='Pagina Web'
                  className='my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                />
                <input
                  id='direccionInstagram'
                  onChange={handleChange}
                  name='instagram'
                  type='text'
                  placeholder='Instagram'
                  className='my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                />
                <input
                  id='direccionFacebook'
                  onChange={handleChange}
                  name='facebook'
                  type='text'
                  placeholder='Facebook'
                  className='my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                />
                <input
                  id='direccionTiktok'
                  onChange={handleChange}
                  name='tiktok'
                  type='text'
                  placeholder='Tiktok'
                  className='my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light'
                />
              </div>
              <div className='flex justify-between flex-wrap'></div>

              <div className='h-4'>
                <p className='text-red-600 text-sm text-center'> {message} </p>
              </div>
              <div className=' flex justify-end'>
                <button
                  className='m-2 duration-300 text-lg px-6 py-1 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple'
                  onClick={() => setStateForm(true)}>
                  Atras{" "}
                </button>
                <button
                  id='submitRegister'
                  type='submit'
                  className='m-2 duration-300 text-lg px-6 py-1 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple'>
                  Registrarse
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
