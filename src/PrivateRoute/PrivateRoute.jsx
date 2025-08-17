import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import Loading from "../Loading/Loading";
import { authContext } from "../Authentication/AuthContext";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Hooks/UseAxios";

const PrivateRoute = ({ children }) => {
	const axiosSecure = UseAxios();

	const { user, loading } = useContext(authContext);
	const location = useLocation()

	const { data: donor, isLoading } = useQuery({
		queryKey: [user],
		queryFn: async () => {
			const res = await axiosSecure.get(`/users?email=${user?.email}`);
			return res.data;
		},
	});

	if (loading ) {
		return <Loading></Loading>;
	}
	

	if (!user) {
		return (
			<Navigate state={location.pathname} to={"/authentication/login"}></Navigate>
		);
	}

    if (isLoading ) {
		return <Loading></Loading>;
	}
    if (donor) {
		return <>{children}</>;
	}
};

export default PrivateRoute;
