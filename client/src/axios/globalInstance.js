import axios from 'axios'

const instance = axios.create({
<<<<<<< HEAD
    // baseURL: "https://faju-faju-production.up.railway.app/api"
    baseURL: "http://localhost:5550/api"
=======
    // baseURL: "https://rendez-vous-app-api.herokuapp.com/api"
    baseURL: "http://localhost:5550/api"
    // baseURL: "https://faju-faju-production.up.railway.app/api"
>>>>>>> f96091c (stabiliser la partie client et la partie admin)
    
})

export default instance