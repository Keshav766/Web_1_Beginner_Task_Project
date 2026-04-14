import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
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
        </div>
    );
}

export default Profile;