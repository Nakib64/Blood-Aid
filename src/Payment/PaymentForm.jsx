import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

    const [error, setError]= useState(null)
	const handlSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (!card) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			setError(error.message)
         
		} else {
            setError('')
			console.log("payment method", paymentMethod);
		}
	};

	return (
		<div>
			<form action="" onSubmit={handlSubmit} className="min-h-screen flex flex-col gap-6 justify-center items-center">
				<CardElement className="p-2 border w-full max-w-4xl"></CardElement>
				<button type="submit" className="btn" disabled={!stripe}>
					pay
				</button>
               {error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default PaymentForm;
