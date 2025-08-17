import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomeDonors() {
  const limit = 9;

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>  //
      axios
        .get("http://blood-aid-server-eight.vercel.app/SearchedUsers", {
          params: { limit },
        })
        .then((res) => res.data),
    keepPreviousData: true,
  });
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mx-auto"
    >
      {/* Title */}
      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black text-center">
          Recent Blood Donors
        </h2>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-red-600 w-10 h-10" />
        </div>
      ) : data?.users?.length > 0 ? (
        <div className="max-w-7xl mx-auto py-6 ">
          <Swiper
            spaceBetween={30}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
            }}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // 🔥 Hover stops autoplay
            }}
            speed={6000} // lower = faster, higher = slower
             freeMode={{
    enabled: true,
    momentum: false,       // 🔥 removes "snap" pause
  }}
            loop
            modules={[Autoplay, FreeMode ]}
            className=""
          >
            {data?.users?.map((donor) => (
              <SwiperSlide key={donor._id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="bg-white/80  border-none rounded-3xl  transition-all duration-300 p-6 relative overflow-hidden group"
                >
                  {/* Floating Blob */}
                  <div className="absolute -top-10 -right-10 w-32 h-32  opacity-10 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform duration-500" />

                  {/* Donor Header */}
                  <div className="flex items-center gap-4 relative z-10 ">
                    <img
                      src={
                        donor.avatar ||
                        "https://i.ibb.co/wZvczmCJ/ana-nichita-BI91-Nrpp-E38-unsplash-1.jpg"
                      }
                      alt={donor.name}
                      className="w-16 h-16 object-cover rounded-full ring-2 ring-red-500 shadow"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-red-700 truncate overflow-hidden whitespace-nowrap
">
                        {donor.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {donor.role}
                      </p>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="mt-4 space-y-2 text-gray-700 text-sm relative z-10 ">
                    <p>
                      <span className="font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap
">
                        🩸 Blood Group:
                      </span>{" "}
                      {donor.bloodGroup}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap max-w-full
">
                        📍 Location:
                      </span>{" "}
                      {donor.upazila}, {donor.district}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap
">
                        📧 Email:
                      </span>{" "}
                      {donor.email}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="mt-6 relative z-10">
                    <Link to={`/donor/${donor._id}`}>
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 duration-300">
                        View Profile
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No donors found.</p>
      )}
    </motion.div>
  );
}
