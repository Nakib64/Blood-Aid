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


const Routes = createBrowserRouter([
    {
        path: '/',
        Component: Homepage,
        children: [
            {
                index: true,
                Component: Home
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
            }
        ]
    }
])

export default Routes;