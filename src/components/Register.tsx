import { useState } from "react";
import { useAuth } from "../contexts/authContext"; // caminho pro seu AuthContext

export default function RegisterPage() {
  const { register: registerUser, login } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    avatarImage: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", username: "", email: "", password: "", avatarImage: "" };

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!username) {
      newErrors.username = "Username is required";
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    if (!avatarImage) {
      newErrors.avatarImage = "Avatar image is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(name, username, email, password, bio, avatarImage!);
      await login(username, password); // loga o usuário automaticamente
      // Aqui você pode redirecionar, ex: navigate("/dashboard")
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-80 bg-white p-6 rounded shadow"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`px-2 py-1 rounded border ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`px-2 py-1 rounded border ${errors.username ? "border-red-500" : ""}`}
        />
        {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`px-2 py-1 rounded border ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`px-2 py-1 rounded border ${errors.password ? "border-red-500" : ""}`}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

        <textarea
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="px-2 py-1 rounded border"
        />

        <input
          type="file"
          onChange={(e) => setAvatarImage(e.target.files ? e.target.files[0] : null)}
          className={`px-2 py-1 rounded border ${errors.avatarImage ? "border-red-500" : ""}`}
        />
        {errors.avatarImage && <span className="text-red-500 text-sm">{errors.avatarImage}</span>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}