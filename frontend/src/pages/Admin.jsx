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

    return (
        <div>
            {
                users.map(item =>
                (<div key={item._id}><h3>
                    Name: {item.name}
                    Email: {item.email}
                </h3></div>)
                )
            }
        </div >
    );
}