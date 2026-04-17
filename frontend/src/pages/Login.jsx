import { useState } from "react"
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken, setUser } = useAuth();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await API.post("/user/login", { email, password });

            setToken(res.data.token);
            setUser(res.data.data);

            localStorage.setItem("token", res.data.token);

            navigate("/profile");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;