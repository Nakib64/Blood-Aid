import React, { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../Authentication/AuthContext";
import logo from '../../assets/pngegg.png'
import { Link } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
	const [ setDropdownOpen] = useState(false);
	const dropdownRef = useRef();
    const {user} = useContext(authContext)
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
		<div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
			<Link to="/donationRequests" className="block md:inline-block py-1 md:py-0 text-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)] md:shadow-none font-medium">
				Donation Requests
			</Link>
			<Link to="/blog" className="block md:inline-block py-1 md:py-0 text-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)] md:shadow-none   font-medium">
				Blog
			</Link>
			{user && (
				<Link to="/funding" className="block text-center py-1 md:py-0 md:inline-block shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)] md:shadow-none  font-medium">
					Funding
				</Link>
			)}
		</div>)
	return (
	
			<nav className="bg-red-800 text-white shadow sticky top-0 z-50">
				<div className="container mx-auto px-4 py-3 flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="text-2xl font-bold  flex gap-1 items-center">
						<img src={logo} alt="logo" className="h-10 w-10" /> BloodAid
					</Link>

					<div className="hidden md:flex gap-6 justify-end ">
						<NavLinks></NavLinks>
					</div>

					{/* Right side: avatar / login + hamburger */}
					<div className="flex items-center gap-4 md:gap-6">
						{/* avatar OR login link – ALWAYS visible */}
						{user ? (
							<div className="relative">
								<Link to={"/dashboard"}>
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
	);
};

export default Navbar;
