import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const DonorCard = ({donor}) => {
	return (
		<div
			
			className="bg-white/80 shadow  border-none rounded-3xl mx-6 transition-all duration-300 p-6 relative overflow-hidden group"
		>
		

			{/* Donor Header */}
			<div className="flex items-center gap-4 relative z-10 ">
				<img
					src={
						donor.avatar ||
						"https://i.ibb.co/wZvczmCJ/ana-nichita-BI91-Nrpp-E38-unsplash-1.jpg"
					}
					alt={donor.name}
					className="w-16 h-16 object-cover rounded-full ring-2 ring-red-500 shadow"
				/>
				<div>
					<h3
						className="text-xl font-bold text-red-700 truncate overflow-hidden whitespace-nowrap
"
					>
						{donor.name}
					</h3>
					<p className="text-sm text-gray-500 capitalize">{donor.role}</p>
				</div>
			</div>

			{/* Donor Info */}
			<div className="mt-4 space-y-2 text-gray-700 text-sm relative z-10 ">
				<p>
					<span
						className="font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap
"
					>
						🩸 Blood Group:
					</span>{" "}
					{donor.bloodGroup}
				</p>
				<p>
					<span
						className="font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap max-w-full
"
					>
						📍 Location:
					</span>{" "}
					{donor.upazila}, {donor.district}
				</p>
				<p>
					<span
						className="font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap
"
					>
						📧 Email:
					</span>{" "}
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
		</div>
	);
};

export default DonorCard;
