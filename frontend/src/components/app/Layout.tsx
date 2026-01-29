import { Link, Outlet, useLocation } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"
import { useState } from "react"

const Layout = () => {
  const [leftAsideSize, setLeftAsideSize] = useState(350)
  const rightAsideSize = 450
  const collapseSize = 140
  const {pathname} = useLocation()

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

  return (
    <div className="min-h-screen">
      <aside
          className="fixed top-0 left-0 h-full p-8 overflow-auto"
          style={{ width: leftAsideSize }}>
          <div className="h-full rounded-2xl bg-linear-to-br from-[#0F172A] via-[#1E1B4B] to-[#020617] p-6 shadow-2xl flex flex-col">
            <div className="mb-8">
              {
                leftAsideSize === collapseSize ?
                <i className="ri-user-fill text-xl text-white animate__animated animate__fadeIn"></i>
                :
                <div className="animate__animated animate__fadeIn">
                  <Avatar
                    title="Santosh Kumar"
                    subtitle="Full-Stack Developer"
                    image="/images/myimage.jpeg"
                    titleColor="white"
                    subtitleColor="#c7c7ff"
                  />
                </div>
              }
            </div>
            <div className="h-px bg-white/10" />
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
        </Card>
      </section>

      <aside 
        className="bg-white fixed top-0 right-0 h-full p-8 overflow-auto space-y-8" 
        style={{
        width: rightAsideSize,
        transition: '0.2s'
        }}>
        <div className="h-62.5 overflow-auto">
          <Card title="Suggested" divider>
            <div className="space-y-8">
              {
                Array(20).fill(0).map((item, index)=>(
                  <div key={index} className="flex gap-4">
                    <img src="/images/myimage.jpeg" alt="jpeg" className="w-16 h-16 rounded object-cover" />
                      <div>
                        <h1 className="text-black font-medium">Santosh Kumar</h1>
                          <button className="font-medium bg-green-400 text-white rounded px-2 py-1 text-xs hover:bg-green-500 mt-1">
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
          <div className="space-y-5">
            {
              Array(20).fill(0).map((item, index)=>(
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <Avatar 
                    size="md"
                    image="/images/myimage.jpeg"
                    title="Santosh kumar"
                    subtitle={
                    <small className={`${index % 2 === 0 ? 'text-zinc-400' : 'text-green-400'} font-medium`}>
                      {index % 2 === 0 ? "Offline" : "Online"}
                    </small>
                    }
                  />
                  <div className="space-x-3">
                    <Link to="/app/chat">
                      <button className="hover:text-blue-600 text-blue-500" title="Chat">
                        <i className="ri-chat-ai-line"></i>
                      </button>
                    </Link>
                                    
                    <Link to="/app/audio-chat">
                        <button className="hover:text-green-500 text-green-400" title="Call">
                          <i className="ri-phone-line"></i>
                        </button>
                    </Link>

                    <Link to="/app/video-chat">
                      <button className="hover:text-amber-600 text-amber-500" title="Video call">
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