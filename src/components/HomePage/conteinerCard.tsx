import { useEffect, useState, useRef } from "react";
import Cards from "./cards";
import axios, { AxiosResponse } from "axios";
import { UserVet } from "../Context/Type";
import { useLoginState } from "../Context/Context";
import loadingImage from "../../images/loading.gif";

import Car from "../../images/icons/car.svg";
import Bag from "../../images/icons/bag.svg";
import Emergency from "../../images/icons/emergency.svg";
import Local24 from "../../images/icons/local_24.svg";
import Shower from "../../images/icons/shower.svg";

import {
  Button,

} from '@material-tailwind/react'

import SearchVet from './searchVet'


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
    telCelular : string
    servicios:string[]
  };

  const [cardsDB, setCardsDB] = useState<any[]>([]);
  const cardsDBRef = useRef<undefined | any[]>();

  const [pagination, setPagination] = useState({page: 0, totalPages: 0, totalCount: 0});
  
  const [contentPag, setContentPag] = useState<JSX.Element[]>([])

  const [pageCard, setPageCard] = useState(0)

  const [services, setServices] = useState('')

  const loadData = (pages:number) => {
    setLoading(true);

    

    // console.log(`${login?.authContext.URL}/?servicio=${services}&page=${pages}`)

    axios
      .get(`${login?.authContext.URL}/?servicio=${services}&page=${pages}`)
      .then((res) => {
          const datos = res.data.data.map((veterinaria: tarjetas) => ({
          email: veterinaria.email,
          nombreVeterinaria: veterinaria.nombreVeterinaria || "",
          telCelular: veterinaria.telCelular  || "",
          direccion: veterinaria.direccion || "",
          redesSociales: veterinaria.redesSociales || {},
          imagen: veterinaria.imagen || "",
          servicios: veterinaria.servicios || [],
        }));

        setPagination({
          page: parseInt(res.data.page,10),
          totalPages: parseInt(res.data.totalPages,10),
          totalCount: parseInt(res.data.totalCount,10),
        })

        //const updatedCardsDB = [...cardsDB, ...datos];
        const updatedCardsDB = [...datos];
        setCardsDB(updatedCardsDB);
        // console.log(updatedCardsDB);
        cardsDBRef.current = updatedCardsDB;
      })
      .catch((error) => {
        console.error("Error en la llamada a la API:", error);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadData(pageCard);

  }, [services]);

  useEffect(() => {
    if (cardsDBRef.current !== undefined) {
      // console.log("cardsDB actualizado:", cardsDBRef.current);
    }
    paginationCreate()
  }, [cardsDBRef.current]);

  const paginationCreate = () => {
    const tempContentPag: JSX.Element[] = [];

    for (let index = pagination.page - 2; index <= pagination.totalPages + 2 || index <= 5 ; index++) {
      if(index > 0 && index <= pagination.totalPages){
        tempContentPag.push(
          <button
            onClick={() => {setPageCard(index); loadData(index); paginationCreate()}}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full ${
              pagination.page === index
                ? 'bg-vet-purple-dark text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                : 'text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20'
            } disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
            key={index}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {index}
            </span>
          </button>
        );
      }
    }

    setContentPag(tempContentPag);
  }

  return (
    <div className='mt-8'>
      <div>
        <p className='text-vet-blue font-semibold text-center text-2xl max-sm:text-lg'>
          VETERINARIAS COMPROMETIDAS
        </p>
      </div>

      {/* <SearchVet/> */}

      <div className="flex flex-wrap justify-around mt-4 text-white">
          <Button onClick={()=> setServices('Consulta')} className="flex flex-wrap items-center justify-center mt-8 text-white bg-light-blue-300 mx-2">
              <span> <img src={Car} alt="car"/> </span>
              <span className="mx-2 hidden md:block" >Consulta</span>
          </Button>
          <Button onClick={()=> setServices('Venta')} className="flex flex-wrap items-center justify-center mt-8 text-white bg-orange-400 mx-2">
              <span> <img src={Bag} alt="car"/> </span>
              <span className="mx-2 hidden md:block" >Venta</span>
          </Button>
          <Button onClick={()=> setServices('Consulta')} className="flex flex-wrap items-center justify-center mt-8 text-white bg-red-400 mx-2">
              <span> <img src={Emergency} alt="car"/> </span>
              <span className="mx-2 hidden md:block" >Cirugias</span>
          </Button>
          <Button onClick={()=> setServices('Hospedaje')} className="flex flex-wrap items-center justify-center mt-8 text-white bg-green-400 mx-2">
              <span> <img src={Local24} alt="car"/> </span>
              <span className="mx-2 hidden md:block" >Hospedaje</span>
          </Button>
          <Button onClick={()=> setServices('Baño%y%Corte')} className="flex flex-wrap items-center justify-center mt-8 text-white bg-teal-400 mx-2">
              <span> <img src={Shower} alt="car"/> </span>
              <span className="mx-2 hidden md:block" >Baño y Corte</span>
          </Button>
          <Button onClick={()=> setServices('')} className="flex flex-wrap items-center justify-center mt-8 text-white bg-teal-400 mx-2">
              <span> <img src={Shower} alt="car"/> </span>
              <span className="mx-2 hidden md:block" >Quitar filtro</span>
          </Button>
      </div>

      {/* { cardsDB == [] && 
        <div>
          No se encontraron veterinarias
          ${cardsDB}
        </div> } */}
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

      <div className="flex items-center justify-center my-4 gap-4">

        <button
          onClick={() => {setPageCard(pagination.page - 1); loadData(pagination.page - 1); paginationCreate()}}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            aria-hidden="true" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          <span className="hidden md:block"> Anterior </span>
        </button>

        <div className="flex items-center gap-2">
          {contentPag}
        </div>

        <button
          onClick={() => {setPageCard(pagination.page + 1 > pagination.totalPages ? pagination.page + 0 : pagination.page + 1 ); loadData(pagination.page + 1 > pagination.totalPages ? pagination.page + 0 : pagination.page + 1); paginationCreate()}}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          <span className="hidden md:block" >Siguiente</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            aria-hidden="true" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
          </svg>
        </button>
      </div> 
    </div>
  );
}
