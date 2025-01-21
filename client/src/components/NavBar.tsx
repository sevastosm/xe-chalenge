import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="nav-brand">
        <NavLink 
          to="/" 
          className="text-white text-2xl font-bold hover:text-blue-100"
        >
          My App
        </NavLink>
      </div>
      <div className="nav-links space-x-4">
        <NavLink 
          to="/" 
          className="text-white hover:text-blue-100"
        >
          Home
        </NavLink>
        <NavLink 
          to="/login" 
          className="text-white hover:text-blue-100"
        >
          Login
        </NavLink>
      </div>
    </nav>
  )
} 