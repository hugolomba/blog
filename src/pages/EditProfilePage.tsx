import Register from "../components/Register";
import { useAuth } from "../contexts/authContext";
import EditForm from "../components/EditForm";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();


  return (
    <>
      <button onClick={() => navigate(-1)} className="text-lg font-bold ml-2 cursor-pointer">← Back</button>
      <div className="flex flex-col items-center mt-6">

        <Register />
      </div>
    </>
  );
}
