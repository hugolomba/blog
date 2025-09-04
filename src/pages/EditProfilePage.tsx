import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();


  return (
      <div className="flex flex-col items-center mt-6">
      <h1 className="text-3xl text-center font-bold mb-8">Edit Your Profile</h1>
      <Register />
      </div>
    
  );
}
