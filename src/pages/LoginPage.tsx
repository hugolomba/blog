import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    if (user) {
        navigate("/");
    }
    return (
        <div className="flex flex-col items-center mt-6">
            <h1 className="text-2xl font-bold">Login</h1>
            <Login />
        </div>
    );
}