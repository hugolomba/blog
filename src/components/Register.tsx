import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function Register() {
  const { register: registerUser, user, editUser } = useAuth();

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
    const newErrors = {
      name: "",
      username: "",
      surname: "",
      email: "",
      password: "",
      avatarImage: "",
      bio: "",
    };

    if (!name || name.length < 2) {
      newErrors.name = "Name is required and must be at least 2 characters";
      valid = false;
    }

    if (!surname || surname.length < 2) {
      newErrors.surname =
        "Surname is required and must be at least 2 characters";
      valid = false;
    }

    if (!username || username.length < 4) {
      newErrors.username =
        "Username is required and must be at least 4 characters";
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

    if (!bio || bio.length < 10) {
      newErrors.bio = "Bio must be at least 10 characters";
      valid = false;
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
        await editUser(
          user.id,
          name,
          surname,
          username,
          email,
          bio,
          // if the user doesn't select a new avatarImage, keep the existing one
          avatarImage
        );
      } else {
        await registerUser(
          name,
          surname,
          username,
          email,
          password,
          bio,
          // the user cannot submit the form without an avatarImage when registering
          avatarImage!
        );
      }

      setUserCreated(true);
    } catch (err) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      {userCreated && (
        <UserCreated
          isEditMode={isEditMode}
          onClose={() => setUserCreated(false)}
        />
      )}
      {isLoading && <Loading />}
      {!userCreated && !isLoading && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`px-2 py-1 rounded border ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}

          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={`px-2 py-1 rounded border ${
              errors.surname ? "border-red-500" : ""
            }`}
          />
          {errors.surname && (
            <span className="text-red-500 text-sm">{errors.surname}</span>
          )}

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`px-2 py-1 rounded border ${
              errors.username ? "border-red-500" : ""
            }`}
            autoComplete="username"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username}</span>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-2 py-1 rounded border ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          {!isEditMode && (
            <>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`px-2 py-1 rounded border ${
                  errors.password ? "border-red-500" : ""
                }`}
                autoComplete="new-password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </>
          )}

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="px-2 py-1 rounded border"
          />
          {errors.bio && (
            <span className="text-red-500 text-sm">{errors.bio}</span>
          )}

          {preview && (
            <div className="flex flex-col gap-2">
              <img
                src={preview}
                alt="Cover Preview"
                className="w-full max-h-64 object-cover rounded"
              />
            </div>
          )}

          <label htmlFor="avatarImage">Avatar Image</label>
          <input
            id="avatarImage"
            type="file"
            onChange={handleFileChange}
            className={`px-2 py-1 rounded border ${
              errors.avatarImage ? "border-red-500" : ""
            }`}
          />
          {errors.avatarImage && (
            <span className="text-red-500 text-sm">{errors.avatarImage}</span>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
          >
            {isEditMode ? "Save Changes" : "Register"}
          </button>
        </form>
      )}
    </div>
  );
}

type UserCreatedProps = { isEditMode: boolean; onClose: () => void };
function UserCreated({ isEditMode, onClose }: UserCreatedProps) {
  const { user } = useAuth();
  return (
    <>
      <div className="fixed inset-0 bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            &#x2715;
          </button>
          <p className="text-green-600 text-lg mb-6 text-center">
            {isEditMode
              ? "Profile updated successfully!"
              : "User created successfully!"}
          </p>
          <div className="flex justify-center gap-4">
            {!isEditMode ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center w-32"
              >
                Go to Login
              </Link>
            ) : (
              <Link
                to={`/profile/${user?.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center w-32"
              >
                Go to Profile
              </Link>
            )}
            <Link
              to="/"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-center w-32"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
