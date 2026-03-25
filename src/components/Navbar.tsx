"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                Visionary
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link href="/shop" className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Shop All
              </Link>
              <Link href="/shop?category=frames" className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Glasses & Frames
              </Link>
              <Link href="/shop?category=sunglasses" className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Sunglasses
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors">
              <FiSearch className="h-5 w-5" />
            </button>
            {session ? (
              <div className="relative">
                <div 
                  className="text-gray-500 hover:text-indigo-600 cursor-pointer flex items-center transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FiUser className="h-5 w-5 mr-1.5" />
                  <span className="text-sm font-medium hidden md:block">{session.user?.name?.split(' ')[0]}</span>
                </div>
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-100 rounded-lg shadow-xl transition-all duration-200 z-50">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                          <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Account</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{session.user?.email}</p>
                        </div>
                        <Link href="/cart" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">My Cart</Link>
                        {(session.user as any)?.role === "admin" && (
                          <Link href="/admin" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 mt-1 pb-2">Admin Dashboard</Link>
                        )}
                        <button onClick={() => { setIsDropdownOpen(false); signOut(); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 mt-1 border-t border-gray-100 pt-2">Sign out</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <FiUser className="h-5 w-5" />
              </Link>
            )}
            <Link href="/cart" className="text-gray-500 hover:text-indigo-600 relative transition-colors">
              <FiShoppingCart className="h-5 w-5" />
              {/* Add cart badge here if needed */}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
