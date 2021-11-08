import {useParams, useHistory} from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'
import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'

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

    function salvarFilme(){
        const minhaLista = localStorage.getItem("filmes")

        let filmesSalvos = JSON.parse(minhaLista) || []

        //se tiver algum filme salvo com esse mesmo id precis ignorar
        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)
        //true or false
        if(hasFilme){
            toast.error("Você já possui esse filme salvo.")
            return//Para a execução do codigo aqui...
        }

        filmesSalvos.push(filme)
        localStorage.setItem("filmes", JSON.stringify(filmesSalvos))
        toast.success(`Filme salvo com sucesso.`)

    }


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
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.nome} Trailer`} target="_blank">Trailer</a>
                </button>
            </div>
        </div>
    )
}