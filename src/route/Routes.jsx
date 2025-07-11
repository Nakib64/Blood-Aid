import React from "react";
import { createBrowserRouter } from "react-router";
import Homepage from "../Layouts/Homepage";
import Authentication from "../Layouts/Authentication";
import RegistrationForm from "../AuthenticationComponent/register";
import LoginPage from "../AuthenticationComponent/Login";
import Home from "../Homepage/Home";
import { DashboardLayout } from "../Layouts/DashBoard";
import Profile from "../DashBoard/Profile";
import CreateDonationRequest from "../DashBoard/CreateDonationRequest";
import Welcome from "../DashBoard/Welcome";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyDonationRequests from "../DashBoard/MyDonationRequests";
import PendingDonationRequests from "../DonationRequests/DonationRequests";
import DonationRequestDetails from "../DonationRequests/DonationDetails.";
import MyDonations from "../DashBoard/MyDonations";
import SearchDonors from "../Search/Search";
import DonorCard from "../Donor/Donor";
import AllUsers from "../AdminDashBoard/ManageUsers";
import AllDonationRequests from "../AdminDashBoard/AllDonationRequests";
import AddBlog from "../AddBlog/AddBlog";
import ContentManagement from "../AdminDashBoard/ManageContents";
import Forbidden from "../Forbidden/Forbidden";
import AdminRoute from "../AdminDashBoard/AdminRoute";
import PublishedBlogs from "../Blogs/Blogs";

const Routes = createBrowserRouter([
	{
		path: "/",
		Component: Homepage,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "/donationRequests",
				Component: PendingDonationRequests,
			},
			{
				path: `/donationRequests/:id`,
				element: (
					<PrivateRoute>
						<DonationRequestDetails></DonationRequestDetails>
					</PrivateRoute>
				),
			},
			{
				path: "/searchDonor",
				Component: SearchDonors,
			},
			{
				path: "/donor/:id",
				Component: DonorCard,
			},
            {
                path:"/blogs",
                Component: PublishedBlogs
            }
		],
	},
	{
		path: "/authentication",
		Component: Authentication,
		children: [
			{
				path: "/authentication/register",
				Component: RegistrationForm,
			},
			{
				path: "/authentication/login",
				Component: LoginPage,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout></DashboardLayout>
			</PrivateRoute>
		),
		children: [
			{
				index: true,
				Component: Welcome,
			},
			{
				path: "/dashboard/profile",
				Component: Profile,
			},
			{
				path: "/dashboard/create-donation-request",
				Component: CreateDonationRequest,
			},
			{
				path: "/dashboard/my-donation-requests",
				Component: MyDonationRequests,
			},
			{
				path: "/dashboard/myDonations",
				Component: MyDonations,
			},
			{
				path: "/dashboard/all-users",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
			},
			{
				path: "/dashboard/all-blood-donation-request",
                element: <AdminRoute><AllDonationRequests></AllDonationRequests></AdminRoute>
			},
			{
				path: "/dashboard/content-management/add-blog",
                element: <AdminRoute><AddBlog></AddBlog></AdminRoute>
			},
            {
                path: "/dashboard/content-management",
                element: <AdminRoute><ContentManagement></ContentManagement></AdminRoute>
            }
		],
	},
    {
        path: "forbidden",
        Component: Forbidden
    }
]);

export default Routes;
