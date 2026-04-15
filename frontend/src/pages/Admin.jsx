import { useEffect, useState } from "react";
import API from "../services/api";

export function Admin() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchAllUsers() {
            const res = await API.get("/admin/user");
            console.log("RESPONSE : ", res.data);
            setUsers(res.data.data);
        }
        fetchAllUsers();
    }, [])

    const handleUserDeletion = async (id) => {
        try {
            await API.delete(`/admin/user/${id}`);

            setUsers(preuser => preuser.filter(user => user._id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleUserUpdation = (user) => {
        setSelectedUser(user);
        setName(user.name);
        setEmail(user.email);
        setIsModalOpen(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await API.patch(`/admin/user/${selectedUser._id}`, {
                name, email
            });

            const updatedUser = res.data.data;

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === updatedUser._id ? updatedUser : user
                )
            );

            setIsModalOpen(false);
            selectedUser(null);

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            {
                users.map(item =>
                (<div key={item._id}><h3>
                    Name: {item.name}
                    Email: {item.email}
                    <button onClick={() => { handleUserDeletion(item._id) }}>Delete</button>
                    <button onClick={() => { handleUserUpdation(item) }}>Edit</button>
                </h3></div>)
                )
            }
            {isModalOpen && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "8px"
                    }}>
                        <h2>Edit User</h2>

                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div >
    );
}