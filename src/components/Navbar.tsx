import { useAuth } from "../contexts/authContext"
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout, loading } = useAuth();
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
    <nav className="navbar p-2 flex justify-between items-center font-poppins relative bg-white rounded-lg ">
        <Link to="/" className="hover:text-gray-600 flex-1 text-3xl font-bold bg-gradient-to-b from-blue-600 to-purple-800 bg-clip-text text-transparent">
          <h1 className="inline-block">Blog</h1> 
         
        </Link>

{!loading && (
  user ? (
    <div onClick={() => setIsOpen(!isOpen)}>
      <img
        className="w-10 h-10 object-cover rounded-full cursor-pointer"
        src={user.avatarImage}
        alt="User avatar"
      />
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link to="/login" className="px-4 py-2 text-gray-700">Login</Link>
      <Link to="/register" className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition">
        Register
      </Link>
    </div>
  )
)}

      

      {/* User menu */}
       {user &&
      <div
        onClick={() => setIsOpen(!isOpen)}
        ref={menuRef}
        className={`absolute flex flex-col gap-2 items-center p-6 -right-1 top-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transform transition-all duration-300 ease-in-out 
          ${isOpen ? "flex opacity-100 translate-x-0" : "hidden translate-x-20 pointer-events-none"}`}
      >
   
         
            <img
          className="w-16 h-16 object-cover rounded-full cursor-pointer"
          src={user && user.avatarImage}
          alt="User avatar"
        />

        <h3 className="text-sm font-semibold">{user.name}</h3>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 font-bold absolute top-2 right-2"
          >
            ✕
          </button>
   
       
        <ul className="py-1 flex flex-col items-center">
          <li>
            <Link to="/dashboard" className="block px-4 py-2 text-sm bg-amber-400 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:bg-gray-100 rounded-lg">Dashboard</Link>
          </li>
          <li>
            <Link to={`/profile/${user.id}`} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Profile</Link>
          </li>
          <li>
            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Settings</Link>
          </li>
          <li>
            <button onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Logout</button>
          </li>
        </ul> 
      
       
        
      </div>
        }
    </nav>
  )
}

export default Navbar