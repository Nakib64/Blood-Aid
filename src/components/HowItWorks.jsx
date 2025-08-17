// HowItWorks.jsx

import { motion } from "framer-motion";
import { FiUser, FiSearch, FiHeart, FiCheckCircle } from "react-icons/fi";

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

export default function HowItWorks() {
	const steps = [
		{
			icon: <FiUser className="text-5xl text-red-600 mb-4 mx-auto" />,
			title: "Register",
			desc: "Create your donor profile quickly and securely.",
		},
		{
			icon: <FiSearch className="text-5xl text-red-600 mb-4 mx-auto" />,
			title: "Search or Request",
			desc: "Find donors or request blood based on your needs.",
		},
		{
			icon: <FiHeart className="text-5xl text-red-600 mb-4 mx-auto" />,
			title: "Connect & Donate",
			desc: "Easily connect with donors and make your donation count.",
		},
		{
			icon: <FiCheckCircle className="text-5xl text-red-600 mb-4 mx-auto" />,
			title: "Save Lives",
			desc: "Your donation helps save lives and build a healthier community.",
		},
	];

	return (
		<motion.section
			className="py-20 -50 max-w-7xl mx-auto text-center"
			variants={fadeUp}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			<h2 className="text-4xl font-bold mb-8 text-red-700">How It Works</h2>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-4">
				{steps.map((step, i) => (
					<motion.div
						key={i}
						custom={i}
						variants={fadeUp}
						className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-default"
					>
						{step.icon}
						<h3 className="text-xl font-semibold mb-2">{step.title}</h3>
						<p className="text-gray-600">{step.desc}</p>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
