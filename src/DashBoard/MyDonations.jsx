import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { authContext } from "../Authentication/AuthContext";

export default function MyDonations() {
	const { user } = useContext(authContext);
	const [donations, setDonations] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
	
		axios
			.get(`http://localhost:3000/myDonations?email=${user.email}`)
			.then((res) => {
				setDonations(res.data);
				setLoading(false);
			});
	}, [user, donations]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="px-4 sm:px-6 md:px-6 py-10 max-w-6xl mx-auto"
		>
			<h2 className="text-3xl font-bold text-center text-red-700 mb-8">
				🩸 My Donations
			</h2>

			{loading ? (
				<div className="flex justify-center items-center h-48">
					<Loader2 className="animate-spin text-red-600 w-10 h-10" />
				</div>
			) : donations.length === 0 ? (
				<p className="text-center text-gray-500">You haven’t donated yet.</p>
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{donations.map((donation) => (
						<motion.div
							key={donation._id}
							whileHover={{ scale: 1.02 }}
							className="bg-gradient-to-br from-white to-red-50 border border-gray-200 rounded-2xl shadow-lg p-6 space-y-2 transition-all"
						>
							<h3 className="text-lg font-semibold text-red-700">
								{donation.recipientName}
							</h3>
							<p className="text-sm text-gray-600">
								<strong>Location:</strong> {donation.recipientUpazila},{" "}
								{donation.recipientDistrict}
							</p>
							<p className="text-sm text-gray-600">
								<strong>Blood Group:</strong> {donation.bloodGroup}
							</p>
							<p className="text-sm text-gray-600">
								<strong>Date:</strong> {donation.donationDate}
							</p>
							<p className="text-sm text-gray-600">
								<strong>Time:</strong> {donation.donationTime}
							</p>
							<p className="text-sm text-gray-600">
								<strong>Email: </strong> {donation.requesterEmail}
							</p>
							
						</motion.div>
					))}
				</div>
			)}
		</motion.div>
	);
}
