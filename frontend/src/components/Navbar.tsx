import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link to="/">Home</Link>
      <div className="flex space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Navbar