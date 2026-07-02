import React from 'react';
import { Link } from 'react-router-dom';

const ContactHero = () => {
  return (
    <div className="w-full bg-gray-100 py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-4 md:mb-5 tracking-tight">
          CONTACT
        </h1>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Contact</span>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
