import axios from 'axios'

// https://sujeitoprogramador.com/r-api/?api=filmes/

//Base URL: https://sujeitoprogramador.com (Não muda)

//Todos os filmes: r-api/?api=filmes/

// Filme Unico: r-api/?api=filmes/123 <--

const api = axios.create({
    baseURL: "https://sujeitoprogramador.com"
})
export default api





