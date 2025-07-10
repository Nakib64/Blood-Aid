import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

export default function SearchDonors() {
	const [districts, setDistricts] = useState([]);
	const [upazilas, setUpazilas] = useState([]);
	const [bloodGroup, setBloodGroup] = useState("");
	const [district, setDistrict] = useState("");
	const [upazila, setUpazila] = useState("");

	const [loading, setLoading] = useState(false);
	const [donors, setDonors] = useState([]);

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

	const handleSearch = () => {
		if (!bloodGroup || !district || !upazila) return;
		setLoading(true);
		axios
			.get("http://localhost:3000/users", {
				params: { bloodGroup, district, upazila },
			})
			.then((res) => setDonors(res.data))
			.finally(() => setLoading(false));
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-6xl mx-auto px-4 py-10 min-h-screen"
		>
			{/* Form */}
			<div className="bg-white shadow-xl rounded-xl border border-gray-100 p-8 space-y-6">
				<h2 className="text-3xl font-bold text-red-700 text-center">
					🔍 Search Blood Donors
				</h2>

				<form className="grid grid-cols-1 sm:grid-cols-3 gap-4" onChange={handleSearch}>
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
						onClick={handleSearch}
						className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 shadow-md transition"
					>
						Search
					</button>
				</div>
			</div>

			{/* Results */}
			{loading ? (
				<div className="flex justify-center items-center h-48">
					<Loader2 className="animate-spin text-red-600 w-10 h-10" />
				</div>
			) : donors.length > 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
				>
					{donors.map((donor) => (
						<motion.div
							key={donor._id}
							whileHover={{ scale: 1.03 }}
							transition={{ type: "spring", stiffness: 120 }}
							className="p-6 bg-gradient-to-br from-red-50 to-white rounded-3xl shadow-2xl border border-gray-100 space-y-4"
						>
							<h3 className="text-2xl font-bold text-red-700">{donor.name}</h3>

							<div className="space-y-1 text-gray-700 text-base">
								<p>
									<span className="font-semibold">Blood Group:</span> {donor.bloodGroup}
								</p>
								<p>
									<span className="font-semibold">Location:</span> {donor.upazila},{" "}
									{donor.district}
								</p>
								<p>
									<span className="font-semibold">Email:</span> {donor.email}
								</p>
							</div>

							<div className="pt-2">
								<Link to={`/donor/${donor._id}`}>
									<button className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg shadow transition">
										About
									</button>
								</Link>
							</div>
						</motion.div>
					))}
				</motion.div>
			) : donors.length === 0 && bloodGroup ? (
				<p className="text-center text-gray-500 mt-10">No donors found.</p>
			) : null}
		</motion.div>
	);
}
