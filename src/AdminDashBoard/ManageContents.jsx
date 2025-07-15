import React, { useState, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import { motion } from "framer-motion";
import { Pencil, Trash2, UploadCloud, CloudOff } from "lucide-react";
import Swal from "sweetalert2";
import { authContext } from "../Authentication/AuthContext";
import UseAxios from "../Hooks/UseAxios";
import Loading from "../Loading/Loading";

export default function ContentManagement() {
	const [filter, setFilter] = useState();
	const [page, setPage] = useState(1);
	const limit = 6;
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { user } = useContext(authContext);
	const axiosSecure = UseAxios()
	
	// Get role of current user
	
	const {data: role, isLoading} = useQuery({
		queryKey: [user],
		queryFn: async()=>{
			const res = await axiosSecure.get(`/users?email=${user?.email}`)
			console.log(res?.data?.role);
			return res.data.role
		}
	})

	const { data , refetch} = useQuery({
		queryKey: ["blogs", filter, page],
		queryFn: async () => {
			const res = await axios.get("https://blood-aid-server-eight.vercel.app/blogs", {
				params: {
					status: filter ,
					page,
					limit,
				},
			});
			return res.data;
		},
	});

	if(role === "donor"){
		navigate('/')
	}

	const blogs = data?.blog || [];
	const totalPages = data?.totalPages || 1;

	const mutation = useMutation({
		mutationFn: async({ id, action }) =>
		 await	axios.patch(`https://blood-aid-server-eight.vercel.app/blogs/${id}`, { action }).then(()=>{
			toast.success('sucess')
			
			queryClient.invalidateQueries(["blogs"]);
		 })
		
	});

	const deleteMutation = useMutation({
		mutationFn: (id) => axios.delete(`https://blood-aid-server-eight.vercel.app/blogs/${id}`),
		onSuccess: () => {
			toast.success("Blog deleted");
			queryClient.invalidateQueries(["blogs"]);
		},
	});

	const handleAction = (id, action) => {
		mutation.mutate({ id, action });
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#e11d48",
			cancelButtonColor: "#6b7280",
			confirmButtonText: "Yes, delete it!",
			background: "#fff",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteMutation.mutate(id);
				Swal.fire({
					title: "Deleted!",
					text: "The blog has been deleted.",
					icon: "success",
					timer: 1500,
					showConfirmButton: false,
				});
			}
		});
	};

	if(isLoading){
		return <Loading></Loading>
	}

	return (
		<div className="p-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
				<h2 className="text-3xl font-bold text-neutral">📝 Content Management</h2>
				<div className="flex items-center gap-3 w-full md:w-auto">
					<select
						value={filter}
						onChange={(e) => {
							setPage(1);
							setFilter(e.target.value);
						}}
						className="select select-bordered text-sm"
					>
						<option value={''} >All Blogs</option>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
					{role === "admin" && (
						<button
							onClick={() => navigate("/dashboard/content-management/add-blog")}
							className="btn btn-primary btn-sm"
						>
							+ Add Blog
						</button>
					)}
				</div>
			</div>

			{/* Blog Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
				{isLoading ? (
					<p className="text-center col-span-full">Loading blogs...</p>
				) : blogs.length === 0 ? (
					<p className="text-center col-span-full">No blogs found.</p>
				) : (
					blogs.map((blog, index) => (
						<motion.div
							key={blog._id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05, duration: 0.4, type: "spring" }}
							className="rounded-xl border border-base-300 shadow-lg bg-base-100 hover:shadow-2xl transition duration-300 overflow-hidden flex"
						>
							<div className="grid grid-rows-[auto_1fr_auto] h-full w-full">
								{/* Thumbnail */}
								<div className="h-48 w-full overflow-hidden">
									<img
										src={blog.thumbnail}
										alt="Thumbnail"
										className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
									/>
								</div>

								{/* Content */}
								<div className="p-4 flex flex-col gap-2">
									<h3 className="text-lg font-semibold text-base-content min-h-[48px]">
										{blog.title}
									</h3>

									<span
										className={`badge w-fit px-3 text-xs mt-1 ${
											blog.status === "published" ? "badge-success" : "badge-warning"
										}`}
									>
										{blog.status}
									</span>
								</div>

								{/* Action Buttons */}
								<div className="p-4 flex flex-wrap justify-between items-center gap-2">
									{(role === "admin" || role === "volunteer") && (
										<Link to={`/dashboard/blog/${blog._id}`}>
											<button className="btn btn-sm btn-outline hover:btn-info transition-all">
											edit	
											</button>
										</Link>
									)}

									{role === "admin" && (
										<div className="flex gap-4 lg:gap-8">
											{blog.status === "draft" ? (
												<button
													onClick={() => handleAction(blog._id, "publish")}
													className="btn btn-sm bg-gradient-to-r from-primary to-blue-500 text-white hover:brightness-110"
												>
													<UploadCloud size={14} /> Publish
												</button>
											) : (
												<button
													onClick={() => handleAction(blog._id, "unpublish")}
													className="btn btn-sm bg-gradient-to-r from-yellow-500 to-orange-400 text-white hover:brightness-110"
												>
													<CloudOff size={14} /> Unpublish
												</button>
											)}

											<button
												onClick={() => handleDelete(blog._id)}
												className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-500 text-white hover:brightness-110"
											>
												<Trash2 size={14} /> Delete
											</button>
										</div>
									)}
								</div>
							</div>
						</motion.div>
					))
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-10 flex justify-center gap-2 flex-wrap">
					{[...Array(totalPages)].map((_, i) => (
						<button
							key={i}
							onClick={() => setPage(i + 1)}
							className={`btn btn-sm px-4 ${
								page === i + 1 ? "btn-active bg-red-600 text-white" : "btn-ghost"
							}`}
						>
							{i + 1}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
