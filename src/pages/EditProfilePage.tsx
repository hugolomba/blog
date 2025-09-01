import Register from "../components/Register";
import { useAuth } from "../contexts/authContext";
import EditForm from "../components/EditForm";

export default function EditProfilePage() {




  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      {/* Add your edit profile form or component here */}
   <Register />
    </div>
  );
}
