import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="
        text-7xl md:text-9xl font-extrabold
        bg-linear-to-r from-indigo-500 to-purple-600
        bg-clip-text text-transparent
      ">
        404
      </h1>

      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
        You found a secret level... 👀
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        Sadly, there is no treasure here.  
        The page you are looking for either never existed  
        or rage quit the server.
      </p>

      <Link
        to="/"
        className="
          mt-8
          px-6 py-3
          rounded-xl
          bg-indigo-600
          text-white
          font-medium
          hover:bg-indigo-700
          transition
          shadow-md
        "
      >
        Take me home 🏠
      </Link>

    </div>
  )
}

export default NotFound