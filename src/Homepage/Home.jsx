// Home.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { authContext } from "../Authentication/AuthContext";
import {
	FiLogOut,
	FiUser,
	FiSearch,
	FiHeart,
	FiMenu,
	FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../assets/pngegg.png";
export default function Home() {
	const { user  } = useContext(authContext);
	/* ─────────────── navbar state ─────────────── */
	const [menuOpen, setMenuOpen] = useState(false);
	const [ setDropdownOpen] = useState(false);
	const dropdownRef = useRef();

	/* close dropdown when clicking outside */
	useEffect(() => {
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	/* helper links rendered for both mobile & desktop */
	const NavLinks = () => (
		<>
			<Link to="/requests" className="block md:inline-block  font-medium">
				Donation Requests
			</Link>
			<Link to="/blog" className="block md:inline-block  font-medium">
				Blog
			</Link>
			{user && (
				<Link to="/funding" className="block md:inline-block  font-medium">
					Funding
				</Link>
			)}
		</>
	);

	return (
		<div
			className="min-h-screen flex flex-col bg-white text-gray-800"
			data-theme="light"
		>
			{/* Navbar */}
			<nav className="bg-red-600 text-white shadow sticky top-0 z-50">
				<div className="container mx-auto px-4 py-3 flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="text-2xl font-bold  flex gap-1 items-center">
						<img src={logo} alt="logo" className="h-10 w-10" /> BloodAid
					</Link>

					<div className="hidden md:flex gap-6 justify-end">
						<NavLinks></NavLinks>
					</div>

					{/* Right side: avatar / login + hamburger */}
					<div className="flex items-center gap-4 md:gap-6">
						{/* avatar OR login link – ALWAYS visible */}
						{user ? (
							<div className="relative">
								<Link to={'/dashboard'}>
									<button className="flex items-center">
										<img
											src={user.photoURL || "/default-avatar.png"}
											alt="avatar"
											className="w-9 h-9 rounded-full border cursor-pointer"
										/>
									</button>
								</Link>
							</div>
						) : (
							<div className="flex gap-6">
								<Link to="/authentication/login" className=" font-medium">
									Login
								</Link>
								<Link to="/authentication/register" className=" font-medium">
									Register
								</Link>
							</div>
						)}

						{/* Hamburger – shown only on small screens */}
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="md:hidden text-2xl"
							aria-label="Toggle menu"
						>
							{menuOpen ? <FiX /> : <FiMenu />}
						</button>
					</div>
				</div>

				{/* Collapsible menu (links only) */}
				<div
					className={
						`md:hidden bg-white text-gray-500 text-left md:bg-transparent shadow md:shadow-none px-4 md:px-0 ${{
							false: "",
						}}` + (menuOpen ? " block py-4" : " hidden md:flex")
					}
				>
					<NavLinks />
				</div>
			</nav>
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

			{/* Footer */}
			<footer className="bg-red-600 text-gray-100 py-8 mt-auto">
				<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-bold text-white mb-2">BloodBond</h3>
						<p>Connecting lifesavers with those in need. Join our community today.</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-2">Quick Links</h4>
						<ul className="space-y-1">
							<li>
								<Link to="/" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link to="/blog" className="hover:underline">
									Blog
								</Link>
							</li>
							<li>
								<Link to="/search" className="hover:underline">
									Search Donors
								</Link>
							</li>
							<li>
								<Link to="/authentication/login" className="hover:underline">
									Login
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-2">Follow Us</h4>
						<p>Stay updated on our campaigns and blood drives.</p>
					</div>
				</div>
				<div className="text-center text-sm mt-8">
					&copy; 2025 BloodBond. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
