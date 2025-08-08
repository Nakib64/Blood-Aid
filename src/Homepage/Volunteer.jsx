// VolunteerCTA.jsx

import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router";

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

export default function VolunteerCTA() {
	return (
		<motion.section
			className="py-20 max-w-7xl mx-auto text-center rounded-3xl px-8"
			variants={fadeUp}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			<div className="max-w-7xl mx-auto space-y-6">
				<FiUsers className="text-6xl text-red-700 mx-auto" />
				<h2 className="text-4xl font-bold text-red-700">Become a Volunteer</h2>
				<p className="text-gray-700 text-lg">
					Join our community of lifesavers. Volunteer your time or become a regular donor to make a difference.
				</p>
				<Link
					to="/volunteer-signup"
					className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition"
				>
					Sign Up Now
				</Link>
			</div>
		</motion.section>
	);
}
