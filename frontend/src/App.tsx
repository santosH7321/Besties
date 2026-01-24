import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
import 'remixicon/fonts/remixicon.css'
import Layout from "./components/app/Layout"
import Friends from "./components/app/Friends"
import Post from "./components/app/Post"
import Dashboard from "./components/app/Dashboard"


const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<Post />} />
          <Route path="friends" element={<Friends />} />
        </Route>
        <Route path="*" element={<div className="flex items-center justify-center text-5xl h-screen font-bold">Kya Chahiye bhai 😇</div>} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App