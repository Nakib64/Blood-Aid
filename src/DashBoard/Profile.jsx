import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Authentication/AuthContext";
import { motion } from "framer-motion";
import { FiEdit2, FiSave, FiUpload } from "react-icons/fi";
import axios from "axios";

export default function Profile() {
  const { user, updateUserProfile } = useContext(authContext);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    avatar: user?.photoURL || "",
    bloodGroup: user?.bloodGroup || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
  });

  // load districts
  useEffect(() => {
    axios.get("/bd_districts_with_upazilas.json").then((res) => setDistricts(res.data));
  }, []);

  // load upazila list when district changes
  useEffect(() => {
    const found = districts.find((d) => d.district === form.district);
    setUpazilas(found ? found.upazilas : []);
  }, [form.district, districts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    fd.append("key", import.meta.env.VITE_IMGBB_KEY);
    const { data } = await axios.post("https://api.imgbb.com/1/upload", fd);
    setForm({ ...form, avatar: data.data.url });
  };

  const handleSave = async () => {
    await updateUserProfile(form); // implement in authContext
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
        {editing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            <FiSave /> Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            <FiEdit2 /> Edit
          </button>
        )}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Avatar */}
        <div className="col-span-full flex items-center gap-4">
          <img src={form.avatar || "/default-avatar.png"} alt="avatar" className="w-20 h-20 rounded-full border" />
          {editing && (
            <label className="flex items-center gap-2 cursor-pointer text-red-600">
              <FiUpload /> Change
              <input type="file" className="hidden" onChange={handleAvatarUpload} />
            </label>
          )}
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            disabled={!editing}
          />
        </div>

        {/* Email (read‑only) */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <input type="email" value={form.email} className="input bg-gray-100" disabled />
        </div>

        {/* Blood Group */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            className="input"
            disabled={!editing}
          >
            <option value="">Select</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg=>(<option key={bg} value={bg}>{bg}</option>))}
          </select>
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">District</label>
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="input"
            disabled={!editing}
          >
            <option value="">Select District</option>
            {districts.map(d=>(<option key={d.district_id} value={d.district}>{d.district}</option>))}
          </select>
        </div>

        {/* Upazila */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Upazila</label>
          <select
            name="upazila"
            value={form.upazila}
            onChange={handleChange}
            className="input"
            disabled={!editing}
          >
            <option value="">Select Upazila</option>
            {upazilas.map(u=>(<option key={u.id} value={u.name}>{u.name}</option>))}
          </select>
        </div>
      </form>
    </motion.div>
  );
}
