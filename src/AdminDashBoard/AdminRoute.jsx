import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { authContext } from "../Authentication/AuthContext";
import Loading from "../Loading/Loading";

import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Hooks/UseAxios";



const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(authContext);
	const location = useLocation();
	const axiosSecure = UseAxios()
	const {
		data: role,
		isLoading: roleLoading,
		isError,
	} = useQuery({
		queryKey: ["userRole", user?.email],
		enabled: !!user?.email, // only run query if email exists
		queryFn: async() => {
			const res = await axiosSecure.get(`/users?email=${user.email}`);
	return res.data.role;
		}
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
