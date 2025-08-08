// FAQ.jsx

import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 1) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.1,
			duration: 0.6,
			ease: "easeOut",
		},
	}),
};

const faqs = [
	{
		question: "Who can donate blood?",
		answer:
			"Anyone in good health between 18 and 65 years of age can donate blood. Specific eligibility criteria apply.",
	},
	{
		question: "How often can I donate blood?",
		answer:
			"Typically, you can donate whole blood every 3 months. Other types of donation have different intervals.",
	},
	{
		question: "Is donating blood safe?",
		answer:
			"Yes, blood donation is safe and sterile equipment is used for each donor to prevent infection.",
	},
	{
		question: "What should I do before donating?",
		answer:
			"Eat a healthy meal, stay hydrated, and avoid heavy exercise before donating blood.",
	},
];

export default function FAQ() {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggle = (i) => {
		setActiveIndex(activeIndex === i ? null : i);
	};

	return (
		<motion.section
			className="py-20 bg-gray-50 max-w-7xl container mx-auto px-6"
			variants={fadeUp}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			<h2 className="text-4xl font-bold mb-8 text-red-700 text-center">Frequently Asked Questions</h2>
			<div className="space-y-4">
				{faqs.map((faq, i) => (
					<motion.div
						key={i}
						variants={fadeUp}
						custom={i}
						className="bg-white rounded-xl shadow-md p-6 cursor-pointer select-none"
						onClick={() => toggle(i)}
					>
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-semibold text-red-700">{faq.question}</h3>
							{activeIndex === i ? (
								<FiChevronUp className="text-red-700 text-xl" />
							) : (
								<FiChevronDown className="text-red-700 text-xl" />
							)}
						</div>
						{activeIndex === i && (
							<p className="mt-4 text-gray-600">{faq.answer}</p>
						)}
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
