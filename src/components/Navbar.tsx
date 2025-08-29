import { GiFeather } from "react-icons/gi"
import placeholder from "../assets/images/placeholder.webp"
import { useAuth } from "../contexts/authContext"
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
   logout();
   setIsOpen(false);
    navigate("/");
  
  };

  return (
    <header className="navbar p-4 rounded-sm flex items-center font-poppins relative">
        <Link to="/" className="text-2xl text-gray-700 hover:text-gray-600">
          <h1 className="inline-block">Blog</h1> <span className="inline-block mr-1"><GiFeather /></span>
        </Link>
    

    {user && <div className="flex-1 max-w-md mx-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>}

      {user ? <div onClick={() => setIsOpen(!isOpen)}>
        <img
          className="w-10 h-10 object-cover rounded-full cursor-pointer"
          src={user ? user.avatarImage : placeholder}
          alt="User avatar"
        />
      </div> : <div className="flex gap-3">
      <Link to="/login" className="px-4 py-2 text-gray-700">Login</Link>
      <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow hover:scale-105 transition">
        Register
      </Link>
    </div>}

      

      {/* User menu */}
      <div
        ref={menuRef}
        className={`absolute flex flex-col gap-2 items-center p-2 -right-1 top-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10 transform transition-all duration-300 ease-in-out 
          ${isOpen ? "inline opacity-100 translate-x-0" : "hidden translate-x-20 pointer-events-none"}`}
      >
   
         
            <img
          className="w-12 h-12 object-cover rounded-full cursor-pointer"
          src={user ? user.avatarImage : placeholder}
          alt="User avatar"
        />

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 font-bold absolute top-2 right-2"
          >
            ✕
          </button>
   
        {user &&
        <ul className="py-1 flex flex-col items-center">
          <li>
            <Link to="/dashboard" className="block px-4 py-2 text-sm bg-amber-400 text-gray-600 hover:bg-gray-100 rounded-lg">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Profile</Link>
          </li>
          <li>
            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Settings</Link>
          </li>
          <li>
            <button onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Logout</button>
          </li>
        </ul> 
      }
       
        
      </div>
    </header>
  )
}

export default Navbar