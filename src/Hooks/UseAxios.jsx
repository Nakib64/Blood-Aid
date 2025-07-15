import axios from 'axios';
import React, { useContext } from 'react';
import { authContext } from '../Authentication/AuthContext';


const axiosInstance = axios.create({
    baseURL: 'https://blood-aid-server-eight.vercel.app',

})

const UseAxios = () => {

    const {user} = useContext(authContext)

    if(user && user.email){
  axiosInstance.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config
    })

    return axiosInstance; 
    } 
  
}

export default UseAxios;