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
import PrivateRoute from './utils/PrivateRoute'


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path='/post/create' element={<PrivateRoute><NewPostPage /></PrivateRoute>} />
        <Route path='/post/:id/edit' element={<PrivateRoute><EditPostPage /></PrivateRoute>} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/profile/:id/edit' element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
        <Route path='/settings' element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}