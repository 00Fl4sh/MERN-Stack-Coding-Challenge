import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ onBurgerClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-3 bg-white shadow-sm sticky top-0 z-50">
      {/* Left: Burger + Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          className="p-2 rounded hover:bg-gray-100 focus:outline-none text-gray-700"
          aria-label="Toggle sidebar"
          onClick={onBurgerClick}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-2xl font-bold text-blue-700 whitespace-nowrap" style={{ fontFamily: 'Playfair Display, serif' }}>AI Minute</span>
      </div>
      {/* Center: Search */}
      <div className="flex-1 mx-4 max-w-lg hidden md:block">
        <input className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Search..." />
      </div>
      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* <a href="#" className="hover:text-blue-600 font-medium hidden sm:block">Learning Paths</a> */}
        <Link to="/upload" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition font-semibold">Upload</Link>
        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded hover:bg-gray-100 focus:outline-none">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow">2</span>
        </div>
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            U
          </button>
          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 