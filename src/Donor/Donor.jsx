import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, MapPin, Droplet, ShieldCheck } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router";

export default function DonorCard() {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
    const{ id} = useParams()
  useEffect(() => {
    axios
      .get(`https://blood-aid-server-eight.vercel.app/users?id=${id}`)
      .then((res) => setDonor(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin text-red-600 w-8 h-8" />
      </div>
    );
  }

  if (!donor) {
    return <p className="text-center text-gray-500">Donor not found.</p>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full my-30 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 h-40 relative">
        <img
          src={donor.avatar}
          alt={donor.name}
          className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="pt-16 pb-6 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{donor.name}</h2>
        <p className="text-lg text-gray-500 mt-1 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="capitalize">{donor.role} • {donor.status}</span>
        </p>

        <div className="mt-4 space-y-3 text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Droplet className="w-4 h-4 text-red-500" />
            <span className="font-semibold text-red-600">
              {donor.bloodGroup}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{donor.upazila}, {donor.district}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{donor.email}</span>
          </div>
        </div>

       
      </div>
    </motion.div>
  );
}
