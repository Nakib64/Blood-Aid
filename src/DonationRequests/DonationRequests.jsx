import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function PendingDonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/donationRequests", {
        params: {
          status: "pending",
          page,
          limit: 6,
        },
      })
      .then((res) => {
        setRequests(res.data.data);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto w-full"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        🩸 Public Blood Donation Requests
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-red-600 w-10 h-10" />
        </div>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending donation requests found.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <motion.div
                key={req._id}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl shadow-md border border-gray-200 p-5 space-y-2 bg-white transition"
              >
                <h3 className="text-lg font-semibold text-red-600">
                  {req.recipientName}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {req.recipientUpazila}, {req.recipientDistrict}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Blood Group:</strong> {req.bloodGroup}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {req.donationDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {req.donationTime}
                </p>
                <button
                  onClick={() => navigate(`/donation-requests/${req._id}`)}
                  className="mt-2 inline-block bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-md font-medium transition-all shadow-md ${
                  page === i + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
