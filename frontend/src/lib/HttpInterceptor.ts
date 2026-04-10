const env = import.meta.env
import axios from "axios";

const HttpInterceptor = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true
})

export default HttpInterceptor;