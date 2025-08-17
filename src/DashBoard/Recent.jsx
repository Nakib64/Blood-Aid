import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { authContext } from "../Authentication/AuthContext";

const RecentMyDonations = () => {
  const { user } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get("https://blood-aid-server-eight.vercel.app/recent", {
        params: {
          email: user.email,
          limit: 3,
          sort: "desc", // if you sort by createdAt or date in backend
        },
      })
      .then((res) => {
        setRequests(res.data || []);
        setLoading(false);
      })
    //   .catch(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin text-red-600 w-6 h-6" />
      </div>
    );
  }

  if (!requests.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto  mt-10"
    >
      <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
        <h2 className="text-xl font-bold px-6 py-4 border-b text-red-700">
          🧾 My Recent Donation Requests
        </h2>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-4">Recipient</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Blood</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="even:-50 hover:bg-red-50 transition"
              >
                <td className="py-3 px-4 font-medium">{req.recipientName}</td>
                <td className="py-3 px-4">
                  {req.recipientUpazila}, {req.recipientDistrict}
                </td>
                <td className="py-3 px-4">{req.donationDate}</td>
                <td className="py-3 px-4">{req.donationTime}</td>
                <td className="py-3 px-4">{req.bloodGroup}</td>
                <td className="py-3 px-4 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      req.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : req.status === "inprogress"
                        ? "bg-blue-100 text-blue-800"
                        : req.status === "done"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentMyDonations;
