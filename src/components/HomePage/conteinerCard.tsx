import { useEffect, useState } from 'react'
import Card from './card'
import axios from 'axios'
import { UserVet } from '../Context/Type'

export default function ContainerTarjet(){
    const [cardsDB, setCardsDB] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get('https://backpetcheck2.onrender.com/')
        .then(res => setCardsDB(res.data))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false))
    },[])

    return(
        <div className="mt-8">
            <div>
                <p className="text-vet-blue font-semibold text-center text-2xl max-sm:text-lg">VETERINARIAS EN SAN MIGUEL DE TUCUMAN</p>
            </div>
            { !loading && <div className="my-10 flex flex-wrap justify-around">

                {
                    cardsDB.map((element, index)=>(
                        <Card infoCard={element} key={index}/>
                    ))
                }

            </div> }
            {
                loading && <div> loading... </div>
            }
        </div>
    )
}