import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const Homepage = () => {
    return (
        <div>
              <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={3000}
        newestOnTop
        pauseOnFocusLoss={false}
      />
            <Outlet></Outlet>
        </div>
    );
};

export default Homepage;