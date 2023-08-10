import { useEffect, useState } from 'react'
import Cards from './cards'
import axios from 'axios'
import { UserVet } from '../Context/Type'
import { useLoginState } from '../Context/Context'
import loadingImage from '../../images/loading.gif'

export default function ContainerTarjet(){
    const [cardsDB, setCardsDB] = useState([])
    const [loading, setLoading] = useState(false)

    const login = useLoginState()
    
    useEffect(()=>{
        setLoading(true)
        axios.get(`${login?.authContext.URL}`)
        .then(res =>{console.log(res.data); setCardsDB(res.data)})
        .catch(error => console.log(error))
        .finally(()=> setLoading(false))
    },[])

    return(
        <div className="mt-8">
            <div>
                <p className="text-vet-blue font-semibold text-center text-2xl max-sm:text-lg">VETERINARIAS COMPROMETIDAS</p>
            </div>
            { !loading && <div className="my-10 flex flex-wrap justify-around">

                {
                    cardsDB.map((element, index)=>(
                        <Cards infoCard={element} key={index}/>
                    ))
                }

            </div> }
            {
                loading && <div> <img className="w-[150px] my-[120px] mx-auto" src={loadingImage} alt="loading..."/> </div>
            }
        </div>
    )
}