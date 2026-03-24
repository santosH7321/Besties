import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import Context from "../Context"
import HttpInterceptor from "../lib/HttpInterceptor"
const AuthGuard = () => {
    const {session, setSession } = useContext(Context)

    useEffect(() => {
        getSession()
    }, [])

    const getSession = async () => {
        try {
            const {data} = await HttpInterceptor.get("/auth/session")
            setSession(data)
        } 
        catch(err){
            setSession(false)
        }
    }
    if(session === null) return null
    if(session === false) return <Navigate to="/login" />
  return (
    <Outlet />
  )
}

export default AuthGuard