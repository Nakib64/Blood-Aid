import React from 'react';
import { createBrowserRouter } from 'react-router';
import Homepage from '../Layouts/Homepage';
import Authentication from '../Layouts/Authentication';
import RegistrationForm from '../AuthenticationComponent/register';
import LoginPage from '../AuthenticationComponent/Login';
import Home from '../Homepage/Home';
import { DashboardLayout } from '../Layouts/DashBoard';
import Profile from '../DashBoard/Profile';
import CreateDonationRequest from '../DashBoard/CreateDonationRequest';
import Welcome from '../DashBoard/Welcome';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import MyDonationRequests from '../DashBoard/MyDonationRequests';
import PendingDonationRequests from '../DonationRequests/DonationRequests';
import DonationRequestDetails from '../DonationRequests/DonationDetails.';
import MyDonations from '../DashBoard/MyDonations';


const Routes = createBrowserRouter([
    {
        path: '/',
        Component: Homepage,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/donationRequests',
                Component: PendingDonationRequests
            },
            {
                path:`/donationRequests/:id`,
                element: <PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>
            }
        ]
    },
    {
        path: '/authentication',
        Component: Authentication,
        children:[
            {
                path: '/authentication/register',
                Component: RegistrationForm
            },
            {
                path: '/authentication/login',
                Component: LoginPage
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component:Welcome
            },
            {
                path: '/dashboard/profile',
                Component:Profile
            },
            {
                path:'/dashboard/createDonationRequest',
                Component: CreateDonationRequest
            },
            {
                path: '/dashboard/myDonationRequests',
                Component: MyDonationRequests
            }, 
            {
                path: '/dashboard/myDonations',
                Component: MyDonations
            }
        ]
    }
])

export default Routes;