import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
function ProtectedRoute() {
    const [user, setUser] = useState(true);
    const token = Cookies.get("jwt");
    const location = useLocation();
    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                setUser(false);
            } else {
                setUser(true);
            }
        } else {
            setUser(false);
        }
    }, [token]);
    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/admin" state={{ from: location }} replace />
    );
}

export default ProtectedRoute;
