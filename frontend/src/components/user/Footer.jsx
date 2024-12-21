import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xl font-semibold mb-6">
          <span className="text-lg text-gray-200">© 2024 Dream Hunt</span> -
          Discover Your Dream Job Today!
        </p>

        <div className="flex justify-center space-x-8 text-2xl mb-6">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-400 transform hover:scale-110 transition duration-300"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 transform hover:scale-110 transition duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transform hover:scale-110 transition duration-300"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="text-sm font-light text-gray-300">
          Connect with us on social media and stay updated with the latest job
          opportunities.
        </p>
      </div>
    </footer>
  );
}
