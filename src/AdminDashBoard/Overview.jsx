import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FiUsers, FiCreditCard, FiDroplet } from "react-icons/fi";
import RecentUsers from "./RecentUsers";

export default function AdminDashboard() {
	
	
	const [totalUsers, setTotalUsers] = useState();
	const [totalDonations, setTotalDonations] = useState();

	useEffect(() => {
		axios.get("http://localhost:3000/users").then((res) => {
			setTotalUsers(res.data.length);
		});
		axios.get("http://localhost:3000/totalDonationRequests").then((res) => {
			setTotalDonations(res.data);
		});
	}, [totalUsers]);

	return (
		<main className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 space-y-6">
			{/* Stats Cards */}
			<section className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{/* Total Users */}
				<div
					className="bg-white rounded-2xl p-6 flex items-center gap-6 border border-gray-100 transition duration-300"
					style={{
						boxShadow:
							"inset 0 4px 12px rgba(0,0,0,0.06), inset 0 -2px 6px rgba(0,0,0,0.04)",
					}}
				>
					<div className="bg-red-100 text-red-600 p-4 rounded-full shadow-inner">
						<FiUsers size={28} className="drop-shadow-sm" />
					</div>
					<div>
						<p className="text-4xl font-semibold text-gray-900"><CountUp end={totalUsers} duration={4}></CountUp></p>
						<p className="text-gray-500 text-sm tracking-widest uppercase font-medium mt-1">
							Total Users (Donors)
						</p>
					</div>
				</div>

				{/* Total Funding */}
				<div
					className="bg-white rounded-2xl p-6 flex items-center gap-6 border border-gray-100 transition duration-300"
					style={{
						boxShadow:
							"inset 0 4px 12px rgba(0,0,0,0.06), inset 0 -2px 6px rgba(0,0,0,0.04)",
					}}
				>
					<div className="bg-green-100 text-green-600 p-4 rounded-full shadow-inner">
						<FiCreditCard size={28} className="drop-shadow-sm" />
					</div>
					<div>
						<p className="text-4xl font-semibold text-gray-900">
							{/* {`$${totalFunding?.toLocaleString() || "0"}`} */}
						</p>
						<p className="text-gray-500 text-sm tracking-widest uppercase font-medium mt-1">
							Total Funding
						</p>
					</div>
				</div>

				{/* Total Donation Requests */}
				<div
					className="bg-white rounded-2xl p-6 flex items-center gap-6 border border-gray-100 transition duration-300"
					style={{
						boxShadow:
							"inset 0 4px 12px rgba(0,0,0,0.06), inset 0 -2px 6px rgba(0,0,0,0.04)",
					}}
				>
					<div className="bg-red-100 text-red-600 p-4 rounded-full shadow-inner">
						<FiDroplet size={28} className="drop-shadow-sm" />
					</div>
					<div>
						<p className="text-4xl font-semibold text-gray-900">
							<CountUp end={totalDonations} duration={4}></CountUp>
						</p>
						<p className="text-gray-500 text-sm tracking-widest uppercase font-medium mt-1">
							Donation Requests
						</p>
					</div>
				</div>
			</section>
			
			<RecentUsers></RecentUsers>
		</main>
	);
}
