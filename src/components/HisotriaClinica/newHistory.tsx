import Provincia from "../Register/provincias";
import { useState, FormEvent, JSXElementConstructor } from "react";
import provinciasJSON from "../../provincias.json";
import departamentosJSON from "../../departamentos.json";
import React from "react";
import { dataOwnerPet, dataPet, History, Registros, Vacunas } from "../Context/Type";
import axios from "axios";
import { useLoginState } from "../Context/Context";

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

// interface Data {
//   [key: string]: {
//     [key: string]: string;
//   };
// }

export default function NuevaHistoria() {
  let [imgBase64, setImgBase64] = useState("");

  const [arrayDepart, setArrayDepart] = useState<Depart[]>([]);
  const [Message, setMessage] = useState("")

  const [newHC, setNewHC] = useState<History>({
    Vacunas: [{
      Certification: 0,
      DataVacuna: "",
      Vacuna: "",
      fecha: "",
      nameAndMatricule: ""
    }],
    Registros: [{
      Info: "",
      Registro: "",
      fecha: ""
    }],
    DataPet: {
        image: "",
        NombreMascota: "",
        Especie: "",
        Sexo: "",
        Nchip: 0,
        Pedigree: 0,
        Date: "",
        detalles: ""
    },
    ownerPet: {
        NombreDueño: "",
        DNI: 0,
        Telefono: 0,
        Direccion: "",
        province: "",
        departament: ""
    },
    id: 0  
      });

  const [dataPet, setDataPet] = useState<dataPet>({
    image: "",
    NombreMascota: "",
    Especie: "",
    Sexo: "",
    Nchip: 0,
    Pedigree: 0,
    Date: "",
    detalles: ""
  });

  const [vacunaSelected, setVacunaSelected] = useState("");
  const [dataVacunas, setDataVacunas] = useState<Vacunas>([{
    Certification: 0,
    DataVacuna: "",
    Vacuna: "",
    fecha: "",
    nameAndMatricule: ""
  }]);
  const [booleanVacunas, setBooleanVacunas] = useState(false)

  const [dataOwnerPet, setDataOwnerPet] = useState<dataOwnerPet>({
        NombreDueño: "",
        DNI: 0,
        Telefono: 0,
        Direccion: "",
        province: "",
        departament: ""
  });

  const [registerSelected, setRegisterSelected] = useState("");
  const [dataRegister, setDataRegister] = useState<Registros>([{
      Info: "",
      Registro: "",
      fecha: ""
  }]);

  const [idLibreta, setIdLibreta] = useState(0)

  const login = useLoginState()

  function diaMesAño (){
    const tiempoTranscurrido = Date.now();
  
    const hoy = new Date(tiempoTranscurrido);

    return hoy.toLocaleDateString()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          imgBase64 = base64String;
          setImgBase64(imgBase64);
          setDataPet({ ...dataPet, image: imgBase64 });
        };
      }
    } else if(e.target.name === "IDLibreta"){
      setIdLibreta(parseInt(e.target.value))

    } else {
      setDataOwnerPet({ ...dataOwnerPet, [e.target.name]: e.target.value });
    }
    // setNewHC({...newHC, "Vacunas": {dataVacunas}, "Registros": dataRegister, "DataPet": dataPet, "ownerPet": dataOwnerPet, "id": idLibreta });
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let arrayDepartamentos = departamentosJSON.features.filter(
      (depart) => depart.properties.provincia.id === e.target.value
    );
    setArrayDepart(arrayDepartamentos);
    setDataOwnerPet({
      ...dataOwnerPet,
      province : arrayDepartamentos[0].properties.provincia.nombre,
    });
    console.log("province" + ":" + e.target.value)
  };
  

  const selectDepart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let departSelect = arrayDepart.filter(
      (departSelected) => departSelected.properties.id === e.target.value
    );

    setDataOwnerPet({
      ...dataOwnerPet,
      departament: departSelect[0].properties.nombre,
    });

  };

