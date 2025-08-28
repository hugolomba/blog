import { GiFeather } from "react-icons/gi"
import placeholder from "../assets/images/placeholder.webp"

// import userAvatar from "../assets/avatar.png"
import { useAuth } from "../contexts/authContext"


function Navbar() {
  const { user } = useAuth();

  return (
    <div className="navbar m-2 p-4 bg-white rounded-sm flex items-center font-poppins font-bold">
      <div className="flex-1">
        <a href="#" className="text-2xl font-bold"><GiFeather className="inline-block mr-1" /><h1 className="inline-block">Blog</h1></a>
      </div>
     <div className="">
      <img className="w-12 h-12 object-cover rounded-full" src={user ? user.avatarImage : placeholder} alt="User avatar" />
     </div>
    </div>

/* <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Blog</a>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 h-screen p-2 shadow text-center">
        <li>
          <button className="btn">Dashboard</button>
        </li>
        <li>
          <a className="justify-between">
            My Profile
          </a>
        </li>
        <li><a>My Articles</a></li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div> */
  )
}

export default Navbar