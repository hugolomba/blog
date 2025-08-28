import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Home from './pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}