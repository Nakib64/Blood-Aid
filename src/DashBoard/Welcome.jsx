import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";

import { authContext } from "../Authentication/AuthContext";
import Loading from "../Loading/Loading";
import AdminDashboard from "../AdminDashBoard/Overview";
import RecentMyDonations from "./Recent";
import UseAxios from "../Hooks/UseAxios";

const Welcome = () => {
	const { user } = useContext(authContext);
	const email = user?.email;
	const axiosSecure = UseAxios();
	const {
		data: role,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["user-role", email],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/users?email=${email}`);
			return data.role;
		},
		enabled: !!email,
	});

	if (isLoading || !email) return <Loading />;
	if (isError)
		return <p className="text-center text-red-500">Failed to load user role.</p>;

	const isDonor = role === "donor";
	const displayName = user?.displayName || "User";
	const photo = user?.photoURL || "/default-user.png";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-7xl mx-auto mb-8 space-y-6"
		>
			{/* Welcome Banner */}
			<div className="bg-gradient-to-r from-red-100 to-red-50 p-6 rounded-xl shadow flex items-center justify-between flex-col sm:flex-row gap-4">
				<div>
					<h1 className="text-3xl font-bold text-red-700">
						Welcome,{" "}
						<span className="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent font-bold tracking-wide uppercase">
							{!isDonor && role.toUpperCase()}
						</span>{" "}
						{displayName}!
					</h1>
					<p className="text-gray-600 mt-1">
						{isDonor
							? "Manage your donations and help save lives."
							: "Manage your users and donations to help save lives."}
					</p>
				</div>
				<img
					src={photo}
					alt="User"
					className="w-20 md:w-28 h-20 md:h-28 object-cover drop-shadow rounded-full border-2 border-red-200"
				/>
			</div>

			{/* Role-Based Section */}
			{isDonor ? <RecentMyDonations /> : <AdminDashboard />}
		</motion.div>
	);
};

export default Welcome;
