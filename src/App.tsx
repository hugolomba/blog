import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Home from './pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from './pages/PostDetail'


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}