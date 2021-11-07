import {useParams, useHistory} from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'
import { useEffect, useState } from 'react'

export default function Filme(){

    const { id } = useParams()
    const history = useHistory()
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`)
            if(response.data.length === 0){
                // tentou acessar com um id que nao existe, navego ele para home
                history.replace("/")
                return
            }
            setFilme(response.data)
            setLoading(false)
        }

        loadFilme()

        return()=>{
            console.log("componente desmontado")
        }

    },[history, id])


    if(loading){
        return(
            <div className="filme-info">
           <h1>Carregando o seu filme...</h1>
        </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={()=>{}}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.nome} Trailer`} target="_blank">Trailer</a>
                </button>
            </div>
        </div>
    )
}