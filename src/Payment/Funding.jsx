import { useContext, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { authContext } from "../Authentication/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Slide, toast } from "react-toastify";
import { FiCheckCircle } from "react-icons/fi";

const stripePromise = loadStripe("pk_test_51Rel8QPC60YcOyoh03aUYjVdPZT6ZrTCiiohKfNBkiZEAZuodvSWQVUHzYY1XyOtowJyUc0jBxMjNCYGvZus5mRS00CU3jgPAa");

// 👇 fetcher for recent donations
const fetchRecentDonations = async () => {
	const { data } = await axios.get("http://localhost:3000/api/donation/all");
	return data;
};

// 💳 Donation Form Component
function DonationForm() {
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useContext(authContext);
	const queryClient = useQueryClient();

	const [amount, setAmount] = useState(50);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post("http://localhost:3000/api/donation/create-intent", {
				amount: amount * 100,
			});

			const result = await stripe.confirmCardPayment(data.clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: { name: user.displayName, email: user.email },
				},
			});

			if (result.error) {
				setMessage(result.error.message);
			} else if (result.paymentIntent.status === "succeeded") {
				await axios.post("http://localhost:3000/api/donation/save", {
					name: user.displayName,
					email: user.email,
					amount: amount * 100,
				});

				toast.success(
					<span className="flex items-center gap-2">
						<FiCheckCircle className="text-xl" />
						Donation Successful! 🎉
					</span>,
					{ transition: Slide, closeButton: false, hideProgressBar: false }
				);

				// ✅ Refetch donations list
				queryClient.invalidateQueries({ queryKey: ["donations"] });

				setAmount(50);
			}
		} catch (err) {
			setMessage("Something went wrong.");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
			<h2 className="text-xl font-semibold">Donate</h2>
			<input
				className="input input-bordered w-full"
				value={user?.displayName}
				disabled
				placeholder="Name"
				required
			/>
			<input
				className="input input-bordered w-full"
				type="email"
				value={user?.email}
				disabled
				placeholder="Email"
				required
			/>
			<input
				className="input input-bordered w-full"
				type="number"
				value={amount}
				onChange={(e) => setAmount(Number(e.target.value))}
				placeholder="Amount in BDT"
				required
			/>
			<CardElement className="p-2 border rounded" />
			<button className="btn btn-primary w-full" type="submit" disabled={loading}>
				{loading && <span className="loading loading-spinner loading-md"></span>} Donate {amount} BDT
			</button>
			{message && <p className="text-green-600">{message}</p>}
		</form>
	);
}

// 🧾 Recent Donations Table Component
function RecentDonations() {
	const { data: donations = [], isLoading, isError } = useQuery({
		queryKey: ["donations"],
		queryFn: fetchRecentDonations,
	});

	if (isLoading) return <p className="text-center mt-6">Loading donations...</p>;
	if (isError) return <p className="text-center text-red-500">Failed to load donations.</p>;

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold mb-4">Recent Donations</h2>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Amount (BDT)</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{donations.map((donation, i) => (
							<tr key={i}>
								<td>{donation.name}</td>
								<td>{donation.email}</td>
								<td>BDT {(donation.amount / 100).toFixed(2)}</td>
								<td>{new Date(donation.date).toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// 🧠 Page Layout
export default function FundingPage() {
	return (
		<div className="max-w-4xl mx-auto py-10 px-4">
			<motion.h1
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-3xl font-bold text-center mb-10"
			>
				🩸 Funding Page
			</motion.h1>

			<Elements stripe={stripePromise}>
				<DonationForm />
			</Elements>

			<RecentDonations />
		</div>
	);
}
