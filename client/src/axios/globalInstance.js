import axios from 'axios'

const instance = axios.create({
    // baseURL: "https://rendez-vous-app-api.herokuapp.com/api"
    baseURL: "http://localhost:5550/api"
})

export default instance