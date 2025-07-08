import React, { useContext, useState } from "react";
import { FiCheckCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router"; // or next/link if using Next.js
import Lottie from "react-lottie-player";
import animationData from "../assets/login-animation.json"; // you must add a Lottie JSON file
import { authContext } from "../Authentication/AuthContext";
import { Slide, toast } from "react-toastify";
import { set } from "react-hook-form";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { login, googleLogin, setUser } = useContext(authContext);
    const navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		login(email, password)
			.then(() => {
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

	const handleGoogle = () => {
		googleLogin().then((res) => {
			setUser(res.user);
            
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
            navigate('/')
		});
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center px-8 bg-[url('https://i.ibb.co/zWj10frv/nguy-n-hi-p-ma-Ye-Ml3x-Cr-Y-unsplash.jpg')] bg-cover bg-no-repeat "
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
							className="w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
						>
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
					<button className="btn bg-white text-black border-[#e5e5e5] w-full mt-6" onClick={handleGoogle}>
						<svg
							aria-label="Google logo"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<g>
								<path d="m0 0H512V512H0" fill="#fff"></path>
								<path
									fill="#34a853"
									d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
								></path>
								<path
									fill="#4285f4"
									d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
								></path>
								<path
									fill="#fbbc02"
									d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
								></path>
								<path
									fill="#ea4335"
									d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
								></path>
							</g>
						</svg>
						Login with Google
					</button>
				</div>
			</div>
		</div>
	);
}
