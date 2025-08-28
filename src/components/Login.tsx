import { useState } from "react";
import { useAuth } from "../contexts/authContext"; // caminho pro seu AuthContext

export default function LoginPage() {
  const { login } = useAuth(); // pegamos só a função de login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password); // chama a função do contexto
    // você pode redirecionar aqui, por exemplo para a home:
    // navigate("/dashboard") se estiver usando react-router
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-2 py-1 rounded border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-1 rounded border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}