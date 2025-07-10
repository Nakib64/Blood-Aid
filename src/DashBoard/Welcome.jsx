import React, { useContext } from 'react';
import { motion } from "framer-motion";
import { authContext } from '../Authentication/AuthContext';
import RecentMyDonations from './Recent';
const Welcome = () => {

    const { user } = useContext(authContext);
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mb-8"
      >
        <div className="bg-gradient-to-r from-red-100 to-red-50 p-6 rounded-xl shadow flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-700">Welcome, {user?.displayName || "User"}!</h1>
            <p className="text-gray-600 mt-1">Manage your donations and help save lives.</p>
          </div>
          <img
            src={user.photoURL}
            alt="donate"
            className="w-20 md:w-28 drop-shadow rounded-full"
          />
        </div>
              <RecentMyDonations></RecentMyDonations>

      </motion.div>
    );
};

export default Welcome;