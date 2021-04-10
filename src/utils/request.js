import axios from "axios";


const request  = axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 3000,
})

request.interceptors.request.use(config=>{
    console.log(config);
    config.headers.token = window.sessionStorage.getItem('token');
    return config;
})

export default request;
