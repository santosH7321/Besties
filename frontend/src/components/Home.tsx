import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">Besties</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 rounded-lg hover:bg-gray-800">Login</button>
          </Link>

          <Link to="/signup">
            <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">Signup</button>
          </Link>
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-16 gap-10">
        <div className="max-w-xl">
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
            Connect with your <span className="text-blue-500">Besties</span>
          </h2>
          <p className="mt-6 text-gray-400 text-lg">
            Chat, call, and share moments with your friends in real-time. Besties makes communication seamless and fun.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to={"/login"}>
              <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
              Get Started
              </button>
            </Link>
            <button className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800">
              Learn More
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
            alt="friends"
            className="rounded-2xl w-full object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-20 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Chat", desc: "Real-time messaging with your friends" },
            { title: "Video Call", desc: "High-quality video calls" },
            { title: "Audio Call", desc: "Crystal clear voice calls" },
            { title: "Login", desc: "Secure authentication system" },
            { title: "Signup", desc: "Quick and easy onboarding" },
            { title: "Groups", desc: "Create groups and stay connected" },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-gray-900 rounded-2xl hover:scale-105 transition"
            >
              <h4 className="text-xl font-semibold mb-2 text-blue-400">
                {feature.title}
              </h4>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-20 py-20 text-center">
        <h3 className="text-3xl lg:text-4xl font-bold">
          Ready to connect with your Besties?
        </h3>
        <p className="mt-4 text-gray-400">
          Join now and start chatting, calling, and sharing instantly.
        </p>
        <Link to={"/login"}>
          <button className="mt-6 px-8 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
            Join Besties
        </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 lg:px-20 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Besties. All rights reserved.
      </footer>
    </div>
  );
}