const handleChangePet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPet({ ...dataPet, [e.target.name]: e.target.value });
    // setNewHC({...newHC, "Vacunas": [dataVacunas], "Registros": [dataRegister], "DataPet": dataPet, "ownerPet": dataOwnerPet, "id": idLibreta });
  };

  // const handleChangeVacunas = (
  //   e:
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (e.target.type == "select-one") {
  //     setVacunaSelected(e.target.value);

  //   } else {
  //     setDataVacunas({
  //         ...dataVacunas,
  //         "Vacuna" : vacunaSelected,
  //         "fecha": diaMesAño(),
  //         [e.target.name]: e.target.value,
  //     });
  //   }
  //   // setNewHC({...newHC, "Vacunas": [dataVacunas], "Registros": [dataRegister], "DataPet": dataPet, "ownerPet": dataOwnerPet, "id": idLibreta });
  //   // console.log(booleanVacunas)
  // };

  // const handleChangeVacunas = (
  //   e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (e.target.type === "select-one") {
  //     setVacunaSelected(e.target.value);
  //   } else {
  //     setDataVacunas((prevDataVacunas) => ({
  //       ...prevDataVacunas,
  //       Vacuna: vacunaSelected,
  //       fecha: diaMesAño(),
  //       [e.target.name]: e.target.value,
  //     }));
  //   }
  // };

  // const handleChangeRegister = (
  //   e:
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   if (e.target.type == "select-one") {
  //     setRegisterSelected(e.target.value);
  //   } else {
  //     setDataRegister({
  //         ...dataRegister,
  //         "Registro": registerSelected,
  //         "fecha": diaMesAño(),
  //         "Info": e.target.value,
  //     });
  //   }
  //   // setNewHC({...newHC, "Vacunas": [dataVacunas], "Registros": [dataRegister], "DataPet": dataPet, "ownerPet": dataOwnerPet, "id": idLibreta });
  // };

  // const submit = (e: FormEvent<HTMLFormElement>) => {
  //   setNewHC({...newHC, "Vacuna": [dataVacunas], "Registro": dataRegister, "DataPet": dataPet, "ownerPet": dataOwnerPet, "id": idLibreta });
  //   e.preventDefault();
  //   axios.post(`${login?.authContext.URL}auth/newHistory`, newHC)
  //   .then((res)=> console.log(res))
  //   .then(err => console.log(err))

  //   console.log(newHC);
  // };

  const handleChangeVacunas = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "select-one") {
      setVacunaSelected(e.target.value);
    } else {
      setDataVacunas((dataVacunas) => ({
        ...dataVacunas,
            Vacuna: vacunaSelected,
            fecha: diaMesAño(),
            [e.target.name]: e.target.value
      }));
    }
  };
  
  const handleChangeRegister = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.type === "select-one") {
      setRegisterSelected(e.target.value);
    } else {
      setDataRegister((dataRegister) => ({
        ...dataRegister,
        Registro: registerSelected,
        fecha: diaMesAño(),
        Info: e.target.value
      }));
    }
  };
  
  const submit = (e: FormEvent<HTMLFormElement>) => {
    const newHC: History = {
      Vacunas: dataVacunas,
      Registros: dataRegister,
      DataPet: dataPet,
      ownerPet: dataOwnerPet,
      id: idLibreta,
    };
  
    setNewHC(newHC);
  
    e.preventDefault();
  
    axios
      .post(`${login?.authContext.URL}auth/newHistory`, newHC)
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage(err.response.data));
  
    console.log(newHC);
  };

  const toggleSelectedVacuna = () => {
    if(vacunaSelected != "") {
    return(
      <div>        
      <input
        id="dataVacunasNewHC"
        onChange={handleChangeVacunas}
        name="DataVacuna"
        type="text"
        className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
        placeholder="Detalle la Vacuna"
      />
      <input
        id="certificationNewHC"
        onChange={handleChangeVacunas}
        name="Certification"
        type="number"
        className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
        placeholder="N° de Certificacion"
      />
      <input
        id="nameAndMatriculeNewHC"
        onChange={handleChangeVacunas}
        name="nameAndMatricule"
        type="text"
        className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
        placeholder="Nombre y Matricula del Doctor"
      />
    </div>
  )
} else {
  return <></>
}
}

const toggleSelectedRegister = () => {
if(registerSelected != ""){
  return (
    <div>
      <textarea
        id="textAreaNewHC"
        onChange={handleChangeRegister}
        name=""
        cols={40}
        rows={10}
        className="p-1 border-2 border-vet-purple-light"
      ></textarea>
    </div>
  )
} else {
  return <></>
}
}

