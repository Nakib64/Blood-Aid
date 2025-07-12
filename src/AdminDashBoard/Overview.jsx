import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountUp from "react-countup";
import { FiUsers, FiCreditCard, FiDroplet } from "react-icons/fi";
import RecentUsers from "./RecentUsers";

// ✅ Fetch functions
const getTotalUsers = async () => {
	const { data } = await axios.get("http://localhost:3000/users");
	return data.length;
};

const getTotalDonationRequests = async () => {
	const { data } = await axios.get("http://localhost:3000/totalDonationRequests");
	return data;
};

const getTotalFunding = async () => {
	const { data } = await axios.get("http://localhost:3000/totalDonations");
	return data;
};

export default function AdminDashboard() {
	const {
		data: totalUsers,
		isLoading: usersLoading,
		isError: usersError,
	} = useQuery({ queryKey: ["users-count"], queryFn: getTotalUsers });

	const {
		data: totalDonations,
		isLoading: donationsLoading,
		isError: donationsError,
	} = useQuery({ queryKey: ["donation-requests-count"], queryFn: getTotalDonationRequests });

	const {
		data: fund,
		isLoading: fundLoading,
		isError: fundError,
	} = useQuery({ queryKey: ["total-funding"], queryFn: getTotalFunding });

	return (
		<main className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 space-y-6">
			<section className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{/* Total Users */}
				<Card
					icon={<FiUsers size={28} />}
					color="red"
					value={usersLoading ? 0 : totalUsers}
					label="Total Users (Donors)"
				/>

				{/* Total Funding */}
				<Card
					icon={<FiCreditCard size={28} />}
					color="green"
					value={fundLoading ? 0 : fund / 100}
					label="Total Funding (BDT)"
					prefix="BDT "
				/>

				{/* Donation Requests */}
				<Card
					icon={<FiDroplet size={28} />}
					color="red"
					value={donationsLoading ? 0 : totalDonations}
					label="Donation Requests"
				/>
			</section>

			<RecentUsers />
		</main>
	);
}

function Card({ icon, color, value, label, prefix = "" }) {
	return (
		<div
			className="bg-white rounded-2xl p-6 flex items-center gap-6 border border-gray-100 transition duration-300"
			style={{
				boxShadow: "inset 0 4px 12px rgba(0,0,0,0.06), inset 0 -2px 6px rgba(0,0,0,0.04)",
			}}
		>
			<div className={`bg-${color}-100 text-${color}-600 p-4 rounded-full shadow-inner`}>
				{icon}
			</div>
			<div>
				<p className="text-4xl font-semibold text-gray-900">
					<CountUp end={parseFloat(value) || 0} duration={2} />{" "}
				</p>
				<p className="text-gray-500 text-sm tracking-widest uppercase font-medium mt-1">
					{label}
				</p>
			</div>
		</div>
	);
}
