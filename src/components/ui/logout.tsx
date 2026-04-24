import { useAuth } from "../../src/context/AuthContext";

const { logout } = useAuth();

<button onClick={logout}>Logout</button>