import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function AddBlog() {
	const editor = useRef(null);
	const [title, setTitle] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [preview, setPreview] = useState(null);
	const [content, setContent] = useState("");

	const [uploading, setUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const imageBBApiKey = import.meta.env.VITE_IMGBB_KEY;

	const handleImageSelect = (e) => {
		const file = e.target.files[0];
		setThumbnail(file);
		if (file) setPreview(URL.createObjectURL(file));
	};

	const handleImageUpload = async () => {
		if (!thumbnail) return null;
		const formData = new FormData();
		formData.append("image", thumbnail);
		formData.append("key", imageBBApiKey);

		try {
			setUploading(true);
			const { data } = await axios.post("https://api.imgbb.com/1/upload", formData);
			return data.data.url;
		} catch (error) {
			console.error("Image upload failed", error);
			toast.error("Image upload failed");
			return null;
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !content || !thumbnail) {
			toast.warning("Please fill in all fields.");
			return;
		}

		try {
			setSubmitting(true);
			const thumbnailUrl = await handleImageUpload();
			if (!thumbnailUrl) return;

			const newBlog = {
				title,
				content,
				thumbnail: thumbnailUrl,
				status: "draft",
				createdAt: new Date(),
			};

			await axios.post("http://localhost:3000/blogs", newBlog);
			toast.success("Blog created as draft!");

			setTitle("");
			setContent("");
			setThumbnail(null);
			setPreview(null);
		} catch (err) {
			console.error(err);
			toast.error("Failed to create blog.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
			<motion.h2
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="text-3xl font-bold text-center text-neutral mb-8"
			>
				📝 Create a New Blog
			</motion.h2>

			<motion.form
				onSubmit={handleSubmit}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="space-y-8 bg-base-200 p-6 rounded-xl shadow-md"
			>
				{/* Title Field */}
				<div>
					<label className="label font-semibold">Blog Title</label>
					<input
						type="text"
						className="input input-bordered w-full text-base"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="e.g., The Importance of Blood Donation"
					/>
				</div>

				{/* Thumbnail Upload + Preview */}
				<div>
					<label className="label font-semibold">Thumbnail Image</label>
					<input
						type="file"
						accept="image/*"
						className="file-input file-input-bordered w-full"
						onChange={handleImageSelect}
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

				{/* Rich Text Editor */}
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
								placeholder: "Write your blog content here...",
								height: 400,
							}}
						/>
					</div>
				</div>

				{/* Submit Button */}
				<div className="text-right">
					<button
						type="submit"
						className={`btn btn-primary px-6 ${uploading || submitting ? "btn-disabled opacity-60" : ""}`}
						disabled={uploading || submitting}
					>
						{uploading || submitting ? "Saving..." : "Create Blog"}
					</button>
				</div>
			</motion.form>
		</div>
	);
}
