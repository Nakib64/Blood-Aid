// Home.jsx

import { Link } from "react-router";

import {
	FiLogOut,
	FiUser,
	FiSearch,
	FiHeart,
	FiMenu,
	FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";

export default function Home() {

	/* ─────────────── navbar state ─────────────── */

	return (
		<div
			className="min-h-screen flex flex-col bg-white text-gray-800"
			data-theme="light"
		>
			
			{/* Banner */}
			<section className="bg-[url('https://i.ibb.co/cKnzxYZz/adrian-sulyok-s-ZO8-ILz-GKcg-unsplash-1.jpg')] bg-cover bg-center text-white py-32 text-center">
				<div className="bg-black/50 backdrop-blur-sm p-6">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Be the Lifeline: Donate Blood Today
					</h1>
					<div className="flex justify-center gap-6">
						<Link
							to="/search"
							className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition"
						>
							Search Donors
						</Link>
					</div>
				</div>
			</section>

			<div>
				{/* Featured Section */}
				<section className="py-20 bg-gray-50 max-w-7xl mx-auto">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-6">Why Donate Blood?</h2>
						<p className="max-w-2xl mx-auto text-gray-600 mb-12">
							Every drop counts. Your donation can save lives and support critical
							treatments in hospitals across the country. Join our community of heroes
							today.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
								<FiHeart className="text-4xl text-red-600 mb-4 mx-auto" />
								<h3 className="text-xl font-semibold mb-2">Save Lives</h3>
								<p className="text-gray-600">
									Your blood could be the reason someone gets another chance at life.
								</p>
							</div>
							<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
								<FiUser className="text-4xl text-red-600 mb-4 mx-auto" />
								<h3 className="text-xl font-semibold mb-2">Join a Cause</h3>
								<p className="text-gray-600">
									Be part of a selfless community committed to health and humanity.
								</p>
							</div>
							<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
								<FiSearch className="text-4xl text-red-600 mb-4 mx-auto" />
								<h3 className="text-xl font-semibold mb-2">Easy to Find</h3>
								<p className="text-gray-600">
									Connect with local donors or request blood easily using our platform.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Contact Us */}
				<section className="py-20 bg-white max-w-7xl mx-auto">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center">
							<form className="space-y-4">
								<input type="text" placeholder="Your Name" className="input" />
								<input type="email" placeholder="Your Email" className="input" />
								<textarea placeholder="Your Message" className="input h-32"></textarea>
								<button
									type="submit"
									className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
								>
									Send Message
								</button>
							</form>
							<div className="text-lg space-y-4">
								<p>
									<strong>Phone:</strong> +880 1234 567890
								</p>
								<p>
									<strong>Email:</strong> support@bloodbond.org
								</p>
								<p>
									<strong>Address:</strong> Dhaka, Bangladesh
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>

		
		</div>
	);
}
