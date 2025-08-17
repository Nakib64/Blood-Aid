// src/components/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiSave, FiUpload } from "react-icons/fi";
import { authContext } from "../Authentication/AuthContext";
import { Bounce, toast } from "react-toastify";
import UseAxios from "../Hooks/UseAxios";
import axios from "axios";

export default function Profile() {
	/* -------------------- local state -------------------- */
	const { user } = useContext(authContext); // current auth user
	const [docId, setDocId] = useState(null); // Mongo _id (kept separate)
	const [districts, setDistricts] = useState([]);
	const [upazilas, setUpazilas] = useState([]);
	const [editing, setEditing] = useState(false);
	const axiosSecure = UseAxios()
	const [form, setForm] = useState({
		name: "",
		email: "",
		avatar: "",
		bloodGroup: "",
		district: "",
		upazila: "",
	});

	/* -------------------- fetch profile + districts -------------------- */
	useEffect(() => {
		if (!user?.email) return;

		// 1️⃣ profile
		axiosSecure
			.get(`/users?email=${user.email}`)
			.then(({ data }) => {
				const profile = Array.isArray(data) ? data[0] : data; // handle array / obj
				setDocId(profile._id); // keep _id separately
				const { _id, ...rest } = profile;
				setForm(rest); // state has NO _id
			});

		// 2️⃣ districts (static JSON file in /public)
		axios.get("/bd_districts_with_upazilas.json").then(({ data }) => {
			setDistricts(data);
		});
	}, [user]);

	/* -------------------- upazila options for selected district -------- */
	useEffect(() => {
		const hit = districts.find((d) => d.district === form.district);
		setUpazilas(hit ? hit.upazilas : []);
	}, [form.district, districts]);

	/* -------------------- field handlers -------------------- */
	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleAvatarUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const fd = new FormData();
		fd.append("image", file);
		fd.append("key", import.meta.env.VITE_IMGBB_KEY);

		const {
			data: {
				data: { url },
			},
		} = await axios.post("https://api.imgbb.com/1/upload", fd);

		setForm((prev) => ({ ...prev, avatar: url }));
	};

	/* -------------------- save profile -------------------- */
	const handleSave = async () => {
		try {
			await axios
				.patch(`https://blood-aid-server-eight.vercel.app/updateUser?email=${user.email}`, form)
				.then(() => {
					setEditing(false);
					toast("Updated successfully!", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
				});
		} catch (err) {
			toast("something wrong!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});

			console.error(err);
		}
	};

	/* -------------------- UI -------------------- */
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-3xl mx-auto p-8 rounded-xl shadow-lg space-y-6 bg-white"
		>
			{/* header */}
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">My Profile</h2>

				{editing ? (
					<button
						onClick={handleSave}
						className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
					>
						<FiSave /> Save
					</button>
				) : (
					<button
						onClick={() => setEditing(true)}
						className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
					>
						<FiEdit2 /> Edit
					</button>
				)}
			</div>

			{/* form vs read‑only */}
			{editing ? (
				/* ------------- editable form ------------- */
				<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Avatar */}
					<div className="col-span-full flex items-center gap-4">
						<img
							src={form.avatar || "/default-avatar.png"}
							alt="avatar"
							className="w-28 h-28 rounded-full object-cover"
						/>
						<label className="flex items-center gap-2 cursor-pointer text-red-600">
							<FiUpload /> Change
							<input type="file" className="hidden" onChange={handleAvatarUpload} />
						</label>
					</div>

					{/* Name (read‑only) */}
					<div className="flex flex-col">
						<label className="font-medium mb-1">Name</label>
						<input type="text" value={form.name} disabled className="input" />
					</div>

					{/* Email (read‑only) */}
					<div className="flex flex-col">
						<label className="font-medium mb-1">Email</label>
						<input
							type="email"
							value={form.email}
							disabled
							className="input -100"
						/>
					</div>

					{/* Blood Group */}
					<div className="flex flex-col">
						<label className="font-medium mb-1">Blood Group</label>
						<select
							name="bloodGroup"
							value={form.bloodGroup}
							onChange={handleChange}
							className="input"
						>
							<option value="">Select</option>
							{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
								<option key={bg} value={bg}>
									{bg}
								</option>
							))}
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
						>
							<option value="">Select District</option>
							{districts.map((d) => (
								<option key={d.district_id} value={d.district}>
									{d.district}
								</option>
							))}
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
						>
							<option value="">Select Upazila</option>
							{upazilas.map((u) => (
								<option key={u.id} value={u.name}>
									{u.name}
								</option>
							))}
						</select>
					</div>
				</form>
			) : (
				/* ------------- read‑only card ------------- */
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
					<div className="col-span-full flex items-center gap-4">
						<img
							src={form.avatar || "/default-avatar.png"}
							alt="avatar"
							className="w-24 h-24 rounded-full object-cover"
						/>
					</div>

					{[
						["Name", form.name],
						["Email", form.email],
						["Blood Group", form.bloodGroup],
						["District", form.district],
						["Upazila", form.upazila],
					].map(([label, value]) => (
						<div key={label}>
							<p className="font-medium">{label}</p>
							<p>{value || "—"}</p>
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
}

/* Tailwind shortcut (put once in globals) */
/*
.input {
  @apply border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400;
}
*/
