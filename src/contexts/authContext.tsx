import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { User } from "../types/types";


interface AuthContextType {
  user: User | null;
    register: (name: string, username: string, email: string, password: string, bio: string, avatarImage: File) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            setUser(data);

            console.log("User fetched from token:", data);
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("token");
        }
    }
    fetchUser();
  }, []);

  // SignUp
  const register = async (name: string, username: string, email: string, password: string, bio: string, avatarImage: File) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("bio", bio);
      formData.append("avatarImage", avatarImage);

      const response = await axios.post(`${import.meta.env.VITE_API_URL_BASE}/auth/register`, formData);
      const data = response.data; // { name, token }
      setUser(data);
      localStorage.setItem("token", data.token);
    } catch (err) {
      alert("Sign up failed");
      console.error("Sign up error:", err);
    }
  };

  // Login
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL_BASE}/auth/login`, { username, password });
      const data = response.data; // { name, token }
      setUser(data.user);
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);

    } catch (err) {
      alert("Login failed");
        console.error("Login error:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");

  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}