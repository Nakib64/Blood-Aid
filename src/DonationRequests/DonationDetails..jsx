import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { authContext } from "../Authentication/AuthContext";
import { Slide, toast } from "react-toastify";

export default function DonationRequestDetails() {
	const { id } = useParams();
	const { user } = useContext(authContext);
	const navigate = useNavigate();
	const [request, setRequest] = useState(null);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [confirming, setConfirming] = useState(false);

	useEffect(() => {
		axios
			.get(`https://blood-aid-server-eight.vercel.app/donationRequest/${id}`)
			.then((res) => {
				setRequest(res.data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [id]);

	const handleConfirmDonation = (request) => {
		setConfirming(true);
		axios
			.patch(`https://blood-aid-server-eight.vercel.app/donationRequests/${id}`, {
				status: "inprogress",
				donorName: user.displayName,
				donorEmail: user.email,
			})
			.then(() => {

                request.donorName =user.displayName
                request.donorEmail = user.email
				axios.post(`https://blood-aid-server-eight.vercel.app/myDonations`, request).then(() => {
					navigate("/dashboard/myDonations");
                    	toast.success(
					<span className="flex items-center gap-2">
						<FiCheckCircle className="text-xl" />
						Added to my donation! 🎉
					</span>,
					{
						transition: Slide, // smooth slide‑down
						closeButton: false, // hide default close “x”
						hideProgressBar: false, // keep the colorful bar
					}
				);
				});
			})
			.finally(() => setConfirming(false));
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-[50vh]">
				<Loader2 className="animate-spin text-red-600 w-10 h-10" />
			</div>
		);
	}

	if (!request) {
		return <p className="text-center text-gray-500">Request not found.</p>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="px-4 sm:px-6 md:px-10 py-8 w-full min-h-screen bg-[url('https://i.ibb.co/7JySbmCy/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg')] bg-cover  mx-auto"
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4 }}
				className="bg-gradient-to-br max-w-4xl mx-auto from-red-100 to-white rounded-3xl my-20 shadow-2xl border border-gray-100 p-10 space-y-6"
			>
				<h2 className="text-3xl font-extrabold text-red-700 text-center tracking-tight">
					🩸 Donation Request Details
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-base">
					<p>
						<span className="font-semibold">Recipient Name:</span>{" "}
						{request.recipientName}
					</p>
					<p>
						<span className="font-semibold">Blood Group:</span> {request.bloodGroup}
					</p>
					<p>
						<span className="font-semibold">Location:</span>{" "}
						{request.recipientUpazila}, {request.recipientDistrict}
					</p>
					<p>
						<span className="font-semibold">Donation Date:</span>{" "}
						{request.donationDate}
					</p>
					<p>
						<span className="font-semibold">Donation Time:</span>{" "}
						{request.donationTime}
					</p>
					<p>
						<span className="font-semibold">Status:</span> {request.status}
					</p>
				</div>

				{request.status === "pending" && (
					<div className="text-center">
						<button
							onClick={() => setModalOpen(true)}
							className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-lg"
						>
							Donate
						</button>
					</div>
				)}
			</motion.div>
			{modalOpen && (
				<div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
					>
						<h3 className="text-xl font-semibold mb-4 text-center text-red-600">
							Confirm Donation
						</h3>
						<div className="space-y-3">
							<div>
								<label className="block text-sm font-medium mb-1">Donor Name</label>
								<input
									type="text"
									value={user.displayName}
									disabled
									className="w-full border px-3 py-2 rounded-md -100 focus:outline-none focus:ring-0 border-none"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Donor Email</label>
								<input
									type="email"
									value={user.email}
									disabled
									className="w-full border px-3 py-2 rounded-md -100 focus:outline-none focus:ring-0 border-none"
								/>
							</div>
							<div className="flex justify-end gap-2 mt-4">
								<button
									onClick={() => setModalOpen(false)}
									className="px-4 py-2 -300 rounded-md hover:-400"
								>
									Cancel
								</button>
								<button
									onClick={() => handleConfirmDonation(request)}
									disabled={confirming}
									className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
								>
									{confirming ? "Confirming..." : "Confirm"}
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</motion.div>
	);
}
