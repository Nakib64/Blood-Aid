// Events.jsx

import { motion } from "framer-motion";

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

export default function Events() {
	const events = [
		{
			title: "Community Blood Drive",
			date: "August 25, 2025",
			location: "Central Park, Dhaka",
		},
		{
			title: "Health Awareness Campaign",
			date: "September 10, 2025",
			location: "City Hall Auditorium",
		},
		{
			title: "Volunteer Meetup",
			date: "October 5, 2025",
			location: "Red Cross Center",
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
			<h2 className="text-4xl font-bold mb-8 text-red-700">Upcoming Events</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
				{events.map((event, i) => (
					<motion.div
						key={i}
						custom={i}
						variants={fadeUp}
						className="bg-gradient-to-tr from-red-50 via-white to-red-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
					>
						<h3 className="text-2xl font-semibold mb-3 text-red-700">{event.title}</h3>
						<p className="text-gray-700 mb-1">
							<strong>Date:</strong> {event.date}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Location:</strong> {event.location}
						</p>
						
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
