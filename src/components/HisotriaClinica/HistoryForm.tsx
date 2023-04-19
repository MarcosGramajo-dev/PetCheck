import { useState } from "react";

interface PatientData {
  consultation: string[];
  allergies: string[];
  surgicalHistory: string[];
  vaccinationCalendar: string[];
  chronicDiseases: string[];
  deworming: string;
  breed: string;
  age: number;
  weight: number;
  ownerName: string[];
}

const initialData: PatientData = {
  consultation:[],
  allergies: [],
  surgicalHistory: [],
  vaccinationCalendar: [],
  chronicDiseases: [],
  deworming: "",
  breed: "",
  age: 0,
  weight: 0,
  ownerName: [],
};

const HistoryForm = () => {
  const [data, setData] = useState<PatientData>(initialData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PatientData
  ) => {
    setData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: keyof PatientData
  ) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setData((prevState) => ({
      ...prevState,
      [field]: selectedOptions,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // se deberian guardar en un futuro en la base de datos
    console.log(data);
    setData(initialData);
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
        <div className="max-w-[500px] m-auto">
        <p className="text-center text-vet-purple text-xl my-5">HISTORIA CLINICA</p>
    <form className="flex justify-center flex-col" onSubmit={handleSubmit}>

    <input
          type="text"
          placeholder="Motivo de su consulta"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          value={data.consultation}
          onChange={(e) => handleInputChange(e, "consultation")}
        />

        <input
          type="text"
          placeholder="Raza de su mascota"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          value={data.breed}
          onChange={(e) => handleInputChange(e, "breed")}
        />
      
      <label>
        Edad
        <input
          type="number"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          value={data.age}
          onChange={(e) =>
            setData((prevState) => ({
              ...prevState,
              age: parseInt(e.target.value),
            }))
          }
        />
      </label>
      <label>
        Peso: 
        <input
          type="number"
          value={data.weight}
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          onChange={(e) =>
            setData((prevState) => ({
              ...prevState,
              weight: parseInt(e.target.value),
            }))
          }
        />
      </label>
     
        <input
          type="text"
          placeholder="Nombre del Dueño:"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          value={data.ownerName}
          onChange={(e) => handleInputChange(e, "ownerName")}
          
        />
      
      
        <input
          type="text"
          placeholder="Alergias:"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          value={data.allergies}
          onChange={(e) => handleInputChange(e, "allergies")}
        />
      
      
        <input
          type="text"
          placeholder="Antecedentes Quirurgicos:"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          value={data.surgicalHistory}
          onChange={(e) => handleInputChange(e, "surgicalHistory")}
        />
      
      <label>
        Calendario de vacunación:
        <select
          multiple
          value={data.vaccinationCalendar}
          onChange={(e) => handleSelectChange(e, "vaccinationCalendar")}
        >
          <option value="Vacuna1">Vacuna 1</option>
          <option value="Vacuna2">Vacuna 2</option>
          <option value="Vacuna3">Vacuna 3</option>
        </select>
      </label>
      
        <input
          type="text"
          placeholder="Enfermedades Cronicas:"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          value={data.chronicDiseases}
          onChange={(e) => handleInputChange(e, "chronicDiseases")}
        />
    
      
        <input
          placeholder="Desparacitacion:"
          className="my-3 mx-3 border-b-2 border-vet-purple-light"
          type="text"
          value={data.deworming}
          onChange={(e) => handleInputChange(e, "deworming")}
        />
      

      <button type="submit" className="my-2 m-auto duration-300 text-lg px-6 py-1 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple">Enviar</button>
    </form>
    </div>
    </div>
    </div>
  );
};

export default HistoryForm;