import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
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
