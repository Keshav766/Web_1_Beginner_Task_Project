import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = localStorage.getItem("token");
                const res = await API.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(res.data.data);
            } catch (err) {
                console.log("Error:", err.response?.data || err.message);
            }
        }
        fetchProfile();
    }, []);

    async function UserUpdation(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await API.patch("/user/update", {
                name, email, password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data.data);
            setName("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
        }
    }

    async function UserDeletion(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await API.delete("/user/delete", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
        }
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {
                user ? (
                    <>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                    </>
                ) : (
                    <p>Loading ...</p>
                )
            }
            <div>
                <h2>Update User</h2>

                <form onSubmit={UserUpdation}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Update</button>
                </form>
            </div>
            <button onClick={UserDeletion}>Delete</button>
        </div>
    );
}

export default Profile;