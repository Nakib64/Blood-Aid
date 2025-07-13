import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { authContext } from "../Authentication/AuthContext";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUserRole = async (email) => {
	const res = await axios.get(`https://blood-aid-server-eight.vercel.app/users?email=${email}`);
	return res.data.role;
};

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(authContext);
	const location = useLocation();

	const {
		data: role,
		isLoading: roleLoading,
		isError,
	} = useQuery({
		queryKey: ["userRole", user?.email],
		enabled: !!user?.email, // only run query if email exists
		queryFn: () => fetchUserRole(user.email),
	});

	if (loading || roleLoading) return <Loading />;
	if (isError) return <Navigate to="/forbidden" state={{ from: location }} replace />;

	// Only allow non-donor roles
	if (role !== "donor") {
		return <>{children}</>;
	}

	// If donor, redirect
	return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;
