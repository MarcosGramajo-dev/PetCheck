import { Attributes, ChangeEvent, FormEvent, useState } from "react";
import provinciasJSON from "../../provincias.json";
import Provincias from "./provincias";

interface CheckboxState {
  value: string;
  isChecked: boolean;
}

export default function Register() {
  const [newUser, setNewUser] = useState({});
  const [checkboxes, setCheckboxes] = useState<CheckboxState[]>([
    { value: "Baño y corte", isChecked: false },
    { value: "Guarderia", isChecked: false },
    { value: "Cirugias", isChecked: false },
  ]);
  let [imgBase64, setImgBase64] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newUser);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.type === "checkbox") {
      const { value, checked } = e.target;
      const updatedCheckboxes = checkboxes.map((checkbox) =>
        checkbox.value === value
          ? { ...checkbox, isChecked: checked }
          : checkbox
      );
      setCheckboxes(updatedCheckboxes);
      setNewUser({ ...newUser, service: updatedCheckboxes });
    } else if(e.target.type === "file"){
      const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // Hacer algo con la cadena codificada en base64
            imgBase64 = base64String.split(",")[1]
            setImgBase64(imgBase64)
            setNewUser({...newUser, image: imgBase64})
          };
        }
    }
    
    else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value, service: [] });
    }
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
                onChange={handleChange}
                type="email"
                name="email"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                placeholder="Correo ELectronico"
              />
              <input
                onChange={handleChange}
                name="password"
                type="password"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
                placeholder="Contraseña"
              />
            </div>

            <p>Datos de la Veterinaria</p>
            <div className="h-[100px] flex justify-left items-center" onChange={handleChange}>
              <input type="file" id="img" className="hidden" />
              <label
                htmlFor="img"
                className="text-center cursor-pointer w-full border-dashed border-2 border-vet-purple px-2 py-6"
              >
                {" "}
                Foto del Local{" "}
              </label>
            </div>
            <input
              required
              type="text"
              placeholder="Nombre de la Veterinaria"
              className="my-3 mx-3 border-b-2 border-vet-purple-light"
            />
            <div className="flex justify-between flex-wrap">
              <input
                onChange={handleChange}
                name="ownerVet"
                type="text"
                placeholder="Titular de la Veterinaria"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
              />
              <input
                onChange={handleChange}
                name="numMatricula"
                type="number"
                placeholder="Numero de Matricula"
                className=" my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="flex flex-wrap min-w-[200px] max-[500px]:w-full w-auto">
                <select
                  className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
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

                <select className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light">
                  <option value="hola">Seleccione su Localidad</option>
                </select>
              </div>

              <input
                onChange={handleChange}
                name="address"
                type="text"
                placeholder="Direccion"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <div className="flex justify-between flex-wrap">
              <input
                onChange={handleChange}
                name="tel"
                type="number"
                placeholder="Numero de Contacto"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
              <input
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
                onChange={handleChange}
                name="web"
                type="text"
                placeholder="Pagina Web"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
              <input
                onChange={handleChange}
                name="instagram"
                type="text"
                placeholder="Instagram"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
            </div>
            <div className="flex justify-between flex-wrap">
              <input
                onChange={handleChange}
                name="facebook"
                type="text"
                placeholder="Facebook"
                className="my-3 mx-3 min-w-[200px] max-[500px]:w-full w-auto border-b-2 border-vet-purple-light"
              />
              <input
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
                <label key={checkbox.value}>
                  <input
                    type="checkbox"
                    value={checkbox.value}
                    checked={checkbox.isChecked}
                    onChange={handleChange}
                  />
                  {checkbox.value}
                </label>
              ))}

                            {/*                             
                            <div className="flex items-center m-5">
                                <input onChange={handleChange} value={checkbox.value} checked={checkbox.isChecked} name="Guarderia" type="checkbox" id='Baño y Corte'/>
                                <label htmlFor='Baño y Corte' > Baño y Corte </label>
                            </div>
                            <div className="flex items-center m-5">
                                <input onChange={handleChange} value={checkbox.value} checked={checkbox.isChecked} name="Guarderia" type="checkbox" id='Guarderia'/>
                                <label htmlFor='Guarderia' >Guarderia</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input onChange={handleChange} value={checkbox.value} checked={checkbox.isChecked} name="Guarderia" type="checkbox" id="Cirugias" />
                                <label htmlFor='Cirugias'>Cirugias</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id="Traslados" />
                                <label htmlFor='Traslados'>Traslados</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id="Emergencias" />
                                <label htmlFor='Emergencias' className='cursor-pointer' >Emergencias</label>
                            </div>
                            <div className="flex items-center m-5">
                                <input type="checkbox" id="Atencion de animales exoticos" />
                                <label htmlFor='Atencion de animales exoticos' >Atencion de animales exoticos</label>
                            </div> */}
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
