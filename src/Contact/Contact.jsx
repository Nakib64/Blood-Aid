import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react"; // icons
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Loader } from "rsuite";

const Contact = () => {
	const [loading, setloading] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		setloading(true);
		// Add EmailJS or backend logic here
		console.log(e.target.name.value);
		emailjs
			.sendForm(
				"service_bk2gmx7",
				"template_v6np0eu",
				e.target,
				"tx0GxiU3evAd8jqm8"
			)
			.then(() => {
				Swal.fire({
					title: "Mail sent to the admin!",
					text: "Thank you for contacting us.",
					icon: "success",
					showClass: {
						popup: "animate__animated animate__fadeInUp animate__faster",
					},
					hideClass: {
						popup: "animate__animated animate__fadeOutDown animate__faster",
					},
					customClass: {
						popup: "rounded-3xl p-10 bg-[#FCFAEE] text-[#0C1D32] shadow-xl",
						title: "text-2xl font-bold",
						content: "text-base mt-4",
						confirmButton:
							"bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full mt-6",
					},
					confirmButtonText: "Okay",
				});
				setloading(false);
			})
			.catch(() =>
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
				})
			);
	};

	const fadeUp = {
		hidden: { opacity: 0, y: 40 },
		visible: (i = 1) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.2, duration: 0.9, ease: "easeOut" },
		}),
	};

	return (
		<motion.section
			className="py-24 bg-gradient-to-r from-red-50 to-pink-50"
			variants={fadeUp}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			<div className="max-w-7xl mx-auto px-6">
				<h2 className="text-4xl md:text-5xl font-bold text-center text-red-700 mb-16">
					Contact Us
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Form Card */}
					<motion.form
						className="bg-white rounded-3xl shadow-xl p-10 space-y-6"
						variants={fadeUp}
						onSubmit={handleSubmit}
					>
						<Input
							type="text"
							name="name"
							placeholder="Your Name"
							className="w-full"
						/>
						<Input
							type="email"
							name="email"
							placeholder="Your Email"
							className="w-full"
						/>
						<Textarea
							name="message"
							placeholder="Your Message"
							className="w-full h-36"
						/>
						<Button
                        disabled= {loading}
							type="submit"
							variant="default"
							className={`bg-red-600 hover:bg-red-700 text-white w-full py-3 text-lg font-medium flex gap-4`}
						>
							{loading && <Loader />} Send Message
						</Button>
					</motion.form>

					{/* Contact Info Card */}
					<motion.div
						className="bg-white rounded-3xl shadow-xl p-10 flex flex-col justify-center space-y-6"
						variants={fadeUp}
					>
						<div className="flex items-center gap-4">
							<Phone className="w-6 h-6 text-red-600" />
							<span className="text-lg font-medium text-gray-700">
								+880 1315168075
							</span>
						</div>
						<div className="flex items-center gap-4">
							<Mail className="w-6 h-6 text-red-600" />
							<span className="text-lg font-medium text-gray-700">
								nafiz2282@gmail.com
							</span>
						</div>
						<div className="flex items-center gap-4">
							<MapPin className="w-6 h-6 text-red-600" />
							<span className="text-lg font-medium text-gray-700">
								Dhaka, Bangladesh
							</span>
						</div>
						<p className="mt-6 text-gray-500">
							We’d love to hear from you! Whether you have a question, suggestion, or
							want to join our cause, feel free to reach out.
						</p>
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
};

export default Contact;
 