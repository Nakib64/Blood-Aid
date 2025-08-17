import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Droplet } from "lucide-react";
import { authContext } from "../Authentication/AuthContext";

const About = () => {

  const { user } = useContext(authContext);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12 md:px-20">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-red-600 mb-6 text-center"
      >
        About Our Blood Donation Platform
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-gray-700 max-w-3xl text-center mb-12"
      >
        Our mission is simple — to connect <span className="text-red-500 font-semibold">voluntary blood donors</span> with people in urgent need. 
        We believe that every drop of blood can save lives and every donor is a real-life hero. 
        Together, we are building a safe, reliable, and accessible platform for everyone.
      </motion.p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To create a trusted community where donors and patients connect instantly, 
            reducing delays during critical moments.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Our Community</h2>
          <p className="text-gray-600">
            Thousands of compassionate donors, volunteers, and healthcare partners 
            come together to support life-saving efforts.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <Droplet className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Why Donate?</h2>
          <p className="text-gray-600">
            Every 2 seconds, someone needs blood. A single donation can save up to 
            <span className="font-semibold text-red-500"> 3 lives</span>.
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
       {
          !user &&  <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Be Someone’s Hero Today ❤️
        </h3>
       
        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg transition">
          Become a Donor
        </button>
      </motion.div>
        }
     
    </div>
  );
};

export default About;
