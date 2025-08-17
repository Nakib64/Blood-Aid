import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function HomeDonation() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://blood-aid-server-eight.vercel.app/donationRequests", {
        params: {
          status: "pending",
          limit: 6,
        },
      })
      .then((res) => {
        setRequests(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full"
    >
      <div className="max-w-7xl mx-auto pt-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-black">
          🩸 Recent Blood Donation Requests
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-red-600 w-10 h-10" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">
            No pending donation requests found.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="overflow-x-auto shadow-xl rounded-xl border border-gray-200"
          >
            <table className="min-w-full border-collapse bg-white rounded-xl">
              <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Recipient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Blood Group</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, index) => (
                  <motion.tr
                    key={req._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b hover:bg-red-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {req.recipientName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {req.recipientUpazila}, {req.recipientDistrict}
                    </td>
                    <td className="px-6 py-4 font-semibold text-red-700">
                      {req.bloodGroup}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{req.donationDate}</td>
                    <td className="px-6 py-4 text-gray-600">{req.donationTime}</td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/donationRequests/${req._id}`}
                        className="bg-red-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-red-700 transition"
                      >
                        View
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
