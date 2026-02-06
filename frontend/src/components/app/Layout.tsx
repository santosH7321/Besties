import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"
import { useContext, useEffect, useState } from "react"
import Context from "../../Contex"
import HttpInterceptor from "../../lib/HttpInterceptor"
import {v4 as uuid} from "uuid"
import useSWR, { mutate } from "swr"
import Fetcher from "../../lib/Fetcher"
import CatchError from "../../lib/CatchError"
import Dashboard from "./Dashboard"


const EightMinInMs = 8*60*1000;
const Layout = () => {
  const [leftAsideSize, setLeftAsideSize] = useState(350)
  const rightAsideSize = 450
  const collapseSize = 140
  const {pathname} = useLocation()
  const navigate = useNavigate();

  const {error} = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: EightMinInMs,
    shouldRetryOnError: false
  })
  const {session, setSession} = useContext(Context)



  useEffect(() => {
    if(error){
      logout();
    }
  }, [error])

  const menus = [
        {
            icon: "ri-home-9-line",
            href: "/app/dashboard",
            label: "dashboard"
        },
        {
            icon: "ri-chat-smile-3-line",
            href: "/app/posts",
            label: "my posts"
        },
        {
            icon: "ri-group-line",
            href: "/app/friends",
            label: "friends"
        }
  ]

  const logout = async () => {
    try {
      await HttpInterceptor.post("/auth/logout");
      navigate("/login")
    }
    catch(err) {
      CatchError(err)
    }
  }


  const uploadImage = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.click()
    input.onchange = async () => {
      if(!input.files) 
        return

      const file = input.files[0]
      const path = `profile-pictures/${uuid()}.jpeg`
      const payload = {
        path,
        type: file.type
      }
      try {
        const options = {
          headers: {
            "Contect-Type": file.type
          }
        }
        const {data} = await HttpInterceptor.post("/storage/upload", payload)
        await HttpInterceptor.put(data.url, file, options)
        const {data: user} = await HttpInterceptor.put("/auth/update-profile", {path})
        setSession({...session, image: user.image})
        mutate("/auth/refresh-token")
      }
      catch(err) {  
        console.log(err)  
      }
    }
  }
  return (
    <div className="min-h-screen">
      <aside
          className="fixed top-0 left-0 h-full p-8 overflow-auto"
          style={{ width: leftAsideSize }}>
          <div className="h-full rounded-2xl bg-linear-to-br from-[#0F172A] via-[#1E1B4B] to-[#020617] p-6 shadow-2xl flex flex-col">
            <div className="mb-8 flex justify-center">
              {
                leftAsideSize === collapseSize ?
                <i className="ri-user-fill text-xl text-white animate__animated animate__fadeIn" title="profile"></i>
                :
                <div className="animate__animated animate__fadeIn">
                  {
                    session && 
                    <Avatar
                      title={session.fullname}
                      subtitle={session.email}
                      image={session.image || "/images/myimage.jpeg"}
                      titleColor="white"
                      subtitleColor="#c7c7ff"
                      onClick={uploadImage}
                    />
                  }
                </div>
              }
            </div>
            <div className="my-2 h-px bg-white/10" />
            <nav className="flex-1 space-y-1">
              {menus.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  title={leftAsideSize === collapseSize ? item.label : ""}
                  className="
                    group flex items-center gap-4 py-3 rounded-xl
                    text-gray-300
                    hover:text-white
                    hover:bg-white/10
                    transition-all duration-200
                  "
                >
                  <i
                    className={`${item.icon} text-xl text-gray-400 group-hover:text-white`}
                  />

                  {leftAsideSize !== collapseSize && (
                    <span className="capitalize text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

        <div className="my-6 h-px bg-white/10" />

          <button
            onClick={logout}
            title={leftAsideSize === collapseSize ? "Logout" : ""}
            className="
              flex items-center gap-4  py-3 rounded-xl
              text-red-300
              hover:text-red-400
              hover:bg-red-500/10
              transition-all duration-200
            "
          >
            <i className="ri-logout-circle-r-line text-xl" />

            {leftAsideSize !== collapseSize && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      <section
        className="min-h-screen p-8"
        style={{
          width: `calc(100% - ${leftAsideSize+rightAsideSize}px)`,
          marginLeft: leftAsideSize,
          transition: '0.2s'
        }}
      >
        <Card 
          title={
              <div className="flex items-center gap-4">
                <button className="bg-gray-100 w-10 h-10 rounded-full hover:bg-salte-200" onClick={()=>setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)}>
                  <i className="ri-arrow-left-line"></i>
                </button>
                <h1>{pathname.split("/").pop()}</h1>
              </div>
            } 
            divider
          >
            <Outlet />
          <Dashboard/>
        </Card>
      </section>

      <aside 
        className="
          bg-white fixed top-0 right-0 h-full
          p-6 space-y-6
          overflow-y-auto
          border-l border-gray-200
          shadow-sm
        " 
        style={{
          width: rightAsideSize,
          transition: '0.2s'
        }}
      >

        <div className="h-64 overflow-y-auto pr-2">
          <Card title="Suggested" divider>
            <div className="space-y-5">
              {
                Array(20).fill(0).map((item, index)=>(
                  <div 
                    key={index} 
                    className="
                      flex gap-3 items-center
                      p-2 rounded-xl
                      hover:bg-gray-50
                      transition
                    "
                  >
                    <img 
                      src="/images/myimage.jpeg" 
                      alt="jpeg" 
                      className="w-14 h-14 rounded-xl object-cover shadow-sm"
                    />

                    <div className="flex-1">
                      <h1 className="text-gray-800 font-semibold text-sm">
                        Santosh Kumar
                      </h1>

                      <button className="
                        mt-1
                        text-xs font-semibold
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        px-3 py-1
                        rounded-full
                        transition
                        shadow-sm
                      ">
                        <i className="ri-user-add-line mr-1"></i>
                        Add Friend
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </Card>
        </div>

        <Card title="Friends" divider>
          <div className="space-y-3">
            {
              Array(20).fill(0).map((item, index)=>(
                <div 
                  key={index} 
                  className="
                    flex items-center justify-between
                    p-2 rounded-xl
                    hover:bg-gray-50
                    transition
                  "
                >
                  <Avatar 
                    size="md"
                    image="/images/myimage.jpeg"
                    title="Santosh kumar"
                    subtitle={
                      <small className={`${index % 2 === 0 ? 'text-zinc-400' : 'text-green-500'} font-medium`}>
                        {index % 2 === 0 ? "Offline" : "Online"}
                      </small>
                    }
                  />
                  <div className="flex gap-2">

                    <Link to="/app/chat">
                      <button 
                        title="Chat"
                        className="
                          w-9 h-9
                          flex items-center justify-center
                          rounded-lg
                          hover:bg-blue-50
                          text-blue-500
                          transition
                        "
                      >
                        <i className="ri-chat-ai-line"></i>
                      </button>
                    </Link>
                                      
                    <Link to="/app/audio-chat">
                      <button 
                        title="Call"
                        className="
                          w-9 h-9
                          flex items-center justify-center
                          rounded-lg
                          hover:bg-green-50
                          text-green-500
                          transition
                        "
                      >
                        <i className="ri-phone-line"></i>
                      </button>
                    </Link>

                    <Link to="/app/video-chat">
                      <button 
                        title="Video call"
                        className="
                          w-9 h-9
                          flex items-center justify-center
                          rounded-lg
                          hover:bg-amber-50
                          text-amber-500
                          transition
                        "
                      >
                        <i className="ri-video-on-ai-line"></i>
                      </button>
                    </Link>

                  </div>
                </div>
              ))
            }
          </div>
        </Card>

      </aside>
    </div>
  )
}

export default Layout