// Stats.jsx

import { motion } from "framer-motion";
import { FiUsers, FiDroplet, FiCheckCircle } from "react-icons/fi";
import { BsHospital } from "react-icons/bs";

const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 1) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.3,
			duration: 0.9,
			ease: "easeOut",
		},
	}),
};

export default function Stats() {
	const stats = [
		{
			icon: <FiDroplet className="text-5xl text-red-600 mb-4 mx-auto" />,
			value: "12,540+",
			label: "Units Donated",
		},
		{
			icon: <FiUsers className="text-5xl text-red-600 mb-4 mx-auto" />,
			value: "4,230+",
			label: "Registered Donors",
		},
		{
			icon: <BsHospital className="text-5xl text-red-600 mb-4 mx-auto" />,
			value: "85+",
			label: "Partner Hospitals",
		},
		{
			icon: <FiCheckCircle className="text-5xl text-red-600 mb-4 mx-auto" />,
			value: "15,800+",
			label: "Lives Saved",
		},
	];

	return (
		<motion.section
			className="py-20 bg-white max-w-7xl mx-auto text-center"
			variants={fadeUp}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			<h2 className="text-4xl font-bold mb-10 text-red-700">Our Impact in Numbers</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
				{stats.map((stat, i) => (
					<motion.div
						key={i}
						custom={i}
						variants={fadeUp}
						className="bg-gradient-to-tr from-red-50 via-white to-red-100 rounded-2xl p-8 shadow-lg"
					>
						{stat.icon}
						<p className="text-3xl font-bold text-red-700 mb-2">{stat.value}</p>
						<p className="text-gray-700">{stat.label}</p>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
