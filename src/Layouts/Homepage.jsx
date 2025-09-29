import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "../Homepage/Navbar/Navbar";
import Footer from "../Homepage/Footer/Footer";
import ScrollToTopButton from "../Homepage/Scroll/Scroll";
import { Toaster } from "@/components/components/ui/sonner";

const Homepage = () => {
	return (
		<div className="min-h-screen flex flex-col ">
			<div>
				<ScrollToTopButton></ScrollToTopButton>
			</div>
			<ToastContainer
				position="top-center"
				theme="colored"
				autoClose={3000}
				newestOnTop
				pauseOnFocusLoss={false}
			/>
			<Toaster richColors/>
			<Navbar></Navbar>

			<main className="flex-1">
				<Outlet></Outlet>
			</main>
			<Footer></Footer>
		</div>
	);
};

export default Homepage;
