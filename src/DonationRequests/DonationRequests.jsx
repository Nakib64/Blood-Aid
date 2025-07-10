import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function PendingDonationRequests() {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [bloodGroup, setBloodGroup] = useState("");
	const [district, setDistrict] = useState("");
	const [sort, setSort] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:3000/donationRequests", {
				params: {
					status: "pending",
					page,
					limit: 6,
					bloodGroup,
					district,
					sort,
				},
			})
			.then((res) => {
				setRequests(res.data.data);
				setTotalPages(res.data.totalPages || 1);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [page, bloodGroup, district, sort]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto w-full"
		>
			<h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-red-700">
				🩸 Public Blood Donation Requests
			</h2>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 justify-center">
				<input
					type="text"
					placeholder="Search by District"
					value={district}
					onChange={(e) => {
						setDistrict(e.target.value);
						setPage(1);
					}}
					className="border px-3 py-2 rounded-lg focus:ring-0 focus:outline-none shadow-md border-gray-200 flex-1"
				/>
				<select
					value={bloodGroup}
					onChange={(e) => {
						setBloodGroup(e.target.value);
						setPage(1);
					}}
					className="border px-3 py-2 text-gray-500 rounded-lg focus:outline-none focus:ring-0 shadow-md border-gray-200"
				>
					<option value="" className="text-gray-200">
						All Blood Groups
					</option>
					{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
						<option key={bg} value={bg}>
							{bg}
						</option>
					))}
				</select>

				<select
					value={sort}
					onChange={(e) => {
						setSort(e.target.value);
						setPage(1);
					}}
					className="border px-3 text-gray-500 py-2 rounded-lg shadow-md border-gray-200"
				>
					<option value="" className="text-gray-200">
						Sort by Date
					</option>
					<option value="asc">Oldest First</option>
					<option value="desc">Newest First</option>
				</select>
			</div>

			{loading ? (
				<div className="flex justify-center items-center h-48">
					<Loader2 className="animate-spin text-red-600 w-10 h-10" />
				</div>
			) : requests.length === 0 ? (
				<p className="text-center text-gray-500">
					No pending donation requests found.
				</p>
			) : (
				<>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{requests.map((req) => (
							<motion.div
								key={req._id}
								whileHover={{ scale: 1.03 }}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="rounded-xl shadow-lg border border-gray-200 p-6 space-y-3 bg-gradient-to-br from-white via-gray-50 to-red-50 hover:shadow-xl transition-all duration-300"
							>
								<h3 className="text-xl font-semibold text-red-700">
									{req.recipientName}
								</h3>
								<p className="text-sm text-gray-700">
									<strong>Location:</strong> {req.recipientUpazila},{" "}
									{req.recipientDistrict}
								</p>
								<p className="text-sm text-gray-700">
									<strong>Blood Group:</strong> {req.bloodGroup}
								</p>
								<p className="text-sm text-gray-700">
									<strong>Date:</strong> {req.donationDate}
								</p>
								<p className="text-sm text-gray-700">
									<strong>Time:</strong> {req.donationTime}
								</p>
								<Link
									to={`/donationRequests/${req._id}`}
									className="mt-3 inline-block bg-red-600 text-white text-sm px-5 py-2 rounded-md hover:bg-red-700 transition"
								>
									View Details
								</Link>
							</motion.div>
						))}
					</div>

					{/* Pagination */}
					<div className="flex justify-center mt-10 gap-2">
						{[...Array(totalPages)].map((_, i) => (
							<button
								key={i}
								onClick={() => setPage(i + 1)}
								className={`w-9 h-9 rounded-full font-medium transition-all shadow-md border border-gray-300 ${
									page === i + 1
										? "bg-red-600 text-white"
										: "bg-white text-gray-700 hover:bg-gray-100"
								}`}
							>
								{i + 1}
							</button>
						))}
					</div>
				</>
			)}
		</motion.div>
	);
}
