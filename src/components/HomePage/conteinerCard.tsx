import { useEffect, useState, useRef } from "react";
import Cards from "./cards";
import axios, { AxiosResponse } from "axios";
import { UserVet } from "../Context/Type";
import { useLoginState } from "../Context/Context";
import loadingImage from "../../images/loading.gif";

export default function ContainerTarjet() {
  //   const [cardsDB, setCardsDB] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = useLoginState();

  type redesSociales = {
    webpage: string;
    instagram: string;
    facebook: string;
    tiktok: string;
  };

  type tarjetas = {
    email: string;
    nombreVeterinaria: string;
    direccion: string;
    redesSociales: redesSociales;
    imagen: string;
  };

  const [cardsDB, setCardsDB] = useState<any[]>([]);
  const cardsDBRef = useRef<undefined | any[]>();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${login?.authContext.URL}`)
      .then((res) => {
        const datos = res.data.data.map((veterinaria: tarjetas) => ({
          email: veterinaria.email,
          nombreVeterinaria: veterinaria.nombreVeterinaria || "",
          direccion: veterinaria.direccion || "",
          redesSociales: veterinaria.redesSociales || {},
          imagen: veterinaria.imagen || "",
        }));

        // Utilizar una referencia mutable para almacenar el valor actualizado de cardsDB
        const updatedCardsDB = [...cardsDB, ...datos];

        setCardsDB(updatedCardsDB);
        console.log(updatedCardsDB);
        cardsDBRef.current = updatedCardsDB;
      })
      .catch((error) => {
        console.error("Error en la llamada a la API:", error);
      })
      .finally(() => setLoading(false));
  }, []); // El array vacío [] asegura que useEffect se ejecute solo una vez al montar el componente

  useEffect(() => {
    // Este código se ejecutará cada vez que cardsDB se actualice, excepto en la primera renderización
    if (cardsDBRef.current !== undefined) {
      console.log("cardsDB actualizado:", cardsDBRef.current);

      // Puedes realizar más operaciones aquí si es necesario
    }
  }, [cardsDBRef.current]); // Dependencia cardsDBRef.current en lugar de cardsDB

  return (
    <div className='mt-8'>
      <div>
        <p className='text-vet-blue font-semibold text-center text-2xl max-sm:text-lg'>
          VETERINARIAS COMPROMETIDAS
        </p>
      </div>
      {!loading && (
        <div className='my-10 flex flex-wrap justify-around'>
          {cardsDB.map((element, index) => (
            <Cards infoCard={element} key={index} />
          ))}
        </div>
      )}
      {loading && (
        <div>
          {" "}
          <img
            className='w-[150px] my-[120px] mx-auto'
            src={loadingImage}
            alt='loading...'
          />{" "}
        </div>
      )}
    </div>
  );
}
