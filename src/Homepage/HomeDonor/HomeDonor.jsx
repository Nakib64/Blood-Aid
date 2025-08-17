import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import DonorCard from "./DonorCard";

export default function HomeDonors() {
	const limit = 9;

	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () =>
			//
			axios
				.get("https://blood-aid-server-eight.vercel.app/SearchedUsers", {
					//https://blood-aid-server-eight.vercel.app/SearchedUsers
					params: { limit },
				})
				.then((res) => res.data),
		keepPreviousData: true,
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full mx-auto"
		>
			{/* Title */}
			<div className="p-8 space-y-6 max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-black text-center">
					Recent Blood Donors
				</h2>
			</div>

			{/* Loader */}
			{isLoading ? (
				<div className="flex justify-center items-center h-48">
					<Loader2 className="animate-spin text-red-600 w-10 h-10" />
				</div>
			) : data?.users?.length > 0 ? (
				<div className="max-w-7xl mx-auto py-6 ">
					<Marquee pauseOnHover speed={100}  className="gap-10">
						{data?.users?.map((donor) => (
							<DonorCard donor={donor}></DonorCard>
						))}
					</Marquee>
				</div>
			) : (
				<p className="text-center text-gray-500 mt-10">No donors found.</p>
			)}
		</motion.div>
	);
}
