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
			.get("https://blood-aid-server-eight.vercel.app/donationRequests", {
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
			className="px-4 sm:px-6 md:px-10 py-6 mx-auto w-full min-h-screen bg-[url('https://i.ibb.co/7JySbmCy/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg')] bg-cover "
		>
			<div className="max-w-7xl mx-auto pt-20">
				<h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white">
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
						className="border px-3 py-2 rounded-lg focus:ring-0 focus:outline-none shadow-md bg-white border-gray-200 flex-1"
					/>
					<select
						value={bloodGroup}
						onChange={(e) => {
							setBloodGroup(e.target.value);
							setPage(1);
						}}
						className="border px-3 py-2 text-gray-500 rounded-lg focus:outline-none focus:ring-0 shadow-md border-gray-200 bg-white"
					>
						<option value="" className="text-gray-200 ">
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
						className="border px-3 text-gray-500 py-2 rounded-lg shadow-md bg-white border-gray-200"
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
						{/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center mt-10 gap-2 items-center flex-wrap">
    {/* Prev */}
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm disabled:opacity-40 bg-white"
    >
      Prev
    </button>

    {/* Page numbers */}
    {getVisiblePages(page, totalPages).map((p) => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`w-9 h-9 rounded-full font-medium transition-all shadow-md border ${
          page === p
            ? "bg-red-600 text-white border-red-600"
            : "bg-white text-gray-700 hover:-100 border-gray-300"
        }`}
      >
        {p}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm disabled:opacity-40 bg-white"
    >
      Next
    </button>
  </div>
)}

					</>
				)}
			</div>
		</motion.div>
	);
}
function getVisiblePages(currentPage, totalPages) {
  const maxButtons = 5;
  let start = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
  let end = start + maxButtons - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxButtons + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
