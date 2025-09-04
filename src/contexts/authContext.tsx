import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { User } from "../types/types";
import type { AuthContextType } from "../types/types";





const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);



  // Load user from localStorage on start
  useEffect(() => {
    if (!token) {
        setLoading(false);
        return;
    }

    const fetchUser = async () => {
        try {
            
            const response = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            setUser(data);

         
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }
    fetchUser();
  }, []);

  // Register
  const register = async (name: string, surname: string, username: string, email: string, password: string, bio: string, avatarImage: File) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("surname", surname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("bio", bio);
      formData.append("avatarImage", avatarImage);

      await axios.post(`${import.meta.env.VITE_API_URL_BASE}/auth/register`, formData);
    } catch (err) {
      console.error("Sign up error:", err);
      return Promise.reject(err);
    }
  };

  // Login
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL_BASE}/auth/login`, { username, password });
      const data = response.data; // { name, token }
      setUser(data.user);
      localStorage.setItem("token", data.token);

    } catch (err) {
        console.error("Login error:", err);
        return Promise.reject(err);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Edit User
  const editUser = async (id: number, name: string, surname: string, username: string, email: string, bio: string, avatarImage: File | null) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("surname", surname);  
      formData.append("email", email);
      formData.append("bio", bio);
      if (avatarImage) {
        formData.append("avatarImage", avatarImage);
      }

      const response = await axios.put(`${import.meta.env.VITE_API_URL_BASE}/users/edit/${id}`, formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );


      const data = await response.data;
      setUser(data);
    } catch (err) {
      console.error("Edit user error:", err);
    }
  }; 

  return (
    <AuthContext.Provider value={{id: user?.id, user, register, login, logout, editUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}