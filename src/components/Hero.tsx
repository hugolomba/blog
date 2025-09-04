
import { useAuth } from "../contexts/authContext";
import LoggedGreetings from "./LoggedGreetings";
import NotLoggedGreeting from "./NotLoggedGreeting";

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <section className="text-gray-800 p-4 rounded-xl ">

      {user ? <LoggedGreetings user={user} /> : <NotLoggedGreeting />}

    </section>
  );
}
