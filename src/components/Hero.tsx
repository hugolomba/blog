
import { useAuth } from "../contexts/authContext";
import LoggedGreetings from "./LoggedGreetings";
import NotLoggedGreeting from "./NotLoggedGreeting";

export default function Header() {
  const { user } = useAuth();

  return (
    <section className="text-gray-800 p-4 rounded-xl ">

      {user ? <LoggedGreetings user={user} /> : <NotLoggedGreeting />}

  
      {/* <h2 className="text-2xl text-center font-poppins m-2">Welcome! {user ? user.name : ""} 👋🏻</h2>
      <h3 className="text-lg text-center font-poppins">Here you can find and search for articles.</h3>
      <p className="text-center text-gray-600 mb-4">Feel free to explore and enjoy reading!</p> */}

    </section>
  );
}
