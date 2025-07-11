import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { authContext } from "../Authentication/AuthContext";
import Loading from "../Loading/Loading";
import axios from "axios";

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(authContext);
	const [role, setRole] = useState(null);
	const [checking, setChecking] = useState(true); // local loading for role check
	const location = useLocation();

	useEffect(() => {
		const fetchRole = async () => {
			if (user?.email) {
				try {
					const res = await axios.get(`http://localhost:3000/users?email=${user.email}`);
					setRole(res.data.role);
				} catch (err) {
					console.error("Failed to fetch role", err);
				} finally {
					setChecking(false);
				}
			} else {
				setChecking(false);
			}
		};

		fetchRole();
	}, [user,location.pathname]);

	// Global auth loading or role checking in progress
	if (loading || checking) {
		return <Loading />;
	}

	if (role !== "donor") {
		return <>{children}</>;
	}

	// If admin
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
	
};

export default AdminRoute;
