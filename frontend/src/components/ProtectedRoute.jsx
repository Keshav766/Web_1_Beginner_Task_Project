import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
    const { token } = useAuth();

    if (!token && localStorage.getItem("token") === null) {
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;