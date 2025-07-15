import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { authContext } from "../Authentication/AuthContext";

export default function AllDonationRequests() {
  const { user } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const statuses = ["pending", "inprogress", "done", "canceled"];

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(`https://blood-aid-server-eight.vercel.app/donationRequests`, {
        params: {  status, page },
      })
      .then((res) => {
        setRequests(res.data.data);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      });
  }, [user, status, page]);

  const handleStatusUpdate = (id, newStatus) => {
    axios
      .patch(`https://blood-aid-server-eight.vercel.app/donationRequests/${id}`, {
        status: newStaatus,
      })
      .then(() => {
        setRequests((prev) =>
          prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
        );
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className=" py-6 max-w-7xl mx-auto w-full"
    >
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">
        🩸  Donation Requests
      </h2>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        <button
          onClick={() => setStatus("")}
          className={`px-4 py-2 rounded-full shadow-md transition-all ${
            status === "" ? "bg-red-600 text-white" : " hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`capitalize px-4 py-2 rounded-full shadow-md transition-all ${
              status === s ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-xl shadow-xl overflow-auto w-full border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-red-600 w-10 h-10" />
          </div>
        ) : (
          <table className="min-w-[750px] w-full text-sm text-left">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Blood</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <motion.tr
                    key={req._id}
        
                    className="transition duration-300  hover:bg-red-50  shadow-gray-500 hover:shadow-md"
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
                    <td className="py-3 px-4 space-y-1 sm:space-x-2">
                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(req._id, "done")}
                            className="block sm:inline-block w-full sm:w-auto text-xs sm:text-sm bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-700"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(req._id, "canceled")}
                            className="block sm:inline-block w-full sm:w-auto text-xs sm:text-sm bg-yellow-600 text-white rounded-md px-2 py-1 hover:bg-yellow-700"
                          >
                            Cancel
                          </button>
                          <div className="text-xs mt-1 text-gray-600">
                            Donor: {req.donorName} ({req.donorEmail})
                          </div>
                        </>
                      )}
                    
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No donation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
  <div className="flex justify-center mt-6 flex-wrap gap-2 items-center">
    {/* Prev */}
    <button
      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-3 py-1.5 text-sm font-medium border rounded-md shadow-sm bg-white disabled:opacity-50"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {getVisiblePages(page, totalPages).map(p => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`w-9 h-9 rounded-md font-medium transition-all shadow border ${
          page === p
            ? "bg-red-600 text-white border-red-600"
            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
        }`}
      >
        {p}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="px-3 py-1.5 text-sm font-medium border rounded-md shadow-sm bg-white disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}

    </motion.div>
  );
}

function getVisiblePages(currentPage, totalPages) {
  const maxButtons = 5;
  let start = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
  let end = start + maxButtons - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxButtons + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
 