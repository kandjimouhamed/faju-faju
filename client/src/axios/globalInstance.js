import axios from 'axios'

const instance = axios.create({
    baseURL: "https://faju-production.up.railway.app/api"
    // baseURL: "http://localhost:5550/api"
    
})

export default instance