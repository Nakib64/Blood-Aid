import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authContext } from "../Authentication/AuthContext";
import RecentMyDonations from "./Recent";
import axios from "axios";
import Loading from "../Loading/Loading";
import AdminDashboard from "../AdminDashBoard/Overview";
const Welcome = () => {
	const { user } = useContext(authContext);
	const [role, setRole] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (user?.email) {
			axios.get(`http://localhost:3000/users?email=${user.email}`).then((res) => {
				const userRole = res.data.role;
				setRole(userRole);
				setLoading(false);
			});
		}
	}, [user]);

	if (loading) {
		return <Loading></Loading>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-7xl mx-auto mb-8 space-y-6"
		>
			<div className="bg-gradient-to-r from-red-100 to-red-50 p-6 rounded-xl shadow flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-red-700">
						Welcome,{" "}
						<span className="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent font-bold tracking-wide uppercase">
							{role !== "donor" && role.toUpperCase()}
						</span>{" "}
						{user?.displayName || "User"}!
					</h1>
					{role === "donor" && (
						<p className="text-gray-600 mt-1">
							Manage your donations and help save lives.
						</p>
					)}
          <p className="text-gray-600 mt-1">
						Manage your users and donations to help save lives.
					</p>
				</div>
				<img
					src={user.photoURL}
					alt="donate"
					className="w-20 md:w-28 h-20 md:h-28 drop-shadow rounded-full"
				/>
			</div>
      {role !== "donor" && <AdminDashboard></AdminDashboard>}
      {role == "donor" && <RecentMyDonations></RecentMyDonations> }
			
		</motion.div>
	);
};

export default Welcome;
