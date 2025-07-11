import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function RecentUsers() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["recentUsers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/recent-users"); // Adjust to your actual endpoint
      return res.data;
    },
  });

  return (
    <div className="p-4 border rounded-xl bg-base-100 shadow-md w-full">
      <h3 className="text-xl font-semibold mb-4 text-neutral">🕵️‍♂️ Recent Users</h3>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-primary" size={24} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <motion.table
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="table w-full text-sm"
          >
            <thead className="bg-base-200">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Blood</th>
                <th>Location</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-outline">{user.bloodGroup}</span>
                  </td>
                  <td className="capitalize">
                    {user.upazila}, {user.district}
                  </td>
                  <td>
                    <span className="badge badge-info badge-outline capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm rounded-full px-3 ${
                        user.status === "active" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      )}
    </div>
  );
}
