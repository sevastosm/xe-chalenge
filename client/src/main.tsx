import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Landing from './pages/Landing'
import './global.css'
import { Navigate } from "react-router-dom";
import AddForm from './components/AddForm'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem("user") !== null; // Replace this with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NavBar />
    <main className="flex flex-col">
    <Routes>
      // param for landing addId  §
      <Route path="/"  element={<Landing/> } />
      <Route path="/:addId"  element={<Landing/> } />
      <Route path="/login" element={<Login />} />
      <Route path='/new-add' element={<ProtectedRoute>
        <AddForm status="new" />
      </ProtectedRoute>} />
      {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
    </Routes>
    </main>
  </BrowserRouter>,
)
