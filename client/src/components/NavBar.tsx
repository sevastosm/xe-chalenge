import { NavLink } from "react-router";

export default function NavBar() {

  const isAuthenticated = localStorage.getItem("user") !== null;
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
      <div className="flex flex-row items-center justify-center gap-4">
        <NavLink
          to="/"
          className="text-white hover:text-blue-100"
        >
          Home
        </NavLink>

        {!isAuthenticated ? (
          <NavLink
            to="/login"
            className="text-white hover:text-blue-100"
          >
            Login
          </NavLink>
        ) : (
          <div
            onClick={() => {
              localStorage.removeItem("user")
            }}

            className="text-white hover:text-blue-100"
          >
            Logout
          </div>
        )}
      </div>
    </nav>
  )
} 