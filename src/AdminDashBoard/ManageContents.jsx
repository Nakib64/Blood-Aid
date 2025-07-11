import React, { useState, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Pencil, Trash2, UploadCloud, CloudOff } from "lucide-react";
import Swal from "sweetalert2";
import { authContext } from "../Authentication/AuthContext";

export default function ContentManagement() {
	const [filter, setFilter] = useState("all");
    const [userRole, setUserRole] = useState(null)
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { user } = useContext(authContext);

    useEffect(()=>{
        axios.get(`http://localhost:3000/users?email=${user.email}`).then(res=>{
            setUserRole(res.data.role)
        })
    })


	const { data: blogs = [], isLoading } = useQuery({
		queryKey: ["blogs", filter],
		queryFn: async () => {
			const res = await axios.get("http://localhost:3000/blogs", {
				params: filter !== "all" ? { status: filter } : {},
			});
			return res.data;
		},
	});

	const mutation = useMutation({
		mutationFn: ({ id, action }) =>
			axios.patch(`http://localhost:3000/blogs/${id}`, { action }),
		onSuccess: () => {
			queryClient.invalidateQueries(["blogs"]);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id) => axios.delete(`http://localhost:3000/blogs/${id}`),
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
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#e11d48',
			cancelButtonColor: '#6b7280',
			confirmButtonText: 'Yes, delete it!',
			background: '#fff',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteMutation.mutate(id);
				Swal.fire({
					title: 'Deleted!',
					text: 'The blog has been deleted.',
					icon: 'success',
					timer: 1500,
					showConfirmButton: false,
				});
			}
		});
	};

	return (
		<div className="p-6">
			<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
				<h2 className="text-3xl font-bold text-neutral">📝 Content Management</h2>
				<div className="flex items-center gap-3 w-full md:w-auto">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="select select-bordered text-sm"
					>
						<option value="all">All Blogs</option>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
					{userRole === "admin" && (
						<button
							onClick={() => navigate("/dashboard/content-management/add-blog")}
							className="btn btn-primary btn-sm"
						>
							+ Add Blog
						</button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
							className="rounded-xl border border-base-300 shadow-md bg-base-100 hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
						>
							<div className="h-48 w-full overflow-hidden">
								<img
									src={blog.thumbnail}
									alt="Thumbnail"
									className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
								/>
							</div>

							<div className="p-4 flex flex-col gap-2 flex-1">
								<h3 className="text-lg font-semibold line-clamp-2 text-base-content">
									{blog.title}
								</h3>
								<p className="text-sm text-gray-500 line-clamp-3">{blog.description}</p>

								<span
									className={`badge w-fit px-3 text-xs mt-1 ${
										blog.status === "published" ? "badge-success" : "badge-warning"
									}`}
								>
									{blog.status}
								</span>

								<div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
									{(userRole === "admin" || userRole === "volunteer") && (
										<button
											className="btn btn-md btn-outline hover:btn-info border-none hover:scale-105 transition-transform duration-500"
											onClick={() => navigate(`/dashboard/content-management/edit/${blog._id}`)}
										>
											<Pencil size={14} /> Edit
										</button>
									)}

									{userRole === "admin" && (
										blog.status === "draft" ? (
											<button
												onClick={() => handleAction(blog._id, "publish")}
												className="btn btn-md hover:scale-105 transition-transform duration-500  bg-gradient-to-r from-primary to-blue-500 text-white hover:brightness-110 gap-1"
											>
												<UploadCloud size={14} /> Publish
											</button>
										) : (
											<button
												onClick={() => handleAction(blog._id, "unpublish")}
												className="btn btn-md hover:scale-105 transition-transform duration-500  bg-gradient-to-r from-yellow-500 to-orange-400 text-white hover:brightness-110 gap-1"
											>
												<CloudOff size={14} /> Unpublish
											</button>
										)
									)}

									{userRole === "admin" && (
										<button
											onClick={() => handleDelete(blog._id)}
											className="btn btn-md hover:scale-105 transition-transform duration-500  bg-gradient-to-r from-red-500 to-pink-500 text-white hover:brightness-110 gap-1"
										>
											<Trash2 size={14} /> Delete
										</button>
									)}
								</div>
							</div>
						</motion.div>
					))
				)}
			</div>
		</div>
	);
}