return (
<div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
  <div className="w-full m-auto flex flex-col justify-center">
    <p className="text-center text-vet-purple text-xl my-5">
      NUEVA HISTORIA CLINICA
    </p>
    <form className="flex justify-center flex-col" onSubmit={submit}>
      <div className="h-[120px] flex justify-left items-center flex-col">
          <label
          htmlFor="imgInput"
          className="text-center cursor-pointer w-full border-dashed border-2 border-vet-purple px-2 py-6"
        >
          Foto de la mascota
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          name="img"
          onChange={handleChange}
        />
        <input
          id="idLibretaNewHC"
          type="number"
          onChange={handleChange}
          name="IDLibreta"
          className="m-1 my-4 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="ID de la Libreta"
        />
      </div>
      <p className="my-2">DATOS DEL PROPIETARIO</p>
      <div className="flex flex-wrap justify-around border-b-2 border-vet-purple py-2 border-dashed">
        <input
          onChange={handleChange}
          name="NombreDueño"
          type="text"
          id="NombreNewHC"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Nombre"
        />
        <input
          onChange={handleChange}
          name="DNI"
          type="number"
          id="DNINewHC"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="D.N.I"
        />
        <input
          onChange={handleChange}
          name="Telefono"
          type="number"
          id="telefonoNewHC"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Telefono"
        />
        <input
          onChange={handleChange}
          name="Direccion"
          type="text"
          id="direccionNewHC"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Direccion"
        />
        <div className="flex flex-wrap justify-between min-w-[200px] max-[500px]:w-full w-auto">
          <select
            id="provinciaNewHC"
            required
            className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
            onChange={selectChange}
          >
            <option value=""> Selecciona una Provincia </option>
            {provinciasJSON?.features.map((option) => (
              <option
                key={option.properties.id}
                value={option.properties.id}
              >
                {option.properties.nombre}
              </option>
            ))}
          </select>

          <select
            id="departamentNewHC"
            className="my-3 mx-3 w-[200px] max-[500px]:w-full border-b-2 border-vet-purple-light"
            required
            onChange={selectDepart}
          >
            <option value="">Seleccione su Localidad</option>
            {arrayDepart?.map((element) => (
              <option
                key={element.properties.id}
                value={element.properties.id}
              >
                {element.properties.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="py-2">DATOS DE LA MASCOTA</p>
      <div className="flex flex-wrap justify-around border-b-2 border-vet-purple py-2 border-dashed">
        <input
          id="nombreMascotaNewHC"
          onChange={handleChangePet}          
          type="text"
          name="NombreMascota"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Nombre"
        />
        <input
          id="especieNewHC"
          onChange={handleChangePet}
          type="text"
          name="Especie"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Especie"
        />
        <input
          id="sexoNewHC"
          onChange={handleChangePet}
          type="text"
          name="Sexo"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Sexo"
        />
        <input
          id="NchipNewHC"
          onChange={handleChangePet}
          type="number"
          name="Nchip"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="N° Chip"
        />
        <input
          id="pedigreeNewHC"
          onChange={handleChangePet}
          type="number"
          name="Pedigree"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Registro Pedigree"
        />
        <input
          id="dateNewHC"
          onChange={handleChangePet}
          type="date"
          name="Date"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Fecha de nacimiento"
        />
        <input
          id="detallesNewHC"
          onChange={handleChangePet}
          type="text"
          name="detalles"
          className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          placeholder="Marcas Particulares"
        />
      </div>

      <div className="flex flex-col justify-around border-b-2 border-vet-purple py-2 border-dashed">
        <p>VACUNAS</p>
        <div className=" w-3/4 m-auto flex flex-wrap justify-around">
          <select
            id="vacunasNewHC"
            onChange={handleChangeVacunas}
            className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          >
            <option value="">Selecciona el tipo de Vacuna</option>
            <option value="VacunaAntirrabica">Vacuna Antirrabica</option>
            <option value="QuintupleFelina">Quintuple Felina</option>
          </select>
          {toggleSelectedVacuna()}
        </div>
      </div>

      <div className="flex flex-col justify-around border-b-2 border-vet-purple p-2 border-dashed">
        <p>REGISTRO</p>
        <div className=" w-3/4 m-auto flex flex-col justify-center items-center">
          <select
            id="RegistroNewHC"
            onChange={handleChangeRegister}
            className="m-1 my-2 max-sm:w-full w-[250px] font-semibold border-b-2 border-vet-purple-light"
          >
            <option value="">Selecciona el tipo de Registro</option>
            <option value="Agresiones">Agresiones</option>
            <option value="EnfermedadesCronicas">
              Enfermedades Cronicas
            </option>
            <option value="Lesiones">Lesiones</option>
          </select>
          {toggleSelectedRegister()}
        </div>
      </div>
              <p id="messageNewHC" >{Message}</p>
      <div className="flex justify-center">
        <button id="SubmitNewHC" className="min-w-[120px] my-3 m-auto duration-300 text-lg px-4 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50 max-sm:hidden">
          {" "}
          Crear Nueva Historia Clinica{" "}
        </button>
      </div>
    </form>
  </div>
</div>
);
}