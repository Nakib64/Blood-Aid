import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { authContext } from "../Authentication/AuthContext";
import {
	LayoutDashboard,
	UserCircle,
	Droplets,
	PlusCircle,
	Menu,
	X,
	LogOut,
	Users,
	DollarSign,
	HeartPulse,
	SquareDashedKanban,
} from "lucide-react";
import logo from "../assets/pngegg.png";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function DashboardLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();
	const { logout, user } = useContext(authContext);
	const [links, setLinks] = useState([]);
	const navigate = useNavigate();

	// Fetch user role using React Query
	const { data: role } = useQuery({
		queryKey: ["user-role", user?.email],
		queryFn: async () => {
			if (!user?.email) return null;
			const res = await axios.get(
				`https://blood-aid-server-eight.vercel.app/users?email=${user.email}`
			);
			return res.data.role;
		},
		enabled: !!user?.email, // only run if user exists
		refetchInterval: 5000, // refetch role every 5 seconds to auto-update if changed
		refetchOnWindowFocus: true, // optional: refetch on tab focus
	});

	useEffect(() => {
		if (!role) return;

		if (role === "donor") {
			setLinks([
				{
					to: "/dashboard",
					label: "Overview",
					icon: <LayoutDashboard size={18} />,
				},
				{
					to: "/dashboard/profile",
					label: "Profile",
					icon: <UserCircle size={18} />,
				},
				{
					to: "/dashboard/my-donation-requests",
					label: "My Donation Requests",
					icon: <Droplets size={18} />,
				},
				{
					to: "/dashboard/create-donation-request",
					label: "Create Request",
					icon: <PlusCircle size={18} />,
				},
				{
					to: "/dashboard/myDonations",
					label: "My Donations",
					icon: <DollarSign size={18} />,
				},
			]);
		} else if (role === "admin") {
			setLinks([
				{
					to: "/dashboard",
					label: "Dashboard",
					icon: <LayoutDashboard size={18} />,
				},
				{
					to: "/dashboard/all-users",
					label: "Manage Users",
					icon: <Users size={18} />,
				},
				{
					to: "/dashboard/all-blood-donation-request",
					label: "All Donation Requests",
					icon: <HeartPulse size={18} />,
				},
				{
					to: "/dashboard/content-management",
					label: "Manage Contents",
					icon: <SquareDashedKanban size={18} />,
				},
				{
					to: "/dashboard/myDonations",
					label: "My Donations",
					icon: <DollarSign size={18} />,
				},
			]);
		} else {
			setLinks([
				{
					to: "/dashboard",
					label: "Dashboard",
					icon: <LayoutDashboard size={18} />,
				},

				{
					to: "/dashboard/all-blood-donation-request",
					label: "All Donation Requests",
					icon: <HeartPulse size={18} />,
				},
				{
					to: "/dashboard/content-management",
					label: "Manage Contents",
					icon: <SquareDashedKanban size={18} />,
				},
				{
					to: "/dashboard/myDonations",
					label: "My Donations",
					icon: <DollarSign size={18} />,
				},
			]);
		}
	}, [role]);

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Sidebar */}
			<aside
				className={`${
					sidebarOpen ? "w-7/10" : "w-0 md:w-3/10"
				} lg:w-2/10 bg-white shadow-md transition-all duration-300 fixed md:static inset-y-0 left-0 z-50 overflow-y-auto`}
			>
				<div className="flex items-center justify-between md:justify-start py-4 ">
					<Link
						to="/"
						className="text-2xl font-bold flex justify-start items-center text-red-600"
					>
						<img src={logo} alt="logo" className="h-9 w-9" /> BloodAid
					</Link>
					<button
						className="md:hidden text-2xl"
						onClick={() => setSidebarOpen(false)}
					>
						<X />
					</button>
				</div>
				<nav className="px-4 py-6 space-y-1">
					{links.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition hover:bg-red-500 ${
								location.pathname === link.to
									? "bg-red-600 text-white"
									: "text-gray-700"
							}`}
							onClick={() => setSidebarOpen(false)}
						>
							{link.icon}
							{link.label}
						</Link>
					))}
					<button
						className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-50 w-full text-left font-medium text-gray-700"
						onClick={() =>
							logout().then(() => {
								return navigate("/");
							})
						}
					>
						<LogOut size={18} /> Logout
					</button>
				</nav>
			</aside>

			{/* Hamburger */}
			<button
				className="md:hidden fixed top-4 left-4 z-40 text-3xl text-red-600"
				onClick={() => setSidebarOpen(true)}
			>
				<Menu />
			</button>

			{/* Main content */}
			<main className="flex-1 pt-20 md:ml-10 p-6 transition-all bg-gray-50 min-h-screen w-7/10 lg:w-2/10">
				<ToastContainer
					position="top-center"
					theme="colored"
					autoClose={3000}
					newestOnTop
					pauseOnFocusLoss={false}
				/>
				<Outlet />
			</main>
		</div>
	);
}
