import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { CalendarDays, User } from "lucide-react";
import { Link } from "react-router";

export default function PublishedBlogs() {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/blogs", {
        params: { status: "published" },
      });
      return res.data;
    },
  });

  // Helper to extract text from HTML
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="py-10 px-6 md:px-12 bg-gradient-to-b from-white to-red-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neutral">
          📚 Latest Published Blogs
        </h2>

        {isLoading ? (
          <p className="text-center text-lg">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-lg">No published blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-neutral line-clamp-2 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {extractPlainText(blog.content).slice(0, 120)}...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <User size={14} /> {blog.author || "Admin"}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />{" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
