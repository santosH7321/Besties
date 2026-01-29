import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import 'remixicon/fonts/remixicon.css'
import Layout from "./components/app/Layout"
import Friends from "./components/app/Friends"
import Post from "./components/app/Post"
import Dashboard from "./components/app/Dashboard"
import Video from "./components/app/Video"
import Audio from "./components/app/Audio"
import Chat from "./components/app/Chat"
import NotFound from "./components/NotFound"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<Post />} />
          <Route path="friends" element={<Friends />} />
          <Route path="video-chat" element={<Video />} />
          <Route path="audio-chat" element={<Audio />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App