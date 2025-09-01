import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext"; 
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function Register() {
  const { register: registerUser, login, user, editUser } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    surname: "",
    email: "",
    password: "",
    avatarImage: "",
  });

  const isEditMode = !!user;

  useEffect(() => {
    if (isEditMode && user) {
      setName(user.name || "");
      setSurname(user.surname || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setPreview(user.avatarImage);
    }
  }, [isEditMode, user]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", username: "", email: "", password: "", avatarImage: "" };

    if (!name || name.length < 2) {
      newErrors.name = "Name is required and must be at least 2 characters";
      valid = false;
    }

    if (!surname || surname.length < 2) {
      newErrors.surname = "Surname is required and must be at least 2 characters";
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
    if (!isEditMode) {
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
    }

    setErrors(newErrors);
    return valid;
  };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAvatarImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      if (isEditMode && user) {
        await editUser(user.id, surname, name, username, email, bio, avatarImage);
      } else {
        await registerUser(name, suername, username, email, password, bio, avatarImage!);
        // await login(username, password);
      }
    } catch (err) {
      // alert("Registration failed. Try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
      setUserCreated(true);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-2xl font-bold">{isEditMode ? "Edit Profile" : "Register"}</h1>
      {userCreated && <UserCreated isEditMode={isEditMode} />}
      {isLoading && <Loading />}
      {!userCreated && !isLoading && <form
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
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className={`px-2 py-1 rounded border ${errors.surname ? "border-red-500" : ""}`}
        />
        {errors.surname && <span className="text-red-500 text-sm">{errors.surname}</span>}


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

        {!isEditMode && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-2 py-1 rounded border ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </>
        )}

        <textarea
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="px-2 py-1 rounded border"
        />

           {preview && (
            <div className="flex flex-col gap-2">
              <img src={preview} alt="Cover Preview" className="w-full max-h-64 object-cover rounded" />
            </div>
          )}
    
            <input
              type="file"
              onChange={handleFileChange}
              className={`px-2 py-1 rounded border ${errors.avatarImage ? "border-red-500" : ""}`}
            />
            {errors.avatarImage && <span className="text-red-500 text-sm">{errors.avatarImage}</span>}
         
      

         <button
           type="submit"
           className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
         >
           {isEditMode ? "Save Changes" : "Register"}
         </button>
       
      </form>}
    </div>
  );
}


type UserCreatedProps = { isEditMode: boolean };
function UserCreated({ isEditMode }: UserCreatedProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <p className="text-green-500">
        {isEditMode ? "Profile updated successfully!" : "User created successfully!"}
      </p>
      <Link className="text-blue-500 hover:underline" to="/login">
        Go to Login
      </Link>
      <Link className="text-blue-500 hover:underline" to="/">
        Go to Home
      </Link>
    </div>
  );
}