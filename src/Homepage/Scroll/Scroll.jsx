// ScrollToTopButton.jsx
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setVisible(window.scrollY > 300);
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					onClick={handleScrollToTop}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					whileHover={{ scale: 1.1, rotate: 5 }}
					whileTap={{ scale: 0.95 }}
					className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
					title="Scroll to Top"
				>
					<FaArrowUp size={20} />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
