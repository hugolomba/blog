import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); 
  const [success, setSuccess] = useState(false); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
const [userDeleted, setUserDeleted] = useState(false);
const { logout } = useAuth();

  const handleChangePassword = async () => {
    setMessage("");
    

try {
    setIsLoading(true);
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL_BASE}/users/change-password`,
    { currentPassword, newPassword },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );


  setMessage(typeof response.data === "string" ? response.data : response.data.message || "Password changed successfully");
  setSuccess(true);
  setCurrentPassword("");
  setNewPassword("");

} catch (error: any) {
  if (error.response && error.response.data) {
    setMessage(typeof error.response.data === "string" ? error.response.data : error.response.data.message || "An error occurred");
    setIsLoading(false);
  } else {
    setMessage("An error occurred");
    setIsLoading(false);
  }
  setSuccess(false);
}
  }

  const handleConfirmDelete = async () => {
    setPasswordError("");
    if (!confirmPassword) {
      setPasswordError("Please enter your password to confirm.");
      return;
    }

    try {
    setIsLoading(true);
     const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_BASE}/users/delete`,
        {
          data: { password: confirmPassword },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );

      setMessage(typeof response.data === "string" ? response.data : response.data.message || "Profile deleted successfully");
      setSuccess(true);
      setIsLoading(false);
      setIsDialogOpen(false);

      setUserDeleted(true);
      logout();
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        setPasswordError("Incorrect password. Please try again.");
      } else {
        setPasswordError("An error occurred while deleting the profile.");
      }
    }
  };

  return (

    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

     {userDeleted ? <ConfirmationDelete /> : ( 
        <>
        <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`border px-4 py-2 rounded focus:outline-none focus:ring-2 ${
              message && !success ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`border px-4 py-2 rounded focus:outline-none focus:ring-2 ${
              message && !success ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {!success && (
            <button
              onClick={handleChangePassword}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {isLoading ? "Loading..." : "Save New Password"}
            </button>
          )}
          {message && (
            <p className={`mt-2 ${success ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Delete Profile</h2>
        <p className="mb-4 text-gray-600">
          Deleting your profile is permanent and cannot be undone.
        </p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 px-4 py-2"
        >
          Delete Profile <MdDelete />
        </button>
      </section>
    </>
    ) }

     

<ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setConfirmPassword("");
          setPasswordError("");
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Profile"
        message="Are you sure you want to delete your profile? This action cannot be undone."
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        passwordError={passwordError}
        isLoading={isLoading}
      />

    </div>
  );
}

function ConfirmationDelete() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
            <h2 className="text-lg font-bold">Profile Deleted</h2>
            <p className="text-gray-700">Your profile has been successfully deleted.</p>
            <Link to="/" className="bg-blue-500 text-white rounded hover:bg-blue-600 px-4 py-2">
                Go to Home
            </Link>
        </div>
    )
}

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to proceed?",
  confirmPassword,
  setConfirmPassword,
  passwordError,
  isLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  passwordError: string;
  isLoading: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-80">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4 text-gray-700">{message}</p>
        <input
          type="password"
          placeholder="Enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 mb-2 ${
            passwordError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={isLoading}
        />
        {passwordError && (
          <p className="text-red-600 text-sm mb-2">{passwordError}</p>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400 transition"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}