import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const Heros = () => {
	const donors = [
		{
			name: "Nafiz",
			group: "O+",
			img: "https://i.ibb.co/2Y3sqbt3/profile-1.jpg",
			quote: "Donating blood gives me purpose.",
		},
		{
			name: "Farhan Ahmed",
			group: "A-",
			img: "https://i.ibb.co/s91DSJJr/charlie-green-3-Jmf-ENc-L24-M-unsplash-1.jpg",
			quote: "I feel honored knowing my blood might save someone.",
		},
		{
			name: "Hasan Kabir",
			group: "B+",
			img: "https://i.ibb.co/F4nq0bkn/ana-nichita-BI91-Nrpp-E38-unsplash-1.jpg",
			quote: "BloodAid makes it easy to connect and help.",
		},
		{
			name: "Ayesha Rahman",
			group: "AB+",
			img: "https://i.ibb.co/0GKPn6k/profile-2.jpg",
			quote: "Every drop of blood is a lifeline.",
		},
	];

	const slides = [...donors, ...donors]; // duplicate for smooth loop

	return (
		<div className="py-12 bg-gradient-to-r from-red-50 to-pink-50">
			<h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-10">
				Our Hero Donors
			</h2>

			<Swiper
				modules={[Autoplay, EffectCoverflow]}
				effect="coverflow"
				centeredSlides={true}
				breakpoints={{
					320: { slidesPerView: 1.5 },
					480: { slidesPerView: 2 },
					720: { slidesPerView: 3 },
				}}
				// slidesPerView={3}      // center + 1 left + 1 right
				loop={true} // infinite loop
				autoplay={{ delay: 2500, disableOnInteraction: false }}
				coverflowEffect={{
					rotate: 0,
					stretch: 0,
					depth: 350,
					modifier: 1,
					slideShadows: false,
				}}
				className="max-w-6xl mx-auto px-6"
			>
				{slides.map((donor, idx) => (
					<SwiperSlide key={idx} className=" transition-all duration-500">
						<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-500  ">
							<img
								src={donor.img}
								alt={donor.name}
								className="w-24 h-24 rounded-full object-cover ring-4 ring-red-300 mb-4"
							/>
							<h3 className="text-lg font-semibold text-gray-800">{donor.name}</h3>
							<p className="text-sm text-red-600 font-bold mb-2">🩸 {donor.group}</p>
							<p className="text-gray-600 text-sm italic">{donor.quote}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Heros;
