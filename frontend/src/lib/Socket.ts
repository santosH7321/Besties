const env = import.meta.env
import {io} from "socket.io-client";

const socket = io(env.VITE_API_URL!, {
    withCredentials: true
})

export default socket;