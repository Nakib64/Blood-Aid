import React, { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../Authentication/AuthContext";
import logo from "../../assets/pngegg.png";
import { Link, useLocation } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [, setDropdownOpen] = useState(false);
	const dropdownRef = useRef();
	const { user } = useContext(authContext);
	const location = useLocation();

	useEffect(() => {
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const NavLink = ({ to, label }) => (
		<Link
			to={to}
			className={`relative text-center px-3 py-2 rounded-md font-medium transition duration-200 ease-in-out hover:bg-red-700 hover:text-white ${
				location.pathname === to ? "bg-red-900 text-white" : "text-white"
			}`}
		>
			{label}
		</Link>
	);

	const NavLinks = () => (
		<div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
			<NavLink to="/donationRequests" label="Donation Requests" />
			<NavLink to="/blogs" label="Blog" />
			{user && <NavLink to="/funding" label="Funding" />}
		</div>
	);

	return (
		<motion.nav
			initial={{ y: -50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="bg-red-800 text-white shadow sticky top-0 z-50"
		>
			<div className="w-full mx-auto px-4 py-1 flex items-center justify-between">
				<Link to="/" className="text-2xl font-bold flex items-center gap-2">
					<img src={logo} alt="logo" className="h-12 w-12" />
					<span className="hover:text-red-300 transition-colors duration-300">
						BloodAid
					</span>
				</Link>

				<div className="hidden md:flex gap-6 justify-end">
					<NavLinks />
				</div>

				<div className="flex items-center gap-4 md:gap-6">
					{user ? (
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger asChild>
									<Link to="/dashboard">
										<motion.img
											whileHover={{ scale: 1.05 }}
											src={user.photoURL || "/default-avatar.png"}
											alt="avatar"
											className="w-12 h-12 rounded-full border-2 border-white cursor-pointer shadow-md"
										/>
									</Link>
								</Tooltip.Trigger>
								<Tooltip.Content
									side="left"
									className="bg-black text-white px-2 py-1 rounded text-sm"
								>
									Dashboard
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					) : (
						<div className="flex gap-4">
							<NavLink to="/authentication/login" label="Login" />
							<NavLink to="/authentication/register" label="Register" />
						</div>
					)}

					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="md:hidden text-2xl"
						aria-label="Toggle menu"
					>
						{menuOpen ? <FiX /> : <FiMenu />}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-red-900 text-white px-4 py-4 space-y-2 shadow"
					>
						<NavLinks />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
};

export default Navbar;
