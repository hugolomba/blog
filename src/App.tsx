import './App.css'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetailPage from './pages/PostDetailPage'
import ProfilePage from './pages/ProfilePage'
import ErrorPage from './pages/ErrorPage'


import NewPostPage from './pages/NewPostPage'
import EditPostPage from './pages/EditPostPage'
import EditProfilePage from './pages/EditProfilePage'
import SettingsPage from './pages/SettingsPage'


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
        <Route path='/post/:id/edit' element={<EditPostPage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/profile/:id/edit' element={<EditProfilePage />} />  
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}