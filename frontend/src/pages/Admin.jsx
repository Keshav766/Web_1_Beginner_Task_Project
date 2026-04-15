import { useEffect, useState } from "react";
import API from "../services/api";

export function Admin() {
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            {
                users.map(item =>
                (<div key={item._id}><h3>
                    Name: {item.name}
                    Email: {item.email}
                    <button onClick={() => { handleUserDeletion(item._id) }}>Delete</button>
                </h3></div>)
                )
            }
        </div >
    );
}