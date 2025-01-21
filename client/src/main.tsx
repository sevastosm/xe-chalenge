import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import NavBar from './components/NavBar'
import Area from './pages/Area'
import Login from './pages/Login'
import './global.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Area />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
)
