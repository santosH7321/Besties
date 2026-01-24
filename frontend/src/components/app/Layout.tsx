import { Link, Outlet, useLocation } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"

const Layout = () => {
  const leftAsideSize = 350
  const rightAsideSize = 450
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
            <Avatar
              title="Santosh Kumar"
              subtitle="Full-Stack Developer"
              image="/images/myimage.jpeg"
              titleColor="white"
              subtitleColor="#c7c7ff"
            />
          </div>

          <nav className="flex-1 space-y-1">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="
                  group flex items-center gap-4 px-4 py-3 rounded-xl
                  text-gray-300
                  hover:text-white
                  hover:bg-white/10
                  transition-all duration-200
                "
              >
                <i
                  className={`${item.icon} text-xl text-gray-400 group-hover:text-white`}
                />
                <span className="capitalize text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="my-6 h-px bg-white/10" />

          <button
            className="
              flex items-center gap-4 px-4 py-3 rounded-xl
              text-red-300
              hover:text-red-400
              hover:bg-red-500/10
              transition-all duration-200
            "
          >
            <i className="ri-logout-circle-r-line text-xl" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <section
        className="min-h-screen p-8"
        style={{
          marginLeft: leftAsideSize,
          marginRight: rightAsideSize,
        }}
      >
        <Card 
          title={
              <div className="flex items-center gap-4">
                <button className="bg-gray-100 w-10 h-10 rounded-full hover:bg-salte-200">
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
        className="fixed top-0 right-0 h-full p-8 overflow-auto"
        style={{ width: rightAsideSize }}
      >
        <Card title="My Friends" divider>
          <div className="space-y-3">
            {Array(20).fill(0).map((item, index) => (
              <div
                key={index}
                className="
                  flex items-center
                  rounded-xl
                  px-3 py-2
                  hover:bg-gray-50
                  transition-colors
                  cursor-pointer
                "
              >
                <Avatar
                  size="md"
                  image="/images/myimage.jpeg"
                  title="Santosh kumar"
                  subtitle={
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      <p className="text-gray-500 text-xs">Online</p>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  )
}

export default Layout