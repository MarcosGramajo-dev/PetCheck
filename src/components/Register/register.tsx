import React, { Attributes, ChangeEvent, FormEvent, useState } from "react";
import provinciasJSON from "../../provincias.json";
import Provincias from "./provincias";
import departamentosJSON from "../../departamentos.json";
import axios from 'axios'

interface CheckboxState {
  value: string;
  isChecked: boolean;
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
  const [user, setUser] = useState({})
  const [vet, setVet] = useState({})
  const [newUser, setNewUser] = useState({});
  const [checkboxes, setCheckboxes] = useState<CheckboxState[]>([
    { value: "Baño y corte", isChecked: false },
    { value: "Guarderia", isChecked: false },
    { value: "Cirugias", isChecked: false },
  ]);
  let [imgBase64, setImgBase64] = useState("");
  const [arrayDepart, setArrayDepart] = useState<Depart[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewUser({['User']: user, ['Vet']: vet})
    sendtoBack();
  };

  const sendtoBack = () =>{
    console.log(newUser)
    axios.post('http://localhost:3000/auth/singUp', newUser).then( res => {
      console.log(res)
    })
  }

  //informacion del Usuario, Email y Contraseña
  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  //Informacion de la Vet, Datos, fotos, horarios y especialidades
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      const { value, checked } = e.target;
      const updatedCheckboxes = checkboxes.map((checkbox) =>
        checkbox.value === value
          ? { ...checkbox, isChecked: checked }
          : checkbox
      );
      setCheckboxes(updatedCheckboxes);
      setVet({ ...vet, service: updatedCheckboxes });
    } else if (e.target.type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Hacer algo con la cadena codificada en base64
          imgBase64 = base64String
          setImgBase64(imgBase64);
          setVet({ ...vet, image: imgBase64 });
        };
      }
    } else {
      setVet({ ...vet, [e.target.name]: e.target.value, service: [] });
    }
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    // console.log(departamentosJSON);

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
    <div className="w-full h-full flex justify-center items-center ">
      <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
        <div className="max-w-[500px] m-auto">
          <p className="text-center text-vet-purple text-xl my-5">
            REGISTRO DE VETERINARIA
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center flex-col"
          >
            <p>Datos del Usuario</p>

            <div className="flex justify-between flex-wrap">
              <input
                onChange={handleChangeUser}
                type="email"
                name="email"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light invalid:border-red-600 valid:border-green-600"
                placeholder="Correo ELectronico"
              />
              <input
                onChange={handleChangeUser}
                name="password"
                type="password"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                placeholder="Contraseña"
              />
            </div>

            <p>Datos de la Veterinaria</p>
            <div
              className="h-[100px] flex justify-left items-center"
              onChange={handleChange}
            >
              <input type="file" id="img" className="hidden" />
              <label
                htmlFor="img"
                className="text-center cursor-pointer w-full border-dashed border-2 border-vet-purple px-2 py-6"
              >
                {" "}
                Foto del Local{" "}
              </label>
            </div>
            {/* <p>Horarios de Atencion</p>
            <div className="flex justify-between flex-wrap items-center">
              <label>Lunes:</label>
              <input
                onChange={handleChange}
                type="number"
                placeholder="Mañana desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Tarde desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
            </div>
            <div className="flex justify-between flex-wrap items-center">
              <label>Martes:</label>
              <input
                onChange={handleChange}
                type="number"
                placeholder="Mañana desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Tarde desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
            </div>
            <div className="flex justify-between flex-wrap items-center">
              <label>Miercoles:</label>
              <input
                onChange={handleChange}
                type="number"
                placeholder="Mañana desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Tarde desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
            </div>
            <div className="flex justify-between flex-wrap items-center">
              <label>Jueves:</label>
              <input
                onChange={handleChange}
                type="number"
                placeholder="Mañana desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Tarde desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
            </div>
            <div className="flex justify-between flex-wrap items-center">
              <label>Viernes:</label>
              <input
                onChange={handleChange}
                type="number"
                placeholder="Mañana desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Tarde desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
            </div>
            <div className="flex justify-between flex-wrap items-center">
              <label>Sabado:</label>
              <input
                onChange={handleChange}
                type="number"
                placeholder="Mañana desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Tarde desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
            </div>
            <div className="flex justify-between flex-wrap items-center">
              <label>Domingo:</label>
              <input
                onChange={handleChange}
                type="number"
                placeholder="Mañana desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Tarde desde"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
              <input
                onChange={handleChange}
                type="number"
                placeholder="Hasta"
                className="my-3 mx-3 border-b-2 border-vet-purple-light w-12 max-sm:mx-1 max-sm:my-1"
              />
            </div> */}

            <input
              required
              type="text"
              placeholder="Nombre de la Veterinaria"
              name="nameLocal"
              className="my-3 mx-3 border-b-2 border-vet-purple-light"
            />
            <div className="flex justify-between flex-wrap">
              <input
                required
                onChange={handleChange}
                name="ownerVet"
                type="text"
                placeholder="Titular de la Veterinaria"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
              />
              <input
                required
                onChange={handleChange}
                name="numMatricula"
                type="number"
                placeholder="Numero de Matricula"
                className=" my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <div className="flex justify-between flex-wrap  min-w-[200px] max-[500px]:w-full w-auto">
              <div className="flex flex-wrap justify-between min-w-[200px] max-[500px]:w-full w-auto">
                <select
                  required
                  className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                  onChange={selectChange}
                >
                  <option value=""> Selecciona una Provincia </option>
                  {provinciasJSON.features.map((option) => (
                    <option
                      key={option.properties.id}
                      value={option.properties.id}
                    >
                      {option.properties.nombre}
                    </option>
                  ))}
                </select>

                <select
                  className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                  required
                  onChange={selectDepart}
                >
                  <option value="">Seleccione su Localidad</option>
                  {arrayDepart.map((element) => (
                    <option
                      key={element.properties.id}
                      value={element.properties.id}
                    >
                      {element.properties.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <input
                required
                onChange={handleChange}
                name="address"
                type="text"
                placeholder="Direccion"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <div className="flex justify-between flex-wrap">
              <input
                required
                onChange={handleChange}
                name="tel"
                type="number"
                placeholder="Numero de Contacto"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
              <input
                required
                onChange={handleChange}
                name="telWp"
                type="number"
                placeholder="Numero de WhatsApp"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <p>Redes Solciales</p>
            <div className="flex justify-between flex-wrap">
              <input
                required
                onChange={handleChange}
                name="web"
                type="text"
                placeholder="Pagina Web"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
              <input
                required
                onChange={handleChange}
                name="instagram"
                type="text"
                placeholder="Instagram"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <div className="flex justify-between flex-wrap">
              <input
                required
                onChange={handleChange}
                name="facebook"
                type="text"
                placeholder="Facebook"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
              <input
                required
                onChange={handleChange}
                name="tiktok"
                type="text"
                placeholder="Tiktok"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <p>Selecciones todos los servicios que brinda</p>
            <div className="flex flex-wrap">
              {checkboxes.map((checkbox) => (
                <label key={checkbox.value} className="mx-2">
                  <input
                    type="checkbox"
                    value={checkbox.value}
                    checked={checkbox.isChecked}
                    onChange={handleChange}
                  />
                  {checkbox.value}
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="my-2 m-auto duration-300 text-lg px-6 py-1 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
