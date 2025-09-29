import React, { useContext, useState } from "react";
import { FiCheckCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router"; // or next/link if using Next.js
import Lottie from "react-lottie-player";
import animationData from "../assets/login-animation.json"; // you must add a Lottie JSON file
import { authContext } from "../Authentication/AuthContext";
import { Slide, toast } from "react-toastify";
export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useContext(authContext);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (e) => {
		setLoading(true);
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		login(email, password)
			.then(() => {
				setLoading(false);
				navigate(location.state ? `${location.state}` : "/");
				toast.success(
					<span className="flex items-center gap-2">
						<FiCheckCircle className="text-xl" />
						Welcome back, you’re in! 🎉
					</span>,
					{
						transition: Slide, // smooth slide‑down
						closeButton: false, // hide default close “x”
						hideProgressBar: false, // keep the colorful bar
					}
				);
			})
			.catch((error) => {
				setLoading(false);
				toast.error(
					<span className="flex items-center gap-2">
						<FiCheckCircle className="text-xl" />
						Invalid Email or Password
					</span>,
					{
						transition: Slide, // smooth slide‑down
						closeButton: false, // hide default close “x”
						hideProgressBar: false, // keep the colorful bar
					}
				);
			});
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center px-8 
			bg-[url('https://i.ibb.co.com/1fmH1JhL/nguy-n-hi-p-ma-Ye-Ml3x-Cr-Y-unsplash-1.jpg')] bg-cover bg-no-repeat "
			data-theme="light"
		>
			<div className="bg-transparent backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
				{/* Left: Animation */}
				<div className="flex-1 hidden md:flex items-center justify-center">
					<Lottie
						loop
						animationData={animationData}
						play
						style={{ width: "100%", maxWidth: 400 }}
					/>
				</div>

				{/* Right: Form */}
				<div className="flex-1">
					<h2 className="text-2xl font-bold text-center mb-6 text-white">
						Login to Your Account
					</h2>

					<form className="space-y-4" onSubmit={handleSubmit}>
						<input type="email" name="email" placeholder="Email" className="input" />

						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Password"
								className="input"
							/>
							<span
								className="absolute right-3 top-3 cursor-pointer text-xl"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FiEyeOff /> : <FiEye />}
							</span>
						</div>

						<button
							type="submit"
							className="w-full py-2 flex justify-center items-center gap-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
						>
							{loading && <span className="loading loading-spinner loading-md"></span>}
							Login
						</button>
					</form>

					<p className="text-center mt-4 text-sm text-white">
						Don't have an account?{" "}
						<Link
							to="/authentication/register"
							className="text-red-600 hover:underline "
						>
							Register now
						</Link>
					</p>

					<Link to={"/"}>
						<button className="btn btn-primary w-full mt-30">Back to Home</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
