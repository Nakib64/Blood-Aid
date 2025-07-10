import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { authContext } from "../Authentication/AuthContext";

import {
  LayoutDashboard,
  UserCircle,
  Droplets,
  PlusCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import logo from "../assets/pngegg.png";

import { ToastContainer } from "react-toastify";




export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const {logout} = useContext(authContext)


  const links = [
    { to: "/dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/profile", label: "Profile", icon: <UserCircle size={18} /> },
    { to: "/dashboard/myDonationRequests", label: "My Donation Requests", icon: <Droplets size={18} /> },
    { to: "/dashboard/createDonationRequest", label: "Create Request", icon: <PlusCircle size={18} /> },
    { to: "/dashboard/myDonations", label: "My Donations", icon: <PlusCircle size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-7/10" : "w-0 md:w-3/10"} lg:w-2/10 bg-white shadow-md transition-all duration-300 fixed md:static inset-y-0 left-0 z-50 overflow-y-auto`}
      >
        <div className="flex items-center justify-between md:justify-start py-4 ">
          <Link to="/" className="text-2xl font-bold flex justify-start items-center text-red-600">
            <img src={logo} alt="logo" className="h-9 w-9" /> BloodAid
          </Link>
          <button className="md:hidden text-2xl" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="px-4 py-6 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition hover:bg-red-500 ${
                location.pathname === link.to ? "bg-red-600 text-white" : "text-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-50 w-full text-left font-medium text-gray-700" onClick={()=>logout()}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 text-3xl text-red-600"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu />
      </button>

      {/* Main content */}
      <main className="flex-1 pt-20 md:ml-10 p-6 transition-all bg-gray-50 min-h-screen w-7/10 lg:w-2/10">
          <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={3000}
        newestOnTop
        pauseOnFocusLoss={false}
      />
        <Outlet />
      </main>
    </div>
  );
}
