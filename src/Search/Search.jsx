import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Users } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

export default function SearchDonors() {
	const [districts, setDistricts] = useState([]);
	const [upazilas, setUpazilas] = useState([]);
	const [bloodGroup, setBloodGroup] = useState("");
	const [district, setDistrict] = useState("");
	const [upazila, setUpazila] = useState("");
	const [page, setPage] = useState(1);
	const limit = 6;

	useEffect(() => {
		axios.get("/bd_districts_with_upazilas.json").then((res) => {
			setDistricts(res.data);
		});
	}, []);

	useEffect(() => {
		const found = districts.find((d) => d.district === district);
		setUpazilas(found ? found.upazilas : []);
		setUpazila("");
	}, [district, districts]);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["users", bloodGroup, district, upazila, page],
		queryFn: () =>
			axios
				.get("http://localhost:3000/SearchedUsers", {
					params: { bloodGroup, district, upazila, page, limit },
				})
				.then((res) => res.data),
		keepPreviousData: true, // Smooth UI while loading next page
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full mx-auto px-4 py-10 min-h-screen bg-[url('https://i.ibb.co/zWj10frv/nguy-n-hi-p-ma-Ye-Ml3x-Cr-Y-unsplash.jpg')] bg-cover bg-no-repeat"
		>
			{/* Form */}
			<div className="  p-8 space-y-6 max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-red-700 text-center">
					🔍 Search Blood Donors
				</h2>

				<form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<select
						value={bloodGroup}
						onChange={(e) => setBloodGroup(e.target.value)}
						className="input"
					>
						<option value="">Select Blood Group</option>
						{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
							<option key={bg} value={bg}>
								{bg}
							</option>
						))}
					</select>

					<select
						value={district}
						onChange={(e) => setDistrict(e.target.value)}
						className="input"
					>
						<option value="">Select District</option>
						{districts.map((d) => (
							<option key={d.district_id} value={d.district}>
								{d.district}
							</option>
						))}
					</select>

					<select
						value={upazila}
						onChange={(e) => setUpazila(e.target.value)}
						className="input"
					>
						<option value="">Select Upazila</option>
						{upazilas.map((u) => (
							<option key={u.id} value={u.name}>
								{u.name}
							</option>
						))}
					</select>
				</form>

				<div className="text-center">
					<button
						onClick={refetch()}
						className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 shadow-md transition"
					>
						Search
					</button>
				</div>
			</div>

			{/* Results */}
			{isLoading ? (
				<div className="flex justify-center items-center h-48">
					<Loader2 className="animate-spin text-red-600 w-10 h-10" />
				</div>
			) : data?.users?.length > 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-7xl mx-auto px-4"
				>
					{data?.users?.map((donor) => (
						<motion.div
							key={donor._id}
							whileHover={{ scale: 1.03 }}
							transition={{ type: "spring", stiffness: 120 }}
							className="bg-white/80 backdrop-blur-md border border-red-100 rounded-3xl shadow-lg hover:shadow-red-200 hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden group"
						>
							{/* Floating Blob */}
							<div className="absolute -top-10 -right-10 w-32 h-32 bg-red-200 opacity-10 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform duration-500" />

							{/* Donor Header */}
							<div className="flex items-center gap-4 relative z-10">
								<img
									src={
										donor.avatar ||
										"https://i.ibb.co/wZvczmCJ/ana-nichita-BI91-Nrpp-E38-unsplash-1.jpg"
									}
									alt={donor.name}
									className="w-16 h-16 object-cover rounded-full ring-2 ring-red-500 shadow"
								/>
								<div>
									<h3 className="text-xl font-bold text-red-700">{donor.name}</h3>
									<p className="text-sm text-gray-500 capitalize">{donor.role}</p>
								</div>
							</div>

							{/* Donor Info */}
							<div className="mt-4 space-y-2 text-gray-700 text-sm relative z-10">
								<p>
									<span className="font-semibold text-gray-800">🩸 Blood Group:</span>{" "}
									{donor.bloodGroup}
								</p>
								<p>
									<span className="font-semibold text-gray-800">📍 Location:</span>{" "}
									{donor.upazila}, {donor.district}
								</p>
								<p>
									<span className="font-semibold text-gray-800">📧 Email:</span>{" "}
									{donor.email}
								</p>
							</div>

							{/* Button */}
							<div className="mt-6 relative z-10">
								<Link to={`/donor/${donor._id}`}>
									<button className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 duration-300">
										View Profile
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
											/>
										</svg>
									</button>
								</Link>
							</div>
						</motion.div>
					))}
				</motion.div>
			) : data?.users?.length === 0 && bloodGroup ? (
				<p className="text-center text-gray-500 mt-10">No donors found.</p>
			) : null}

			<div className="flex justify-center mt-10 gap-2">
				<button
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					disabled={page === 1}
					className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
				>
					Prev
				</button>

				<span className="px-4 py-2 bg-white border rounded text-red-700 font-bold">
					Page {page}
				</span>

				<button
					onClick={() => {
						const maxPage = Math.ceil(data?.total / limit);
						if (page < maxPage) setPage((p) => p + 1);
					}}
					disabled={page >= Math.ceil(data?.total / limit)}
					className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</motion.div>
	);
}
