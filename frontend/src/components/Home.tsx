import { useContext } from "react"
import Context from "../Contex"

const Home = () => {
  const {session, setSession} = useContext(Context)
  return (
    <div className="flex gap-5">
      <h1>Home</h1>
      <button className="flex px-6 py-2 rounded-xl bg-blue-400" onClick={() => setSession("santosh@gmail.com")}>Store</button>
      <h1>{session}</h1>
    </div>
  )
}

export default Home