import Login from "../components/Login";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center mt-6">
            <h1 className="text-2xl font-bold">Login</h1>
            <Login />
        </div>
    );
}