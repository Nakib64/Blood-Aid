import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div>
            <footer className="bg-red-800 text-gray-100 py-8 mt-auto">
				<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-bold text-white mb-2">BloodBond</h3>
						<p>Connecting lifesavers with those in need. Join our community today.</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-2">Quick Links</h4>
						<ul className="space-y-1">
							<li>
								<Link to="/" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link to="/blog" className="hover:underline">
									Blog
								</Link>
							</li>
							<li>
								<Link to="/search" className="hover:underline">
									Search Donors
								</Link>
							</li>
							<li>
								<Link to="/authentication/login" className="hover:underline">
									Login
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-2">Follow Us</h4>
						<p>Stay updated on our campaigns and blood drives.</p>
					</div>
				</div>
				<div className="text-center text-sm mt-8">
					&copy; 2025 BloodBond. All rights reserved.
				</div>
			</footer>
        </div>
    );
};

export default Footer;