import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    return (
        <nav className="navbar">
            <div className="nav-left">
                {user ? (
                    <img src={"http://localhost:9999/" + user.profileImage}
                        alt="Profile Icon" />
                ) : (
                    <h2>Beginner</h2>
                )}
            </div>
            <div className="nav-right">
                {
                    !user ? (
                        <>
                            <button onClick={() => { navigate("/login") }}>Login</button>
                            <button onClick={() => { navigate("/register") }}>Register</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => { navigate("/profile") }}>Profile</button>
                            {user.role === "admin" &&
                                <button onClick={() => { navigate("/admin") }}>Admin Panel</button>
                            }
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )
                }
            </div>
        </nav>
    );
}