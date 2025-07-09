import React, {  useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../Loading/Loading';
import { authContext } from '../Authentication/AuthContext';



const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(authContext);
    const location = useLocation();
     
    
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return (
            <>
                {children}
            </>
        )
    }
    


    return (
        <Navigate state={location.pathname} to={'/authentication/login'}></Navigate>
    );
};

export default PrivateRoute;