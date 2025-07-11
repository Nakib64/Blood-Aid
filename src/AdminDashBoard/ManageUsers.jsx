import React, { useState } from "react";
import { MoreVertical, ShieldCheck, UserCheck, UserX } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import SmartDropdown from "./SmartDropdown";

const pageSize = 10;
import { User, Users, Crown } from "lucide-react";

const getRoleTag = (role) => {
	switch (role) {
		case "donor":
			return (
				<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
					<User size={14} /> Donor
				</span>
			);
		case "volunteer":
			return (
				<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
					<Users size={14} /> Volunteer
				</span>
			);
		case "admin":
			return (
				<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
					<Crown size={14} /> Admin
				</span>
			);
		default:
			return (
				<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
					<User size={14} /> {role}
				</span>
			);
	}
};

export default function AllUsers() {
	const [statusFilter, setStatusFilter] = useState("all");
	const [searchEmail, setSearchEmail] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();

	// Fetch users with pagination, filter, and search
	const fetchUsers = async () => {
		const res = await axios.get("http://localhost:3000/totalUsers", {
			params: {
				page: currentPage,
				limit: pageSize,
				status: statusFilter !== "all" ? statusFilter : undefined,
				email: searchEmail || undefined,
			},
		});
		return res.data;
	};

	const { data } = useQuery({
		queryKey: ["users", statusFilter, currentPage, searchEmail],
		queryFn: fetchUsers,
		keepPreviousData: true,
	});

	const mutation = useMutation({
		mutationFn: ({ userId, action }) =>
			axios.patch(`http://localhost:3000/users/${userId}`, { action }),
		onSuccess: () => {
			queryClient.invalidateQueries(["users"]);
		},
	});

	const handleAction = (userId, action) => {
		mutation.mutate({ userId, action });
	};

	// if (isLoading) return <Loading />;

	const users = data?.users || [];
	const totalPages = data?.totalPages || 1;

	return (
		<div className="p-4">
			{/* Header Filter + Search */}
			<div className="flex flex-col md:flex-row justify-between items-center gap-20  mb-6">
				<h2 className="text-3xl font-bold text-neutral">👤 All Users</h2>
				<div className="flex gap-2 flex-col justify-center md:items-center md:flex-row w-full md:w-auto flex-1">
					<input
						type="text"
						placeholder="Search by email..."
						className="input text-sm w-full"
						value={searchEmail}
						onChange={(e) => {
							setSearchEmail(e.target.value);
							setCurrentPage(1);
						}}
					/>
					<select
						className="select select-bordered text-sm"
						value={statusFilter}
						onChange={(e) => {
							setStatusFilter(e.target.value);
							setCurrentPage(1);
						}}
					>
						<option value="all">All Users</option>
						<option value="active">Active</option>
						<option value="blocked">Blocked</option>
					</select>
				</div>
			</div>

			{/* User Table */}
			<div className="overflow-x-auto shadow-md rounded-xl border border-base-300">
				<motion.table
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="table w-full"
				>
					<thead className="bg-base-200 text-base-content">
						<tr>
							<th>Avatar</th>
							<th>Email</th>
							<th>Name</th>
							<th>Role</th>
							<th>Status</th>
							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id} className="hover">
								<td>
									<div className="avatar">
										<div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
											<img src={user.avatar} alt="avatar" />
										</div>
									</div>
								</td>
								<td className="text-sm">{user.email}</td>
								<td>{user.name}</td>
								<td>{getRoleTag(user.role)}</td>
								<td>
									<span
										className={`badge px-3 py-1 rounded-full text-xs ${
											user.status === "active" ? "badge-success" : "badge-error"
										}`}
									>
										{user.status}
									</span>
								</td>
								
									<td className="flex justify-end">
										<SmartDropdown icon={<MoreVertical size={18} />}>
											{user.status === "active" && (
												<li>
													<button
														onClick={() => handleAction(user._id, "block")}
														className="flex items-center gap-2 hover:bg-red-100 hover:text-red-600 px-2 py-1 rounded-md transition-colors"
													>
														<UserX size={16} /> Block User
													</button>
												</li>
											)}
											{user.status === "blocked" && (
												<li>
													<button
														onClick={() => handleAction(user._id, "unblock")}
														className="flex items-center gap-2 hover:bg-green-100 hover:text-green-600 px-2 py-1 rounded-md transition-colors"
													>
														<UserCheck size={16} /> Unblock User
													</button>
												</li>
											)}
											{user.role !== "donor" && (
												<li>
													<button
														onClick={() => handleAction(user._id, "makeDonor")}
														className="flex items-center gap-2 hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded-md transition-colors"
													>
														<ShieldCheck size={16} /> Make Donor
													</button>
												</li>
											)}
											{user.role !== "volunteer" && (
												<li>
													<button
														onClick={() => handleAction(user._id, "makeVolunteer")}
														className="flex items-center gap-2 hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded-md transition-colors"
													>
														<ShieldCheck size={16} /> Make Volunteer
													</button>
												</li>
											)}
											{user.role !== "admin" && (
												<li>
													<button
														onClick={() => handleAction(user._id, "makeAdmin")}
														className="flex items-center gap-2 hover:bg-purple-100 hover:text-purple-600 px-2 py-1 rounded-md transition-colors"
													>
														<ShieldCheck size={16} /> Make Admin
													</button>
												</li>
											)}
										</SmartDropdown>
									</td>
								
							</tr>
						))}
					</tbody>
				</motion.table>
			</div>

			{/* Pagination */}
			<div className="flex justify-center mt-8">
				<div className="flex gap-2 flex-wrap">
					{[...Array(totalPages)].map((_, i) => {
						const isActive = currentPage === i + 1;
						return (
							<button
								key={i}
								onClick={() => setCurrentPage(i + 1)}
								className={`relative overflow-hidden px-5 py-2 text-sm font-medium rounded-full border shadow-sm transition-all duration-300 ease-in-out
                  ${
																			isActive
																				? "bg-primary text-white border-primary scale-105"
																				: "bg-base-100 text-base-content border-base-300 hover:scale-105 hover:bg-base-200"
																		}`}
							>
								<span className="relative z-10">{i + 1}</span>
								{!isActive && (
									<span className="absolute inset-0 z-0 bg-primary opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
								)}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
