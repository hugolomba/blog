import { useState } from "react";
import { useAuth } from "../contexts/authContext"; 
import Loading from "./Loading";
import { Link } from "react-router-dom";


export default function EditForm() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

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

    if (!name || name.length < 2) {
      newErrors.name = "Name is required and must be at least 2 characters";
      valid = false;
    }
    if (!username || username.length < 4) {
      newErrors.username = "Username is required and must be at least 4 characters";
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

    if (!avatarImage) {
      newErrors.avatarImage = "Avatar image is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
  
    } catch (err) {
      alert("Edition failed. Try again.");
    } finally {
      setIsLoading(false);
      setUserCreated(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {userCreated && <UserCreated />}
      {isLoading && <Loading />}
      {!userCreated && !isLoading && (
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
      )}
    </div>
  );
}

const UserCreated: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <p className="text-green-500">User created successfully!</p>
      <Link className="text-blue-500 hover:underline" to="/login">
        Go to Login
      </Link>
      <Link className="text-blue-500 hover:underline" to="/">
        Go to Home
      </Link>
    </div>
  );
};