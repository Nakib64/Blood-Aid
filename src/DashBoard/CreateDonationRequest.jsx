// CreateDonationRequest.jsx
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";

export default function CreateDonationRequest() {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");

  useEffect(() => {
    axios.get("/bd_districts_with_upazilas.json").then((res) => setDistricts(res.data));
  }, []);

  useEffect(() => {
    const found = districts.find((d) => d.district === selectedDistrict);
    setUpazilas(found ? found.upazilas : []);
    setValue("upazila", "");
  }, [selectedDistrict, districts, setValue]);

  const onSubmit = async (data) => {
    setLoading(true)
    const donationRequest = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      recipientName: data.recipientName,
      recipientDistrict: data.district,
      recipientUpazila: data.upazila,
      hospitalName: data.hospital,
      addressLine: data.addressLine,
      bloodGroup: data.bloodGroup,
      donationDate: data.date,
      donationTime: data.time,
      contactNumber: data.number,
      requestMessage: data.message,
      status: "pending",
    };

    console.log("Donation Request Submitted:", donationRequest);
    axios.post('https://blood-aid-server-eight.vercel.app/createDonation', donationRequest).then(()=>{
      setLoading(false)
toast.success("Donation request submitted!");
    navigate("/dashboard");
    })
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Requester Name</label>
          <input type="text" value={user.displayName} disabled className="input bg-gray-100" />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Requester Email</label>
          <input type="email" value={user.email} disabled className="input bg-gray-100" />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Recipient Name</label>
          <input {...register("recipientName", { required: true })} className="input" />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Recipient District</label>
          <select {...register("district", { required: true })} className="input">
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.district_id} value={d.district}>{d.district}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Recipient Upazila</label>
          <select {...register("upazila", { required: true })} className="input">
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Hospital Name</label>
          <input {...register("hospital", { required: true })} className="input" />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="font-medium mb-1">Full Address</label>
          <input {...register("addressLine", { required: true })} className="input" />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Blood Group</label>
          <select {...register("bloodGroup", { required: true })} className="input">
            <option value="">Select</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Donation Date</label>
          <input type="date" {...register("date", { required: true })} className="input" />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Donation Time</label>
          <input type="time" {...register("time", { required: true })} className="input" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Contact Number: </label>
          <input type="number" {...register("number", { required: true })} className="input" />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="font-medium mb-1">Request Message</label>
          <textarea rows="4" {...register("message", { required: true })} className="input"></textarea>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-red-600 text-white py-2 flex gap-2 justify-center items-center rounded hover:bg-red-700 font-semibold transition">
            {loading && <span className="loading loading-spinner loading-md"></span>}
            Request Donation
          </button>
        </div>
      </form>
    </motion.div>
  );
}