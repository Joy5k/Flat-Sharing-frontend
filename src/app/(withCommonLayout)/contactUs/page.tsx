"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import location from './../../../../public/location.svg';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary-main py-12 px-4">
      <motion.div
        className="container mx-auto p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-[#43BCCE] text-white py-3 rounded-md transition duration-200">
                Submit
              </button>
            </form>
          </motion.div>
          <motion.div
            className="bg-[#43BCCE] rounded-lg overflow-hidden flex"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-1/2 p-6 flex flex-col justify-center text-white">
              <h2 className="text-3xl font-bold mb-4">About Our Spare Room</h2>
              <p className="mb-4">
                Our spare room offers a comfortable and convenient stay with all the necessary amenities. Located in a peaceful neighborhood, it's perfect for both short-term and long-term stays.
              </p>
              <ul className="list-disc list-inside">
                <li className="mb-2">Fully furnished</li>
                <li className="mb-2">High-speed internet</li>
                <li className="mb-2">Access to kitchen and living area</li>
                <li className="mb-2">Close to public transport</li>
                <li className="mb-2">Quiet and secure environment</li>
              </ul>
            </div>
            <div className="w-1/2 h-full relative">
              <Image src={location}  alt="Location Icon" className="rounded-l-lg w-fit" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
