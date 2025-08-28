import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface User {
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
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

  

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL_BASE}/auth/login`, { username, password });
      const data = response.data; // { name, token }
        console.log(data);
      setUser(data);
      localStorage.setItem("token", data.data.token);

    } catch (err) {
      alert("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}