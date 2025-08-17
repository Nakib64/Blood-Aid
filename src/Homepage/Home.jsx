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
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useEffect, useState } from "react";
import HowItWorks from "../components/HowItWorks";
import Events from "../components/Events";
import FAQ from "./Faq";
import Stats from "./Stats";
import VolunteerCTA from "./Volunteer";
import HomeDonation from "./HomeDonationRequesiton/HomeDonation";
import HomeDonors from "./HomeDonor/HomeDonor";
import Contact from "../Contact/Contact";
import Heros from "./Heros/Heros";

const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 1) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.2,
			duration: 0.9,
			ease: "easeOut",
		},
	}),
};

const fadeRight = {
	hidden: { opacity: 0, x: -50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 1, ease: "easeOut" },
	},
};

export default function Home() {
	const [index, setIndex] = useState(0);

	const prevSlide = () => {
		setIndex((i) => (i === 0 ? donors.length - 1 : i - 1));
	};
	const nextSlide = () => {
		setIndex((i) => (i === donors.length - 1 ? 0 : i + 1));
	};

	// Optional: Keyboard nav
	useEffect(() => {
		const handleKey = (e) => {
			if (e.key === "ArrowLeft") prevSlide();
			if (e.key === "ArrowRight") nextSlide();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	return (
		<div className="min-h-screen flex flex-col space-y-10" data-theme="light">
			{/* Banner */}
			<section className="bg-[url('https://i.ibb.co/cKnzxYZz/adrian-sulyok-s-ZO8-ILz-GKcg-unsplash-1.jpg')] bg-cover bg-center text-white py-40 text-center relative">
				<div className="absolute inset-0 bg-black/60"></div>
				<div className="relative z-10 p-6 max-w-4xl mx-auto">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						Be the Lifeline: <br className="hidden md:block" /> Donate Blood Today
					</h1>
					<div className="flex justify-center flex-col md:flex-row gap-6">
						<Link
							to="/searchDonor"
							className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:scale-105 transition transform"
						>
							🔍 Search Donors
						</Link>
						<Link
							to="/donationRequests"
							className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:scale-105 transition transform"
						>
							Donation Requests
						</Link>
					</div>
				</div>
			</section>

			<HomeDonation></HomeDonation>
			<HomeDonors></HomeDonors>
			{/* Featured Section */}
			<motion.section
				className="py-20  max-w-7xl mx-auto"
				variants={fadeUp}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6 text-red-700">Why Donate Blood?</h2>
					<p className="max-w-2xl mx-auto text-gray-600 mb-12">
						Every drop counts. Your donation can save lives and support critical
						treatments in hospitals across the country. Join our community of heroes
						today.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								icon: <FiHeart className="text-5xl text-red-600 mb-4 mx-auto" />,
								title: "Save Lives",
								desc:
									"Your blood could be the reason someone gets another chance at life.",
							},
							{
								icon: <FiUser className="text-5xl text-red-600 mb-4 mx-auto" />,
								title: "Join a Cause",
								desc:
									"Be part of a selfless community committed to health and humanity.",
							},
							{
								icon: <FiSearch className="text-5xl text-red-600 mb-4 mx-auto" />,
								title: "Easy to Find",
								desc:
									"Connect with local donors or request blood easily using our platform.",
							},
						].map((item, i) => (
							<motion.div
								key={i}
								custom={i}
								variants={fadeUp}
								className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all"
							>
								{item.icon}
								<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
								<p className="text-gray-600">{item.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* More Features */}
			<motion.section
				className="py-20 bg-white max-w-7xl mx-auto"
				variants={fadeRight}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6 text-red-700">
						What Makes Us Unique?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
						{[
							{
								title: "Real-time Donor Matching",
								desc:
									"Instantly match recipients with eligible donors near their location based on need, availability and blood type.",
								bg: "from-red-50 via-white to-red-100",
							},
							{
								title: "Secure & Verified Donors",
								desc:
									"Every donor profile is verified and authenticated so recipients can trust their lifesavers.",
								bg: "from-white via-red-50 to-white",
							},
						].map((item, i) => (
							<motion.div
								key={i}
								custom={i}
								variants={fadeRight}
								className={`p-8 bg-gradient-to-tr ${item.bg} rounded-2xl shadow-xl`}
							>
								<h3 className="text-2xl font-semibold mb-4 text-red-700">
									{item.title}
								</h3>
								<p className="text-gray-700">{item.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Trusted Section */}
			<motion.section
				className="py-20 bg-white w-full max-w-7xl mx-auto"
				variants={fadeUp}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6 text-red-700">
						Trusted by Hospitals & Communities
					</h2>
					<p className="max-w-2xl mx-auto text-gray-600 mb-12">
						We work hand-in-hand with certified hospitals and health organizations to
						ensure every drop you donate reaches those who truly need it.
					</p>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full">
						{[...Array(4)].map((_, i) => (
							<motion.img
								key={i}
								variants={fadeUp}
								custom={i}
								className="h-40 md:h-60 w-full rounded-2xl object-cover grayscale hover:grayscale-0 transition duration-300"
								src={
									i === 0
										? " https://i.ibb.co/9kbKMzhW/national-cancer-institute-1c8sj2-IO2-I4-unsplash-1.jpg"
										: i === 1
										? "https://i.ibb.co/zWD0f6rb/solen-feyissa-j-Gm-BZypo-FPc-unsplash-1.jpg"
										: i === 2
										? "https://i.ibb.co/SwLQd737/acton-crawford-8-PB-TFEy2-XQ-unsplash-1.jpg"
										: "https://i.ibb.co/p8stDTC/graham-ruttan-b3-LF7-JHQmms-unsplash-1.jpg"
								}
								alt={`Hospital ${i + 1}`}
							/>
						))}
					</div>
				</div>
			</motion.section>

			{/* heros */}
			<Heros></Heros>

			{/* how it works */}
			<HowItWorks></HowItWorks>
			{/* events */}
			<Events></Events>
			{/* faq */}
			<FAQ></FAQ>
			
			{/* voluteer ctr */}
			<VolunteerCTA></VolunteerCTA>

			{/* Contact Us */}
			<Contact></Contact>
		</div>
	);
}
