import './App.css'
import LoginPage from './components/Login'
import Navbar from './components/Navbar'
import RegisterPage from './components/Register'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetailPage from './pages/PostDetailPage'

import NewPostPage from './pages/NewPostPage'


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path='/post/create' element={<NewPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}