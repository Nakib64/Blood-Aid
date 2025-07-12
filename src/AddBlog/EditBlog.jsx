import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const fetchBlogById = async (id) => {
	const res = await axios.get(`http://localhost:3000/blog/${id}`);
	return res.data;
};

const EditBlog = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const editor = useRef(null);
	const [content, setContent] = useState("");
	const [initialThumb, setInitialThumb] = useState("");

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// Fetch blog using TanStack Query
	const { data: blog, isLoading, isError } = useQuery({
		queryKey: ["blog", id],
		queryFn: () => fetchBlogById(id),
	});

	// When blog data is loaded, set initial values
	useEffect(() => {
		if (blog) {
			setValue("title", blog.title);
			setInitialThumb(blog.thumbnail);
			setContent(blog.content);
		}
	}, [blog, setValue]);

	const onSubmit = async (data) => {
		try {
			let imageUrl = initialThumb;

			// If a new thumbnail is uploaded
			if (data.thumbnail[0]) {
				const formData = new FormData();
				formData.append("image", data.thumbnail[0]);
				const imgRes = await axios.post(
					`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
					formData
				);
				imageUrl = imgRes.data.data.url;
			}

			const updateData = {
				title: data.title,
				thumbnail: imageUrl,
				content,
			};

			await axios.patch(`http://localhost:3000/blog/${id}`, updateData);
			toast.success("Blog updated successfully!");
			navigate("/dashboard/content-management");
		} catch (err) {
			console.error(err);
			toast.error("Update failed!");
		}
	};

	if (isLoading) return <p className="text-center p-6">Loading blog...</p>;
	if (isError) return <p className="text-center text-red-500">Failed to load blog.</p>;

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold text-center mb-6">✍️ Edit Blog</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<div>
					<label className="block mb-1 font-medium">Title</label>
					<input
						type="text"
						{...register("title", { required: true })}
						className="input input-bordered w-full"
					/>
					{errors.title && <p className="text-red-500 text-sm">Title is required.</p>}
				</div>

				<div>
					<label className="block mb-1 font-medium">Thumbnail</label>
					<input type="file" accept="image/*" {...register("thumbnail")} />
					{initialThumb && (
						<img
							src={initialThumb}
							alt="Thumbnail Preview"
							className="w-32 h-24 object-cover mt-2 rounded"
						/>
					)}
				</div>

				<div>
					<label className="block mb-1 font-medium">Content</label>
					<JoditEditor
						ref={editor}
						value={content}
						tabIndex={1}
						onBlur={(newContent) => setContent(newContent)}
						className="bg-white border rounded"
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary mt-4 px-6 py-2 font-semibold text-white"
				>
					Update Blog
				</button>
			</form>
		</div>
	);
};

export default EditBlog;
