import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export default function EditBlog() {
	const { id } = useParams();
	const navigate = useNavigate();
	const editor = useRef(null);

	const [content, setContent] = useState("");
	const [preview, setPreview] = useState("");
	const [uploading, setUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// ✅ Fetch blog data using React Query
	const { data: blog, isLoading, isError } = useQuery({
		queryKey: ["blog", id],
		queryFn: async () => {
			const { data } = await axios.get(`http://localhost:3000/blog/${id}`);
			return data;
		},
		enabled: !!id,
		onSuccess: (blog) => {
			setValue("title", blog.title);
			setContent(blog.content);
			setPreview(blog.thumbnail);
		},
	});

	// 🖼️ Thumbnail preview
	const handleImagePreview = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};

	// ✅ Submit blog update
	const onSubmit = async (data) => {
		try {
			setSubmitting(true);
			let imageUrl = preview;

			if (data.thumbnail[0]) {
				setUploading(true);
				const formData = new FormData();
				formData.append("image", data.thumbnail[0]);

				const imgRes = await axios.post(
					`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
					formData
				);
				imageUrl = imgRes.data.data.url;
				setUploading(false);
			}

			await axios.patch(`http://localhost:3000/blog/${id}`, {
				title: data.title,
				thumbnail: imageUrl,
				content,
			});

			toast.success("Blog updated successfully!");
			navigate("/dashboard/content-management");
		} catch (error) {
			toast.error("Failed to update blog");
		} finally {
			setSubmitting(false);
		}
	};

	if (isLoading) return <p className="text-center py-10">Loading blog data...</p>;
	if (isError) return <p className="text-center text-red-500">Failed to load blog.</p>;

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
			<motion.h2
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="text-3xl font-bold text-center text-neutral mb-8"
			>
				✏️ Edit Blog
			</motion.h2>

			<motion.form
				onSubmit={handleSubmit(onSubmit)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="space-y-8 bg-base-200 p-6 rounded-xl shadow-md"
			>
				{/* Title */}
				<div>
					<label className="label font-semibold">Blog Title</label>
					<input
						type="text"
						className="input input-bordered w-full text-base"
						{...register("title", { required: true })}
					/>
					{errors.title && <p className="text-red-500 text-sm">Title is required.</p>}
				</div>

				{/* Thumbnail */}
				<div>
					<label className="label font-semibold">Thumbnail Image</label>
					<input
						type="file"
						accept="image/*"
						className="file-input file-input-bordered w-full"
						{...register("thumbnail")}
						onChange={handleImagePreview}
					/>
					{preview && (
						<div className="mt-3">
							<span className="label-text text-sm text-gray-500 mb-1 block">Preview:</span>
							<img
								src={preview}
								alt="Preview"
								className="h-48 w-full object-cover rounded-md border border-base-300"
							/>
						</div>
					)}
				</div>

				{/* Editor */}
				<div>
					<label className="label font-semibold">Blog Content</label>
					<div className="rounded-md overflow-hidden border border-base-300">
						<JoditEditor
							ref={editor}
							value={content}
							tabIndex={1}
							onBlur={(newContent) => setContent(newContent)}
							config={{
								statusbar: false,
								readonly: false,
								placeholder: "Edit your blog content here...",
								height: 400,
							}}
						/>
					</div>
				</div>

				{/* Submit */}
				<div className="text-right">
					<button
						type="submit"
						className={`btn btn-primary px-6 ${uploading || submitting ? "btn-disabled opacity-60" : ""}`}
						disabled={uploading || submitting}
					>
						{uploading || submitting ? "Updating..." : "Update Blog"}
					</button>
				</div>
			</motion.form>
		</div>
	);
}
