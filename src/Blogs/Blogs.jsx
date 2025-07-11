import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../Loading/Loading";

export default function BlogPage() {
	const [page, setPage] = useState(1);
	const limit = 3;

	const { data, isLoading } = useQuery({
		queryKey: ["publishedBlogs", page],
		queryFn: async () => {
			const res = await axios.get("http://localhost:3000/blogs", {
				params: { status: "published", page, limit },
			});
      console.log(res.data);
			return res.data;
		},
	});

	if (isLoading) {
		return <Loading></Loading>
	}

	const { blog, totalPages } = data;

	return (
		<section className="max-w-5xl mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center text-red-600 mb-10">
				📚 Latest Blogs
			</h1>

			<div className="space-y-16">
				{blog.map((blog, index) => (
					<motion.article
						key={blog._id}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1, duration: 0.6 }}
						className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
					>
						<img
							src={blog.thumbnail}
							alt="Blog thumbnail"
							className="w-full h-72 object-cover"
						/>

						<div className="p-8 space-y-4">
							<h2 className="text-3xl font-bold text-gray-800">{blog.title}</h2>
							<div className="text-sm text-gray-500">
								Published on{" "}
								<span className="font-medium">
									{new Date(blog.createdAt).toLocaleDateString()}
								</span>
							</div>
							<div
								className="prose max-w-none text-gray-700"
								dangerouslySetInnerHTML={{ __html: blog.content }}
							/>
						</div>
					</motion.article>
				))}
			</div>

			{/* Pagination */}
			<div className="flex justify-center items-center mt-12 gap-2">
				<button
					disabled={page === 1}
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-3"
				>
					<ChevronLeft size={18} />
				</button>

				{[...Array(totalPages)].map((_, i) => (
					<button
						key={i}
						onClick={() => setPage(i + 1)}
						className={`btn btn-sm rounded-full w-8 h-8 text-sm ${
							page === i + 1
								? "bg-red-600 text-white"
								: "bg-gray-100 hover:bg-gray-200 text-gray-700"
						}`}
					>
						{i + 1}
					</button>
				))}

				<button
					disabled={page === totalPages}
					onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
					className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-3"
				>
					<ChevronRight size={18} />
				</button>
			</div>
		</section>
	);
}
