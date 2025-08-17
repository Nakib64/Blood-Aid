import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {

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
    return (
       	<motion.section
				className="py-20 bg-gray-50 max-w-7xl mx-auto my-20"
				variants={fadeUp}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-red-700 mb-10">
						Contact Us
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center">
						<motion.form className="space-y-4" variants={fadeUp}>
							<input type="text" placeholder="Your Name" className="input" />
							<input type="email" placeholder="Your Email" className="input" />
							<textarea placeholder="Your Message" className="input h-32"></textarea>
							<button
								type="submit"
								className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
							>
								Send Message
							</button>
						</motion.form>
						<motion.div className="text-lg space-y-4" variants={fadeUp}>
							<p>
								<strong>Phone:</strong> +880 1315168075
							</p>
							<p>
								<strong>Email:</strong> nafiz2282@gmail.com
							</p>
							<p>
								<strong>Address:</strong> Dhaka, Bangladesh
							</p>
						</motion.div>
					</div>
				</div>
			</motion.section>
    );
};

export default Contact;