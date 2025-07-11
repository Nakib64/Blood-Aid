import React from "react";
import { motion } from "framer-motion";
import { LockKeyhole, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Forbidden() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-gray-50 to-red-50 px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center border border-gray-200"
			>
				<motion.div
					initial={{ scale: 0.5 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
					className="bg-red-100 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6 shadow-md"
				>
					<LockKeyhole className="text-red-600" size={40} />
				</motion.div>

				<h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
				<p className="text-gray-600 mb-6 text-sm">
					Sorry, you don't have permission to access this page or perform this action.
				</p>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => navigate("/")}
					className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full shadow-lg transition"
				>
					<ArrowLeft size={16} />
					Go Home
				</motion.button>
			</motion.div>
		</div>
	);
}
