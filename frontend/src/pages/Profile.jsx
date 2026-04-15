import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await API.get("/user/profile");
                setUser(res.data.data);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchProfile();
    }, []);

    async function UserUpdation(e) {
        e.preventDefault();
        try {
            const res = await API.patch("/user/update", {
                name, email, password
            })
            setUser(res.data.data);
            setName("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err.message);
        }
    }

    async function UserDeletion() {
        try {
            await API.delete("/user/delete")
        } catch (err) {
            console.log(err.message);
        } finally {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/");
        }
    }

    function DisplayAdmin() {
        navigate("/admin");
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

            {
                user && user.role === "admin" && <button onClick={DisplayAdmin}>Admin Pannel</button>
            }


        </div>
    );
}

export default Profile;