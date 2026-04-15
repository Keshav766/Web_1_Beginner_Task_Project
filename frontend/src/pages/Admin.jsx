import { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

export function Admin() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

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
            setSelectedUser(null);

        } catch (err) {
            console.log(err.message);
        }
    }

    const handleUserCreation = () => {
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setIsModalOpen2(true);
    }

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/admin/user", {
                name, email, password, role
            })
            const user = res.data.data;

            setUsers(prev => [...prev, user]);

            setIsModalOpen2(false);

        } catch (err) {
            console.log(err.message);
        }

    }

    return (
        <div>
            {isModalOpen2 && (
                <div className="modal-overlay">
                    <div className="modal" >
                        <h2>Create User</h2>
                        <form onSubmit={handleCreate}>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Role</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsModalOpen2(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <button onClick={handleUserCreation}>Create New User</button>
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
                <div className="modal-overlay" >
                    <div className="modal" >
                        < h2 > Edit User</h2>

                        <form onSubmit={handleUpdate}>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div >
            )
            }

        </div >
    );
}