import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"
import { useContext, useEffect, useState } from "react"
import Context from "../../Contex"
import HttpInterceptor from "../../lib/HttpInterceptor"
import {v4 as uuid} from "uuid"
import { mutate } from "swr"
import CatchError from "../../lib/CatchError"
import Dashboard from "./Dashboard"
import FriendRequest from "./friend/FriendRequest"
import FriendSuggestion from "./friend/FriendSuggestion"
import { useMediaQuery } from "react-responsive"
import Logo from "../shared/Logo"
import IconButton from "../shared/IconButton"
import FriendsOnline from "./friend/FriendsOnline"




const Layout = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [leftAsideSize, setLeftAsideSize] = useState(350)
  const rightAsideSize = 450
  const [collapseSize, setCollapseSize] = useState(140)
  const {pathname} = useLocation()
  const navigate = useNavigate();

  const friendsUiBlacklist = [
            "/app/friends",
            "/app/chat",
            "/app/audio-chat",
            "/app/video-chat"
    ]

  const isBlacklisted = friendsUiBlacklist.some((path)=>pathname === path)


  const {session, setSession} = useContext(Context)

  

  useEffect(()=>{
        setLeftAsideSize(isMobile ? 0 : 350)
        setCollapseSize(isMobile ? 0 : 140)
    }, [isMobile])

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
    if (!input.files) return

    const file = input.files[0]
    const extension = file.type.split("/")[1]
    const path = `profile-pictures/${uuid()}.${extension}`

    const payload = {
      path,
      type: file.type,
      status: "public-read"
    }

    try {
      const { data } = await HttpInterceptor.post("/storage/upload", payload)

      await HttpInterceptor.put(data.url, file, {
        headers: {
          "Content-Type": file.type  
        }
      })

      const { data: user } = await HttpInterceptor.put(
        "/auth/profile-picture",
        { path }
      )

      setSession({ ...session, image: user.image })
      mutate("/auth/refresh-token")
    } catch (err) {
      console.log(err)
    }
  }
}

  return (
    <div className="min-h-screen">
      <nav className="lg:hidden flex justify-between items-center bg-linear-to-br from-[#0F172A] via-[#1E1B4B] to-[#020617] sticky top-0 left-0 z-50 w-full py-4 px-6">
        <Logo />
        <div className="flex gap-4">
            <IconButton onClick={logout} icon="logout-circle-line" type="success" />
            <Link to="/app/friends">
                <IconButton icon="chat-ai-line" type="danger" />
            </Link>
            <IconButton  onClick={()=>setLeftAsideSize(leftAsideSize === 250 ? collapseSize : 250)} icon="menu-3-line" type="warning" />
        </div>
    </nav>
      <aside
          className="fixed lg:top-0 lg:left-0 h-full lg:p-8 overflow-auto z-50"
          style={{ width: leftAsideSize }}>
          <div className="h-full lg:rounded-2xl bg-linear-to-br from-[#0F172A] via-[#1E1B4B] to-[#020617] p-6 shadow-2xl flex flex-col">
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
            <nav className="flex-1 space-y-1 ">
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
        className="lg:py-8 lg:px-1 p-2 space-y-8"
        style={{
          width: isMobile ? "100%" : `calc(100% - ${leftAsideSize+rightAsideSize}px)`,
          marginLeft: isMobile ? 0 : leftAsideSize,
          transition: '0.2s'
        }}
      >
        {/* {
            !isBlacklisted &&
            <FriendRequest />
        } */}
        <Card 
          title={
              <div className="flex items-center gap-4">
                <button className="lg:block hidden bg-gray-100 w-10 h-10 rounded-full hover:bg-salte-200" onClick={()=>setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)}>
                  <i className="ri-arrow-left-line"></i>
                </button>
                <h1>{pathname.split("/").pop()}</h1>
              </div>
            } 
            divider
          >
            {
              pathname === "/app" ?
                  <Dashboard />
                    :
                  <Outlet />
            }
        </Card>
        {/* {
          !isBlacklisted &&
          <FriendSuggestion />
        } */}
      </section>

      <aside 
        className="lg:block hidden bg-white fixed top-0 right-0 h-full p-8 overflow-auto space-y-8 order-1" 
        style={{
        width: rightAsideSize,
        transition: '0.2s'
        }}>
          <FriendsOnline />
      </aside>
    </div>
  )
}

export default Layout