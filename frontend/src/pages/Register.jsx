import { useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "./Register.css"

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        try {

            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("profileImage", file);

            const res = await API.post("/user/register", formData);
            console.log("Register Success:", res.data);
            navigate("/login")
        } catch (err) {
            console.log("Register Error:", err.response?.data || err.message);
        }
    };

    return (
        <div className="full-page">
            <div className="register-page">
                <div className="register-card">
                    <h2>Register</h2>

                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="file"
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                setFile(selectedFile);
                                setPreview(URL.createObjectURL(selectedFile));
                            }}
                        />
                        {preview && <img src={preview} alt="preview" width="100" />}

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;