import React from 'react';
import { createBrowserRouter } from 'react-router';
import Homepage from '../Layouts/Homepage';
import Authentication from '../Layouts/Authentication';
import RegistrationForm from '../AuthenticationComponent/register';
import LoginPage from '../AuthenticationComponent/Login';
import Home from '../Homepage/Home';


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
    }
])

export default Routes;